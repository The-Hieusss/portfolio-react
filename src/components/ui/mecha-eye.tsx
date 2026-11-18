import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

const SOCKET = 98; // socket radius inside the halo's inner plate (r=104)
const IRIS = 56;
const MAX_LOOK = 30; // how far the iris can travel from center
const IDLE_MS = 2200; // pointer quiet for this long → eye starts looking around

const fibers = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
const blades = Array.from({ length: 6 }, (_, i) => i * 60);

/**
 * Robotic eye drawn inside the MechaHalo SVG (center cx, cy).
 * Tracks the cursor; when the pointer is idle (or on touch screens) it glances around in snappy
 * saccades, blinks with armored shutters, and its aperture breathes.
 */
export default function MechaEye({ cx, cy, charged = false }: { cx: number; cy: number; charged?: boolean }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const anchor = useRef<SVGCircleElement>(null);
  const lastPointer = useRef(0);
  const [blink, setBlink] = useState(false);
  const [aperture, setAperture] = useState(1);

  // Stiff, lightly damped springs read as servo motors: quick snap, tiny settle.
  const spring = reduce ? { stiffness: 90, damping: 20 } : { stiffness: 320, damping: 24, mass: 0.6 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  // Highlights lag slightly behind the iris for a glassy lens feel.
  const hx = useSpring(0, { stiffness: 180, damping: 20 });
  const hy = useSpring(0, { stiffness: 180, damping: 20 });

  const lookAt = (dx: number, dy: number) => {
    x.set(dx);
    y.set(dy);
    hx.set(dx * 0.75);
    hy.set(dy * 0.75);
  };

  // Follow the cursor.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = anchor.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0) return; // hidden instance
      lastPointer.current = performance.now();
      const vx = e.clientX - (r.left + r.width / 2);
      const vy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(vx, vy) || 1;
      // Ease toward full deflection over ~450px so nearby movement still reads.
      const reach = MAX_LOOK * Math.min(1, dist / 450) ** 0.7;
      lookAt((vx / dist) * reach, (vy / dist) * reach);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Idle: glance around in saccades, occasionally recentering.
  useEffect(() => {
    if (reduce) return;
    let t = 0;
    const glance = () => {
      if (performance.now() - lastPointer.current > IDLE_MS) {
        if (Math.random() < 0.25) {
          lookAt(0, 0);
        } else {
          const a = Math.random() * Math.PI * 2;
          const d = MAX_LOOK * (0.45 + Math.random() * 0.55);
          lookAt(Math.cos(a) * d, Math.sin(a) * d * 0.75);
        }
        setAperture(0.8 + Math.random() * 0.4);
      }
      t = window.setTimeout(glance, 900 + Math.random() * 1600);
    };
    t = window.setTimeout(glance, 1200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  // Blink every few seconds, sometimes a double blink.
  useEffect(() => {
    if (reduce) return;
    let t = 0;
    const shut = (after: () => void) => {
      setBlink(true);
      t = window.setTimeout(() => {
        setBlink(false);
        after();
      }, 130);
    };
    const schedule = () => {
      t = window.setTimeout(
        () =>
          shut(() => {
            if (Math.random() < 0.2) t = window.setTimeout(() => shut(schedule), 160);
            else schedule();
          }),
        2800 + Math.random() * 3500,
      );
    };
    schedule();
    return () => window.clearTimeout(t);
  }, [reduce]);

  const pupilScale = charged ? 1.5 : aperture;
  const origin = { transformOrigin: `${cx}px ${cy}px` };
  const lid = { duration: 0.09, ease: [0.7, 0, 0.3, 1] as const };

  return (
    <g>
      <defs>
        <clipPath id={`${uid}-socket`}>
          <circle cx={cx} cy={cy} r={SOCKET} />
        </clipPath>
        <radialGradient id={`${uid}-iris`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff1e6" />
          <stop offset="22%" stopColor="#ffb48a" />
          <stop offset="48%" stopColor="#fa7636" />
          <stop offset="78%" stopColor="#8a3410" />
          <stop offset="100%" stopColor="#2a1208" />
        </radialGradient>
        <radialGradient id={`${uid}-socket-shade`} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#0b0705" stopOpacity="0" />
          <stop offset="100%" stopColor="#0b0705" stopOpacity="0.95" />
        </radialGradient>
      </defs>

      {/* invisible anchor used to locate the eye on screen */}
      <circle ref={anchor} cx={cx} cy={cy} r={SOCKET} fill="none" />

      <g clipPath={`url(#${uid}-socket)`}>
        {/* socket backplate */}
        <circle cx={cx} cy={cy} r={SOCKET} fill="#120a06" />
        <g stroke="#fa7636" strokeOpacity="0.12" strokeWidth="1">
          <line x1={cx - SOCKET} y1={cy} x2={cx + SOCKET} y2={cy} />
          <line x1={cx} y1={cy - SOCKET} x2={cx} y2={cy + SOCKET} />
          <circle cx={cx} cy={cy} r={IRIS + MAX_LOOK} fill="none" strokeDasharray="2 6" />
        </g>

        {/* iris assembly */}
        <motion.g style={{ x, y }}>
          {/* glow bloom */}
          <circle
            cx={cx}
            cy={cy}
            r={IRIS + 14}
            fill="#fa7636"
            opacity={charged ? 0.35 : 0.18}
            style={{ filter: "blur(10px)", transition: "opacity 300ms" }}
          />
          <circle cx={cx} cy={cy} r={IRIS} fill={`url(#${uid}-iris)`} />
          <circle cx={cx} cy={cy} r={IRIS} fill="none" stroke="#ffb48a" strokeOpacity="0.85" strokeWidth="2" />
          <circle cx={cx} cy={cy} r={IRIS - 6} fill="none" stroke="#0b0705" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* iris fibers / lens markings, slowly turning */}
          <g className="animate-spin-slow" style={origin}>
            {fibers.map((a) => {
              const rad = (a * Math.PI) / 180;
              return (
                <line
                  key={a}
                  x1={cx + 26 * Math.cos(rad)}
                  y1={cy + 26 * Math.sin(rad)}
                  x2={cx + 46 * Math.cos(rad)}
                  y2={cy + 46 * Math.sin(rad)}
                  stroke="#0b0705"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
              );
            })}
          </g>
          <g className="animate-spin-rev" style={origin}>
            <circle cx={cx} cy={cy} r={36} fill="none" stroke="#fff1e6" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="14 6 2 6" />
          </g>

          {/* aperture: pupil + shutter blades, dilates and contracts */}
          <motion.g
            style={origin}
            animate={{ scale: pupilScale, rotate: charged ? 60 : (aperture - 1) * 90 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            {blades.map((a) => {
              const rad = (a * Math.PI) / 180;
              const r1 = 19;
              const r2 = 27;
              return (
                <line
                  key={a}
                  x1={cx + r1 * Math.cos(rad)}
                  y1={cy + r1 * Math.sin(rad)}
                  x2={cx + r2 * Math.cos(rad + 0.5)}
                  y2={cy + r2 * Math.sin(rad + 0.5)}
                  stroke="#0b0705"
                  strokeOpacity="0.75"
                  strokeWidth="2"
                />
              );
            })}
            <circle cx={cx} cy={cy} r={19} fill="#0b0705" stroke="#fa7636" strokeWidth="2" />
            <circle cx={cx} cy={cy} r={9} fill="none" stroke="#fa7636" strokeOpacity="0.55" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={3.2} fill="#ffb48a" className="animate-pulse" />
          </motion.g>
        </motion.g>

        {/* lens highlights */}
        <motion.g style={{ x: hx, y: hy }} pointerEvents="none">
          <ellipse cx={cx - 20} cy={cy - 22} rx={8} ry={5.5} fill="#fff" opacity="0.75" transform={`rotate(-35 ${cx - 20} ${cy - 22})`} />
          <circle cx={cx + 16} cy={cy + 14} r={2.4} fill="#fff" opacity="0.45" />
        </motion.g>

        {/* inner vignette */}
        <circle cx={cx} cy={cy} r={SOCKET} fill={`url(#${uid}-socket-shade)`} pointerEvents="none" />

        {/* armored shutter lids */}
        <motion.g initial={false} animate={{ y: blink ? 0 : -SOCKET - 4 }} transition={lid}>
          <rect x={cx - SOCKET} y={cy - SOCKET} width={SOCKET * 2} height={SOCKET} fill="#1c140f" />
          <g stroke="#fa7636" strokeOpacity="0.25" strokeWidth="1">
            <line x1={cx - SOCKET} y1={cy - 30} x2={cx + SOCKET} y2={cy - 30} />
            <line x1={cx - SOCKET} y1={cy - 60} x2={cx + SOCKET} y2={cy - 60} />
          </g>
          <line x1={cx - SOCKET} y1={cy} x2={cx + SOCKET} y2={cy} stroke="#fa7636" strokeWidth="3" />
        </motion.g>
        <motion.g initial={false} animate={{ y: blink ? 0 : SOCKET + 4 }} transition={lid}>
          <rect x={cx - SOCKET} y={cy} width={SOCKET * 2} height={SOCKET} fill="#1c140f" />
          <g stroke="#fa7636" strokeOpacity="0.25" strokeWidth="1">
            <line x1={cx - SOCKET} y1={cy + 30} x2={cx + SOCKET} y2={cy + 30} />
            <line x1={cx - SOCKET} y1={cy + 60} x2={cx + SOCKET} y2={cy + 60} />
          </g>
          <line x1={cx - SOCKET} y1={cy} x2={cx + SOCKET} y2={cy} stroke="#fa7636" strokeWidth="3" />
        </motion.g>
      </g>

      {/* socket rim */}
      <circle cx={cx} cy={cy} r={SOCKET} fill="none" stroke="#fa7636" strokeOpacity="0.7" strokeWidth="2" />
    </g>
  );
}
