import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import MechaEye from "./mecha-eye";

const C = 200; // center of the 400×400 viewBox
const origin = { transformOrigin: `${C}px ${C}px` };
const rad = (deg: number) => ((deg - 90) * Math.PI) / 180; // 0° = top, clockwise
const pt = (r: number, deg: number) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))] as const;

/** Annular armor plate with chamfered ends (inner edge narrower than outer). */
function platePath(r1: number, r2: number, a0: number, a1: number, chamfer = 4) {
  const [ox0, oy0] = pt(r2, a0);
  const [ox1, oy1] = pt(r2, a1);
  const [ix1, iy1] = pt(r1, a1 - chamfer);
  const [ix0, iy0] = pt(r1, a0 + chamfer);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${ox0} ${oy0} A${r2} ${r2} 0 ${large} 1 ${ox1} ${oy1} L${ix1} ${iy1} A${r1} ${r1} 0 ${large} 0 ${ix0} ${iy0} Z`;
}
function arcPath(r: number, a0: number, a1: number) {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`;
}
function hex(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

const PLATE = { r1: 160, r2: 184, span: 66 };
const plates = [0, 90, 180, 270].map((mid, i) => ({
  mid,
  a0: mid - PLATE.span / 2,
  a1: mid + PLATE.span / 2,
  glyph: ["Α", "Θ", "Σ", "Ω"][i],
}));
const clamps = [45, 135, 225, 315];
const ticks = Array.from({ length: 72 }, (_, i) => ({ a: i * 5, major: i % 6 === 0 }));
const teeth = Array.from({ length: 48 }, (_, i) => i * 7.5);
const finsFull = Array.from({ length: 48 }, (_, i) => i * 7.5);
const finsCompact = Array.from({ length: 24 }, (_, i) => i * 15);
const bolts = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);
const sweepSlices = Array.from({ length: 10 }, (_, i) => i); // fading radar trail, 4° each

/** Wedge between two radii (used for the radar sweep trail). */
function wedge(r1: number, r2: number, a0: number, a1: number) {
  return platePath(r1, r2, a0, a1, 0);
}

/* ── Surge timeline (seconds), synced to playMechaSpin(2.6) ─────────────────── */
const T = 2.6; // total
const UNLOCK = 0.25; // clamps retract, plates push out
const UP = 0.9; // spin-up ends
const HOLD = 1.7; // full power ends, wind-down starts
const LOCK = 0.25; // plates slam back in over the last stretch
const SETTLE = 0.18; // bounce after locking
const PUSH_PX = 9; // how far plates slide outward
const ORBIT_IDLE = 6; // deg/s
const GEAR_IDLE = -9;
const ORBIT_PEAK = 300;
const GEAR_PEAK = -480;
const SWEEP_IDLE = 70; // radar sweep, deg/s
const SWEEP_PEAK = 900;

const smooth = (x: number) => {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
};
/** Power level 0→1→0 across the surge. */
const env = (e: number) =>
  e <= 0 || e >= T ? 0 : e < UP ? smooth(e / UP) : e < HOLD ? 1 : 1 - smooth((e - HOLD) / (T - HOLD));
/** Plate unlock: slide out, hold, slam back with a small bounce. */
const pushAt = (e: number) => {
  if (e <= 0) return 0;
  if (e < UNLOCK) return smooth(e / UNLOCK);
  if (e < T - LOCK) return 1;
  if (e < T) {
    const k = (e - (T - LOCK)) / LOCK;
    return 1 - k * k * k; // accelerates into the lock
  }
  if (e < T + SETTLE) return -0.3 * Math.sin((Math.PI * (e - T)) / SETTLE);
  return 0;
};
// Cumulative power (1ms steps) so plate rotation can land exactly on a quarter turn.
const CUM = (() => {
  const out = new Float32Array(Math.round(T * 1000) + 1);
  for (let i = 1; i < out.length; i++) out[i] = out[i - 1] + env(i / 1000) / 1000;
  return out;
})();
const cumAt = (e: number) => CUM[Math.min(CUM.length - 1, Math.max(0, Math.round(e * 1000)))];

/** A plate or clamp that slides outward along its own axis as the shell unlocks. */
function Radial({ angle, push, dist, children }: { angle: number; push: MotionValue<number>; dist: number; children: ReactNode }) {
  const x = useTransform(push, (p) => Math.sin((angle * Math.PI) / 180) * dist * p);
  const y = useTransform(push, (p) => -Math.cos((angle * Math.PI) / 180) * dist * p);
  return <motion.g style={{ x, y }}>{children}</motion.g>;
}

/* ── 3D rig: the shell is a stack of SVG layers at different depths ─────────── */
// Depths are in cqw (percent of the halo's own width), so the 3D scales with its size.
const Z = {
  back: -9, // glow, outer orbit
  eye: -5, // eye sits recessed in the socket
  collar: -1.5, // fins + bezel ring
  dial: 2.5, // tick dial, radar sweep
  gear: 5.5,
  plates: 10, // armor plates + readout (thickness copies sit just behind)
  clamps: 13,
};
const PLATE_DEPTH = [8, 8.7, 9.4]; // extrusion slices behind the plates
const CLAMP_DEPTH = [11, 12];
const TILT_X = 16; // max deg toward the cursor
const TILT_Y = 22;
const SWAY = { x: 7, y: 11 }; // idle drift amplitude, deg

function Layer({ z, children }: { z: number; children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-0" style={{ transform: `translateZ(${z}cqw)` }}>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible">
        {children}
      </svg>
    </div>
  );
}

/** Armored mecha housing around ΑΘΗΝΑ's tracking eye. */
export default function MechaHalo({
  className,
  charged = false,
  compact = false,
  surge = 0,
}: {
  className?: string;
  charged?: boolean;
  /** Small versions: drop fine text and detail that would be illegible. */
  compact?: boolean;
  /** Increment to fire the overclock spin sequence. */
  surge?: number;
}) {
  const heat = charged ? 1 : 0;
  const fade = { transition: "stroke-opacity 300ms, stroke 300ms" };
  const reduce = useReducedMotion();

  const orbit = useMotionValue(0);
  const gear = useMotionValue(0);
  const shell = useMotionValue(0);
  const push = useMotionValue(0);
  const shakeX = useMotionValue(0);
  const shakeY = useMotionValue(0);
  const sweep = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const root = useRef<HTMLDivElement>(null);
  const aim = useRef({ x: 0, y: 0, at: -1e9 });

  // Lean toward the cursor.
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !root.current) return;
      const r = root.current.getBoundingClientRect();
      if (!r.width) return;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      const dx = clamp((e.clientX - (r.left + r.width / 2)) / 600);
      const dy = clamp((e.clientY - (r.top + r.height / 2)) / 500);
      aim.current = { x: -dy * TILT_X, y: dx * TILT_Y, at: performance.now() };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  const run = useRef<{ t0: number; e0: number; from: number; to: number } | null>(null);
  const vel = useRef({ orbit: ORBIT_IDLE, gear: GEAR_IDLE, sweep: SWEEP_IDLE });

  // Start (or extend) a surge whenever `surge` changes.
  useEffect(() => {
    if (!surge || reduce) return;
    const now = performance.now() / 1000;
    const cur = run.current;
    const elapsed = cur ? now - cur.t0 : Infinity;
    // Re-clicked mid-spin: stay at full power instead of restarting the spin-up.
    const e0 = elapsed < T ? Math.min(elapsed, UP) : 0;
    const from = shell.get();
    const to = (Math.floor((from + 45) / 90) + 1) * 90; // next quarter turn
    run.current = { t0: now - e0, e0, from, to };
  }, [surge, reduce, shell]);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const dt = Math.min(0.05, delta / 1000);
    const r = run.current;
    const el = r ? performance.now() / 1000 - r.t0 : -1;
    const power = r ? env(el) : 0;
    const idle = charged && !r ? 4 : 1;

    // Velocities ease toward their target so speed changes feel like inertia.
    const tOrbit = ORBIT_IDLE * idle + (ORBIT_PEAK - ORBIT_IDLE) * power;
    const tGear = GEAR_IDLE * idle + (GEAR_PEAK - GEAR_IDLE) * power;
    const k = Math.min(1, dt * 7);
    vel.current.orbit += (tOrbit - vel.current.orbit) * k;
    vel.current.gear += (tGear - vel.current.gear) * k;
    vel.current.sweep += (SWEEP_IDLE * idle + (SWEEP_PEAK - SWEEP_IDLE) * power - vel.current.sweep) * k;
    orbit.set((orbit.get() + vel.current.orbit * dt) % 360);
    gear.set((gear.get() + vel.current.gear * dt) % 360);
    sweep.set((sweep.get() + vel.current.sweep * dt) % 360);

    // Cursor lean, drifting into a slow idle sway when the mouse goes quiet.
    const now = performance.now();
    const quiet = Math.min(1, Math.max(0, (now - aim.current.at - 1800) / 1500));
    const s = now / 1000;
    const swayX = Math.sin(s * 0.9) * SWAY.x;
    const swayY = Math.sin(s * 0.7 + 1.3) * SWAY.y;
    const gx = aim.current.x * (1 - quiet) + swayX * quiet;
    const gy = aim.current.y * (1 - quiet) + swayY * quiet;
    const kt = Math.min(1, dt * 5);
    tiltX.set(tiltX.get() + (gx - tiltX.get()) * kt);
    tiltY.set(tiltY.get() + (gy - tiltY.get()) * kt);

    if (r) {
      const total = cumAt(T) - cumAt(r.e0);
      const prog = total > 0 ? (cumAt(el) - cumAt(r.e0)) / total : 1;
      shell.set(r.from + (r.to - r.from) * Math.min(1, Math.max(0, prog)));
      push.set(pushAt(el));
      const amp = power * 1.4;
      shakeX.set((Math.random() * 2 - 1) * amp);
      shakeY.set((Math.random() * 2 - 1) * amp);
      if (el > T + SETTLE) {
        run.current = null;
        shell.set(r.to % 360);
        push.set(0);
        shakeX.set(0);
        shakeY.set(0);
      }
    }
  });

  const plateShape = (p: (typeof plates)[number]) => platePath(PLATE.r1, PLATE.r2, p.a0, p.a1);
  const clampShape = `${C - 8},${C - 199} ${C + 8},${C - 199} ${C + 12},${C - 191} ${C + 12},${C - 158} ${C - 12},${C - 158} ${C - 12},${C - 191}`;

  return (
    <div
      ref={root}
      className={cn("relative aspect-square [container-type:inline-size]", className)}
      style={{ ["--flow" as string]: charged ? "0.35s" : "2.4s" }}
      aria-hidden
    >
      <div className="absolute inset-0 [perspective:320cqw]">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ rotateX: tiltX, rotateY: tiltY, x: shakeX, y: shakeY }}
        >
          {/* ── back: glow, orbit ── */}
          <Layer z={Z.back}>
            <defs>
              <radialGradient id="halo-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fa7636" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#fa7636" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#fa7636" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="halo-plate" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2e1f16" />
                <stop offset="100%" stopColor="#140d0a" />
              </linearGradient>
              <linearGradient id="halo-edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffb48a" />
                <stop offset="100%" stopColor="#fa7636" />
              </linearGradient>
              <pattern id="halo-hex" width="9" height="15.6" patternUnits="userSpaceOnUse">
                <path
                  d="M4.5 0 L9 2.6 L9 7.8 L4.5 10.4 L0 7.8 L0 2.6 Z M4.5 10.4 L4.5 15.6"
                  fill="none"
                  stroke="#fa7636"
                  strokeOpacity="0.13"
                  strokeWidth="0.7"
                />
              </pattern>
            </defs>
            <circle
              cx={C}
              cy={C}
              r="196"
              fill="url(#halo-core)"
              style={{ opacity: charged ? 1 : 0.7, transition: "opacity 400ms" }}
            />
            {charged ? (
              <circle cx={C} cy={C} r="110" fill="none" stroke="#ffb48a" strokeWidth="2" className="halo-pulse" style={origin} />
            ) : null}
            <motion.g style={{ rotate: orbit }}>
              <circle cx={C} cy={C} r="193" fill="none" stroke="#fa7636" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 7" />
              <rect x={C - 4} y={3} width="8" height="8" fill="#fa7636" transform={`rotate(45 ${C} 7)`} />
              <polygon points={`${C},${C + 188} ${C - 5},${C + 197} ${C + 5},${C + 197}`} fill="#ffb48a" fillOpacity="0.8" />
            </motion.g>
          </Layer>

          {/* ── eye, recessed in its socket ── */}
          <Layer z={Z.eye}>
            <circle cx={C} cy={C} r="104" fill="#0b0705" />
            <MechaEye cx={C} cy={C} charged={charged} />
          </Layer>

          {/* ── collar: heat-sink fins + bolted bezel ring (open in the middle) ── */}
          <Layer z={Z.collar}>
            {(compact ? finsCompact : finsFull).map((a) => {
              const [x1, y1] = pt(113, a);
              const [x2, y2] = pt(127, a);
              return (
                <line
                  key={a}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={charged ? "#ffb48a" : "#fa7636"}
                  strokeOpacity={0.3 + heat * 0.6}
                  strokeWidth="3"
                  style={fade}
                />
              );
            })}
            <circle cx={C} cy={C} r="129.5" fill="none" stroke="#fa7636" strokeOpacity="0.55" strokeWidth="1.2" />
            <circle cx={C} cy={C} r="106" fill="none" stroke="#1c140f" strokeWidth="6" />
            <circle cx={C} cy={C} r="109" fill="none" stroke="#fa7636" strokeOpacity="0.75" strokeWidth="1.5" />
            <circle cx={C} cy={C} r="103" fill="none" stroke="#fa7636" strokeOpacity="0.35" strokeWidth="1" />
            {!compact &&
              bolts.map((a) => {
                const [x, y] = pt(106, a);
                return <polygon key={a} points={hex(x, y, 2.4)} fill="#3a2a20" stroke="#ffb48a" strokeOpacity="0.7" strokeWidth="0.7" />;
              })}
          </Layer>

          {/* ── dial: ticks, cardinal markers, radar sweep ── */}
          <Layer z={Z.dial}>
            {!compact &&
              ticks.map(({ a, major }) => {
                const [x1, y1] = pt(major ? 134 : 138, a);
                const [x2, y2] = pt(143, a);
                return (
                  <line
                    key={a}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#fa7636"
                    strokeOpacity={major ? 0.9 : 0.35}
                    strokeWidth={major ? 2 : 1}
                  />
                );
              })}
            <motion.g style={{ rotate: sweep }}>
              <circle cx={C} cy={C} r="146" fill="none" />
              {sweepSlices.map((i) => (
                <path key={i} d={wedge(110, 146, -i * 4 - 4, -i * 4)} fill="#fa7636" fillOpacity={(0.32 * (10 - i)) / 10} />
              ))}
              <line x1={C} y1={C - 110} x2={C} y2={C - 146} stroke="#ffb48a" strokeWidth="1.5" />
            </motion.g>
            {!compact &&
              [0, 90, 180, 270].map((a) => (
                <polygon
                  key={a}
                  points={`${C},${C - 131} ${C - 4},${C - 137} ${C + 4},${C - 137}`}
                  fill="#ffb48a"
                  transform={`rotate(${a} ${C} ${C})`}
                />
              ))}
          </Layer>

          {/* ── gear ring + plate rails ── */}
          <Layer z={Z.gear}>
            <motion.g style={{ rotate: gear }}>
              <circle cx={C} cy={C} r="149" fill="none" stroke="#fa7636" strokeOpacity="0.55" strokeWidth="2" />
              {teeth.map((a) => (
                <rect
                  key={a}
                  x={C - 2.5}
                  y={C - 156}
                  width="5"
                  height="7"
                  fill="#fa7636"
                  fillOpacity={a % 45 === 0 ? 0.95 : 0.5}
                  transform={`rotate(${a} ${C} ${C})`}
                />
              ))}
            </motion.g>
            {plates.map((p) => {
              const [cx0, cy0] = pt(188, p.a0 - 2);
              const [cx1, cy1] = pt(188, p.a1 + 2);
              return (
                <g key={p.mid} stroke="#fa7636" strokeOpacity="0.35" strokeWidth="1" fill="none">
                  <path d={arcPath(188, p.a0 - 2, p.a1 + 2)} />
                  <circle cx={cx0} cy={cy0} r="1.6" fill="#fa7636" />
                  <circle cx={cx1} cy={cy1} r="1.6" fill="#fa7636" />
                </g>
              );
            })}
          </Layer>

          {/* ── plate thickness: darker slices behind the plates ── */}
          {(compact ? PLATE_DEPTH.slice(1) : PLATE_DEPTH).map((z) => (
            <Layer key={z} z={z}>
              <motion.g style={{ rotate: shell }}>
                <circle cx={C} cy={C} r="184" fill="none" />
                {plates.map((p) => (
                  <Radial key={p.mid} angle={p.mid} push={push} dist={PUSH_PX}>
                    <path d={plateShape(p)} fill="#120a06" stroke="#fa7636" strokeOpacity="0.3" strokeWidth="1.4" />
                  </Radial>
                ))}
              </motion.g>
            </Layer>
          ))}

          {/* ── armor plates ── */}
          <Layer z={Z.plates}>
            {!compact && (
              <text
                x={C}
                y="399"
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="9"
                letterSpacing="3"
                fill="#fa7636"
                fillOpacity="0.85"
              >
                {charged ? "OVERCLOCK ▲▲▲ ENGAGED" : "UNIT H.THAN-01 · ONLINE"}
              </text>
            )}
            <motion.g style={{ rotate: shell }}>
              <circle cx={C} cy={C} r="184" fill="none" />
              {plates.map((p) => (
                <Radial key={p.mid} angle={p.mid} push={push} dist={PUSH_PX}>
                  <path
                    d={plateShape(p)}
                    fill="url(#halo-plate)"
                    stroke="url(#halo-edge)"
                    strokeWidth="1.6"
                    strokeOpacity={charged ? 1 : 0.8}
                    style={fade}
                  />
                  {!compact && <path d={plateShape(p)} fill="url(#halo-hex)" />}
                  <path d={arcPath(PLATE.r2 - 1.6, p.a0 + 1.5, p.a1 - 1.5)} fill="none" stroke="#ffb48a" strokeOpacity="0.55" strokeWidth="1" />
                  <path d={arcPath(PLATE.r1 + 1.6, p.a0 + 5, p.a1 - 5)} fill="none" stroke="#0b0705" strokeOpacity="0.8" strokeWidth="1.5" />
                  {compact ? (
                    <path d={arcPath(178, p.a0 + 4, p.a1 - 4)} fill="none" stroke="#fa7636" strokeOpacity="0.35" strokeWidth="1" />
                  ) : (
                    <>
                      <path d={arcPath(179.5, p.a0 + 3, p.a1 - 3)} fill="none" stroke="#0b0705" strokeWidth="3.4" strokeLinecap="round" />
                      <path
                        d={arcPath(179.5, p.a0 + 3, p.a1 - 3)}
                        fill="none"
                        stroke={charged ? "#fff1e6" : "#fa7636"}
                        strokeOpacity={charged ? 1 : 0.85}
                        strokeWidth="1.4"
                        strokeDasharray="5 11"
                        strokeLinecap="round"
                        className="halo-flow"
                        style={{ filter: "drop-shadow(0 0 2px rgba(250,118,54,0.9))" }}
                      />
                      {[-1, 1].flatMap((side) =>
                        [0, 1, 2, 3].map((k) => {
                          const a = p.mid + side * (11 + k * 4);
                          const [x1, y1] = pt(164, a);
                          const [x2, y2] = pt(173, a);
                          return (
                            <line
                              key={`${side}-${k}`}
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke={charged ? "#ffb48a" : "#fa7636"}
                              strokeOpacity={0.45 + heat * 0.5}
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              style={fade}
                            />
                          );
                        }),
                      )}
                      {[p.a0 + 5, p.a1 - 5].map((a) => {
                        const [x, y] = pt(169, a);
                        return <circle key={a} cx={x} cy={y} r="2.3" fill="#0b0705" stroke="#fa7636" strokeOpacity="0.8" strokeWidth="1" />;
                      })}
                      <circle
                        cx={pt(168.5, p.mid)[0]}
                        cy={pt(168.5, p.mid)[1]}
                        r="9.5"
                        fill="#0b0705"
                        stroke="#ffb48a"
                        strokeOpacity={charged ? 1 : 0.6}
                        strokeWidth="1"
                        style={fade}
                      />
                      <circle
                        cx={pt(168.5, p.mid)[0]}
                        cy={pt(168.5, p.mid)[1]}
                        r="12"
                        fill="none"
                        stroke="#fa7636"
                        strokeOpacity="0.35"
                        strokeWidth="0.8"
                        strokeDasharray="1.5 2.5"
                      />
                      <text
                        x={pt(168.5, p.mid)[0]}
                        y={pt(168.5, p.mid)[1] + 4.5}
                        textAnchor="middle"
                        fontFamily="Cinzel, serif"
                        fontSize="13"
                        fill="#ffb48a"
                      >
                        {p.glyph}
                      </text>
                    </>
                  )}
                </Radial>
              ))}
            </motion.g>
          </Layer>

          {/* ── clamp thickness ── */}
          {(compact ? CLAMP_DEPTH.slice(1) : CLAMP_DEPTH).map((z) => (
            <Layer key={z} z={z}>
              {clamps.map((a) => (
                <Radial key={a} angle={a} push={push} dist={PUSH_PX + 5}>
                  <polygon
                    points={clampShape}
                    transform={`rotate(${a} ${C} ${C})`}
                    fill="#120a06"
                    stroke="#fa7636"
                    strokeOpacity="0.3"
                    strokeWidth="1.2"
                  />
                </Radial>
              ))}
            </Layer>
          ))}

          {/* ── clamps, front-most ── */}
          <Layer z={Z.clamps}>
            {clamps.map((a, i) => (
              <Radial key={a} angle={a} push={push} dist={PUSH_PX + 5}>
                <g transform={`rotate(${a} ${C} ${C})`}>
                  <polygon points={clampShape} fill="#1c140f" stroke="#fa7636" strokeOpacity="0.85" strokeWidth="1.4" />
                  <line x1={C - 7} y1={C - 165} x2={C + 7} y2={C - 165} stroke="#fa7636" strokeOpacity="0.4" strokeWidth="1" />
                  {!compact && (
                    <g stroke="#fa7636" strokeOpacity="0.45" strokeWidth="0.8" fill="none">
                      <line x1={C - 8.5} y1={C - 186} x2={C - 8.5} y2={C - 161} />
                      <line x1={C + 8.5} y1={C - 186} x2={C + 8.5} y2={C - 161} />
                      <rect x={C - 10} y={C - 188} width="3" height="5" fill="#3a2a20" />
                      <rect x={C + 7} y={C - 188} width="3" height="5" fill="#3a2a20" />
                    </g>
                  )}
                  <polygon points={hex(C, C - 175, 3.6)} fill="#3a2a20" stroke="#ffb48a" strokeOpacity="0.8" strokeWidth="0.8" />
                  <rect
                    x={C - 4}
                    y={C - 195}
                    width="8"
                    height="3"
                    fill={charged ? "#ffb48a" : "#fa7636"}
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                </g>
              </Radial>
            ))}
          </Layer>
        </motion.div>
      </div>
    </div>
  );
}
