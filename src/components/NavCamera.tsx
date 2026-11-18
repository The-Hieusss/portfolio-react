import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import MechaHalo from "./ui/mecha-halo";
import { cn } from "@/lib/utils";
import { setAssistantOpen, useAssistantOpen } from "@/lib/assistant";
import { playMechaClose, playMechaOpen } from "@/lib/mecha-sfx";

const SIZE = 64; // camera diameter in px (h-16)
const K = SIZE / 400; // halo viewBox units → px
const MAX_ANGLE = 70; // keep the ray aimed at the page, not up into the navbar
const CYCLE = 11; // s: the ray sweeps on its own this often…
const SHOW = 6; // …for this long
const TOUCH_HOLD = 2.5; // s the ray stays lit after a touch

/**
 * Phone-only ΑΘΗΝΑ: a surveillance camera hung from the sticky navbar.
 * The eye tracks touches and glances around, a scan cone sweeps the page now and then,
 * and tapping it opens the ΑΘΗΝΑ chat with the overclock spin.
 */
export default function NavCamera({ hidden = false }: { hidden?: boolean }) {
  const reduce = useReducedMotion();
  const open = useAssistantOpen();
  const [surge, setSurge] = useState(0);

  // The eye's gaze (SVG units) drives the ray: its tip sits on the iris and it points where the eye looks.
  const lookX = useMotionValue(0);
  const lookY = useMotionValue(0);
  const look = useMemo(() => ({ x: lookX, y: lookY }), [lookX, lookY]);
  const tipX = useTransform(lookX, (v) => v * K);
  const tipY = useTransform(lookY, (v) => v * K);
  const angle = useTransform([lookX, lookY], ([x, y]: number[]) => {
    const deg = (Math.atan2(-x, y) * 180) / Math.PI;
    return Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, deg));
  });

  // Lit on its periodic sweep, and whenever someone touches the screen.
  const rayOpacity = useMotionValue(0);
  const lastTouch = useRef(-1e9);
  useEffect(() => {
    const onTouch = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") lastTouch.current = performance.now();
    };
    window.addEventListener("pointerdown", onTouch, { passive: true });
    window.addEventListener("pointermove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onTouch);
      window.removeEventListener("pointermove", onTouch);
    };
  }, []);
  useAnimationFrame((t) => {
    if (reduce) return;
    const c = (t / 1000) % CYCLE;
    const ramp = 0.8;
    const sweep = c < SHOW ? Math.min(1, c / ramp, (SHOW - c) / ramp) : 0;
    const since = (performance.now() - lastTouch.current) / 1000;
    const touch = since < TOUCH_HOLD ? Math.min(1, (TOUCH_HOLD - since) / 0.6) : 0;
    rayOpacity.set(Math.max(sweep, touch) * 0.9);
  });

  const toggle = () => {
    if (open) {
      playMechaClose();
    } else {
      playMechaOpen();
      setSurge((n) => n + 1);
    }
    setAssistantOpen(!open);
  };

  return (
    <div
      className={cn(
        // centered on the navbar's bottom edge (h-16), between the name and the menu button
        "absolute right-[5.75rem] top-8 z-10 h-16 w-16 transition-opacity duration-300 md:hidden",
        hidden && "pointer-events-none opacity-0",
      )}
    >

      {/* ceiling rail the camera hangs from */}
      <span
        aria-hidden
        className="chamfer-sm pointer-events-none absolute left-1/2 top-[calc(50%-3px)] h-1.5 w-24 -translate-x-1/2 bg-ember/45"
      />
      {/* cradle hugging the lower housing */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-1.5 -bottom-1.5 top-1/2 rounded-b-full border-2 border-t-0 border-ember/45 bg-ink/85"
      />
      {/* REC light */}
      <span aria-hidden className="pointer-events-none absolute -left-9 top-[calc(50%+6px)] flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,1)]" />
        <span className="font-mono text-[7px] tracking-[0.15em] text-peach/80">REC</span>
      </span>

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close ΑΘΗΝΑ assistant" : "Open ΑΘΗΝΑ assistant"}
        aria-expanded={open}
        className="relative block h-full w-full rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
      >
        <MechaHalo
          compact
          charged={open}
          surge={surge}
          look={look}
          className="h-full w-full drop-shadow-[0_0_14px_rgba(250,118,54,0.55)]"
        />
      </button>

      {/* scan ray: shines out of the lens and follows the eye */}
      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[16rem] w-[11rem] -translate-x-1/2 [clip-path:polygon(50%_0,0_100%,100%_100%)] bg-[linear-gradient(to_bottom,rgba(255,180,138,0.45),rgba(250,118,54,0.18)_18%,rgba(250,118,54,0.05)_60%,transparent)] mix-blend-screen"
          style={{ x: tipX, y: tipY, rotate: angle, opacity: rayOpacity, transformOrigin: "50% 0%" }}
        />
      ) : null}
    </div>
  );
}
