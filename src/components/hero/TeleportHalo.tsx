import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import MechaHalo from "../ui/mecha-halo";
import { HudCorners } from "../ui/section";

type Spot = { x: number; y: number; size: number; home: boolean };
type Phase = "idle" | "out" | "in";
type Box = { x: number; y: number; w: number; h: number };

const OUT_MS = 450;
const IN_MS = 750;
const HINT_H = 28; // room for the "Click the core" line under big halos
const SMALL = [110, 170] as const; // size range in the text column
const EDGE = 16;
const TOP_SAFE = 96; // navbar + HUD readout row
const PAD = 14; // breathing room around text

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const hits = (a: Box, b: Box) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const boxOf = (s: Spot): Box => ({ x: s.x, y: s.y, w: s.size, h: s.size + (s.size >= 250 ? HINT_H : 0) });

/** Measures the hero's text (badge, name, tagline, buttons) as boxes the halo must not cover. */
function measureObstacles(section: DOMRect, textCol: HTMLElement): Box[] {
  const out: Box[] = [];
  const add = (r: DOMRect) => {
    if (r.width && r.height)
      out.push({
        x: r.left - section.left - PAD,
        y: r.top - section.top - PAD,
        w: r.width + PAD * 2,
        h: r.height + PAD * 2,
      });
  };
  textCol.querySelectorAll<HTMLElement>("[data-obstacle]").forEach((el) => {
    const mode = el.dataset.obstacle;
    if (mode === "text") {
      const range = document.createRange();
      range.selectNodeContents(el);
      add(range.getBoundingClientRect());
    } else if (mode === "children") {
      Array.from(el.children).forEach((c) => add(c.getBoundingClientRect()));
    } else {
      add(el.getBoundingClientRect());
    }
  });
  return out;
}

const sparks = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
  const d = 0.45 + Math.random() * 0.35;
  return { dx: Math.cos(a) * d, dy: Math.sin(a) * d, s: 3 + Math.round(Math.random() * 3) };
});

/** Beam, scan slit, shockwave and sparks for one teleport stage. */
function TeleportFx({ phase, size }: { phase: Exclude<Phase, "idle">; size: number }) {
  const inbound = phase === "in";
  return (
    <div aria-hidden className="pointer-events-none absolute left-0 top-0 z-20" style={{ width: size, height: size }}>
      {/* sky beam */}
      <motion.span
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: inbound ? 0.7 : 0.45, times: [0, 0.3, 0.65, 1], ease: "easeInOut" }}
        className="absolute bottom-1/2 left-1/2 h-[160vh] origin-bottom bg-gradient-to-t from-peach via-ember to-transparent shadow-[0_0_30px_8px_rgba(250,118,54,0.6)]"
        style={{ width: Math.max(3, size / 70), marginLeft: -Math.max(3, size / 70) / 2 }}
      />
      {/* horizontal scan slit */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: inbound ? 0.5 : 0.4, delay: inbound ? 0.12 : 0.05 }}
        className="absolute left-1/2 top-1/2 h-[2px] w-[170%] -translate-x-1/2 -translate-y-1/2 bg-peach shadow-[0_0_14px_3px_rgba(250,118,54,0.9)]"
      />
      {/* core flash */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.1, 0], opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.45, delay: inbound ? 0.12 : 0.15 }}
        className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,#fff1e6,rgba(250,118,54,0.7)_40%,transparent_70%)]"
      />
      {/* shockwave rings on arrival */}
      {inbound
        ? [0, 0.12].map((d) => (
            <motion.span
              key={d}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 1.55], opacity: [1, 0] }}
              transition={{ duration: 0.7, delay: 0.18 + d, ease: "easeOut" }}
              className="absolute inset-[8%] rounded-full border-2 border-peach shadow-[0_0_20px_rgba(250,118,54,0.7)]"
            />
          ))
        : null}
      {/* sparks */}
      {sparks.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={
            inbound
              ? { x: [p.dx * size, 0], y: [p.dy * size, 0], opacity: [0, 1, 0], scale: [1, 0.4] }
              : { x: [0, p.dx * size], y: [0, p.dy * size], opacity: [1, 0], scale: [1, 0.3] }
          }
          transition={{ duration: inbound ? 0.4 : 0.5, ease: inbound ? "easeIn" : "easeOut" }}
          className="absolute left-1/2 top-1/2 rotate-45 bg-peach shadow-[0_0_8px_rgba(250,118,54,1)]"
          style={{ width: p.s, height: p.s, marginLeft: -p.s / 2, marginTop: -p.s / 2 }}
        />
      ))}
    </div>
  );
}

// filters share one structure so framer can interpolate them
const fx = (b: number, split: number, a: number) =>
  `brightness(${b}) drop-shadow(${split}px 0 0 rgba(255,214,170,${a})) drop-shadow(${-split}px 0 0 rgba(230,60,20,${a}))`;

/**
 * Desktop hero halo that periodically teleports to random spots in the hero.
 * In the text column it shrinks and only lands in gaps that don't cover the name, tagline or buttons.
 */
export default function TeleportHalo({
  sectionRef,
  textRef,
  homeRef,
  away,
  charged,
  onOverclock,
  rotateX,
  rotateY,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  textRef: RefObject<HTMLElement | null>;
  homeRef: RefObject<HTMLElement | null>;
  away: boolean;
  charged: boolean;
  onOverclock: () => void;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}) {
  const [spot, setSpot] = useState<Spot | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState(0); // remounts FX each stage
  const hovering = useRef(false);
  const busy = useRef(false);
  const spotRef = useRef<Spot | null>(null);
  spotRef.current = spot;

  const homeSpot = useCallback((): Spot | null => {
    const s = sectionRef.current?.getBoundingClientRect();
    const h = homeRef.current?.getBoundingClientRect();
    if (!s || !h || !h.width) return null;
    return { x: h.left - s.left, y: h.top - s.top, size: h.width, home: true };
  }, [sectionRef, homeRef]);

  // Park at home on mount and whenever layout changes while parked.
  useLayoutEffect(() => {
    // Any layout change sends it home rather than risk a random spot now overlapping text.
    const park = () => {
      if (!busy.current) setSpot(homeSpot());
    };
    park();
    const ro = new ResizeObserver(park);
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (homeRef.current) ro.observe(homeRef.current);
    return () => ro.disconnect();
  }, [homeSpot, sectionRef, homeRef]);

  const pickSpot = useCallback((): Spot | null => {
    const section = sectionRef.current;
    const text = textRef.current;
    const home = homeSpot();
    const cur = spotRef.current;
    if (!section || !text || !home) return null;
    const s = section.getBoundingClientRect();
    const W = s.width;
    const H = s.height;
    const obstacles = measureObstacles(s, text);
    const textRight = text.getBoundingClientRect().right - s.left;

    // Sometimes just go home.
    if (cur && !cur.home && Math.random() < 0.25) return home;

    for (let i = 0; i < 80; i++) {
      const inText = Math.random() < 0.5;
      const size = inText ? rand(SMALL[0], SMALL[1]) : rand(0.5, 0.95) * home.size;
      const xMin = inText ? EDGE : textRight + 12;
      const xMax = inText ? textRight - size : W - size - EDGE;
      if (xMax <= xMin) continue;
      const cand: Spot = { x: rand(xMin, xMax), y: 0, size, home: false };
      const box0 = boxOf(cand);
      const yMax = H - box0.h - 40;
      if (yMax <= TOP_SAFE) continue;
      cand.y = rand(TOP_SAFE, yMax);
      const box = boxOf(cand);
      if (obstacles.some((o) => hits(box, o))) continue;
      if (cur) {
        const d = Math.hypot(cand.x + size / 2 - (cur.x + cur.size / 2), cand.y + size / 2 - (cur.y + cur.size / 2));
        if (d < Math.max(size, cur.size) * 0.7) continue; // make the jump read as a jump
      }
      return cand;
    }
    return cur?.home ? null : home;
  }, [sectionRef, textRef, homeSpot]);

  const teleport = useCallback(
    (next: Spot) => {
      busy.current = true;
      setPhase("out");
      setStage((n) => n + 1);
      window.setTimeout(() => {
        setSpot(next);
        setPhase("in");
        setStage((n) => n + 1);
        window.setTimeout(() => {
          setPhase("idle");
          busy.current = false;
        }, IN_MS);
      }, OUT_MS);
    },
    [],
  );

  // Random teleport loop. Holds while hovered, overclocked, scrolled away or tab hidden.
  useEffect(() => {
    if (away) return;
    let t = 0;
    const loop = (delay: number) => {
      t = window.setTimeout(() => {
        if (hovering.current || charged || busy.current || document.hidden) return loop(1500);
        const next = pickSpot();
        if (next) teleport(next);
        loop(rand(5000, 9500));
      }, delay);
    };
    loop(rand(3500, 6000));
    return () => window.clearTimeout(t);
  }, [away, charged, pickSpot, teleport]);

  // Scrolled away: quietly reset to home. Coming back: beam in there.
  const wasAway = useRef(false);
  useEffect(() => {
    if (away) {
      wasAway.current = true;
      const t = window.setTimeout(() => setSpot(homeSpot()), 500);
      return () => window.clearTimeout(t);
    }
    if (!wasAway.current) return;
    wasAway.current = false;
    busy.current = true;
    setPhase("in");
    setStage((n) => n + 1);
    const t = window.setTimeout(() => {
      setPhase("idle");
      busy.current = false;
    }, IN_MS + 300);
    return () => window.clearTimeout(t);
  }, [away, homeSpot]);

  const animate = useMemo(() => {
    if (away) return { opacity: 0, scaleX: 1.3, scaleY: 0.02, filter: fx(3, 6, 0.8) };
    if (phase === "out")
      return {
        opacity: [1, 1, 0],
        scaleX: [1, 0.92, 1.35],
        scaleY: [1, 1.08, 0.02],
        filter: [fx(1, 0, 0), fx(1.8, 8, 0.7), fx(3, 2, 0.9)],
      };
    if (phase === "in")
      return {
        opacity: [0, 1, 0.6, 1, 1],
        scaleX: [1.35, 0.9, 1.04, 0.99, 1],
        scaleY: [0.02, 1.12, 0.96, 1.01, 1],
        filter: [fx(3, 10, 0.9), fx(2, 6, 0.7), fx(1.4, 3, 0.5), fx(1.1, 1, 0.2), fx(1, 0, 0)],
      };
    return { opacity: 1, scaleX: 1, scaleY: 1, scale: charged ? 1.04 : 1 };
  }, [away, phase, charged]);

  const transition =
    phase === "out"
      ? { duration: OUT_MS / 1000, times: [0, 0.35, 1], ease: "easeIn" as const }
      : phase === "in"
        ? { duration: IN_MS / 1000 - 0.05, times: [0, 0.35, 0.55, 0.8, 1], delay: 0.05 }
        : away
          ? { duration: 0.45, ease: "easeIn" as const }
          : { duration: charged ? 0.25 : 0.5, ease: [0.22, 1, 0.36, 1] as const };

  if (!spot) return null;
  const big = spot.size >= 250;

  return (
    <div
      className="absolute z-10 [perspective:900px]"
      style={{ left: spot.x, top: spot.y, width: spot.size }}
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      {phase !== "idle" ? <TeleportFx key={stage} phase={phase} size={spot.size} /> : null}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ ...animate, transitionEnd: phase === "idle" && !away ? { filter: "none" } : undefined }}
        transition={transition}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={big ? "relative p-4" : "relative p-2"}
      >
        <HudCorners size={big ? "h-5 w-5" : "h-3 w-3"} />
        <button
          type="button"
          onClick={onOverclock}
          tabIndex={-1}
          aria-hidden
          className="group block w-full cursor-pointer rounded-full focus:outline-none"
          title="Click to overclock"
        >
          <MechaHalo
            className="w-full transition-[filter] duration-300 group-hover:drop-shadow-[0_0_30px_rgba(250,118,54,0.45)]"
            charged={charged}
            compact={!big}
          />
        </button>
        {big ? (
          <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ember/60">
            {charged ? "⚡ Power surge" : "▸ Click the core"}
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}
