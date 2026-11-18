import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import MechaHalo from "./ui/mecha-halo";
import { HudCorners } from "./ui/section";
import { markBooted } from "@/lib/boot";

const MIN_MS = 2600; // always show the sequence at least this long
const MAX_MS = 6000; // never block the site longer than this
const TITLE = "ΑΘΗΝΑ";
const SEGMENTS = 24;

const LOG = [
  ["Mounting armor plates", "OK"],
  ["Calibrating optic core", "OK"],
  ["Syncing gear assembly", "OK"],
  ["Loading pilot profile · H.THAN", "OK"],
  ["Linking projects archive", "OK"],
  ["All systems nominal", "▲"],
] as const;

type Stage = "boot" | "open" | "done";

/**
 * Full-screen ΑΘΗΝΑ-OS boot sequence shown on every load. Waits for the page (fonts, images)
 * to be ready, then splits open like blast doors.
 */
export default function BootScreen() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>("boot");
  const [progress, setProgress] = useState(0);
  const ready = useRef(false);
  const start = useRef(performance.now());

  // Lock scroll while booting.
  useEffect(() => {
    if (stage === "done") return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [stage]);

  // Page readiness: window load + fonts.
  useEffect(() => {
    const loaded = new Promise<void>((res) =>
      document.readyState === "complete" ? res() : window.addEventListener("load", () => res(), { once: true }),
    );
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.all([loaded, fonts]).then(() => (ready.current = true));
  }, []);

  // Progress: eases toward 90% until the page is ready, then fills and opens.
  useEffect(() => {
    if (stage !== "boot") return;
    const minMs = reduce ? 600 : MIN_MS;
    let raf = 0;
    const tick = () => {
      const t = performance.now() - start.current;
      const canFinish = (ready.current && t >= minMs) || t >= MAX_MS;
      setProgress((p) => {
        const target = canFinish ? 100 : Math.min(90, (t / minMs) * 90);
        return p + (target - p) * (canFinish ? 0.25 : 0.08);
      });
      if (canFinish && performance.now() - start.current > minMs) {
        setProgress(100);
        window.setTimeout(() => setStage("open"), reduce ? 50 : 280);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, reduce]);

  // Doors finished: release the site.
  useEffect(() => {
    if (stage !== "open") return;
    markBooted();
    const t = window.setTimeout(() => setStage("done"), reduce ? 350 : 1100);
    return () => window.clearTimeout(t);
  }, [stage, reduce]);

  if (stage === "done") return null;

  const pct = Math.round(progress);
  const lit = Math.round((progress / 100) * SEGMENTS);
  const shown = Math.min(LOG.length, Math.floor((progress / 100) * (LOG.length + 0.6)));
  const opening = stage === "open";
  const door = reduce
    ? { duration: 0.3 }
    : { duration: 0.75, ease: [0.7, 0, 0.2, 1] as const, delay: 0.28 };

  return (
    <div className="fixed inset-0 z-[100]" role="status" aria-live="polite" aria-label={opening ? "Loaded" : `Loading ${pct}%`}>
      {/* ── blast doors (the backdrop) ── */}
      {(["top", "bottom"] as const).map((side) => (
        <motion.div
          key={side}
          aria-hidden
          initial={false}
          animate={
            opening
              ? reduce
                ? { opacity: 0 }
                : { y: side === "top" ? "-101%" : "101%" }
              : { y: 0, opacity: 1 }
          }
          transition={door}
          className={`absolute inset-x-0 h-1/2 overflow-hidden bg-ink ${side === "top" ? "top-0" : "bottom-0"}`}
        >
          <div className={`hud-grid absolute inset-x-0 h-[200%] ${side === "top" ? "top-0" : "bottom-0"}`} />
          <div className="scanlines absolute inset-0" />
          <div
            className={`absolute inset-x-0 h-[200%] bg-[radial-gradient(45%_35%_at_50%_50%,rgba(250,118,54,0.18),transparent_70%)] ${
              side === "top" ? "top-0" : "bottom-0"
            }`}
          />
          {/* meander band on the outer edge */}
          <div className={`greek-band absolute inset-x-0 h-6 opacity-50 ${side === "top" ? "top-0" : "bottom-0"}`} />
          {/* door seam: a faint hairline while booting; the armored lip and locking teeth light up as it unlocks */}
          <div className={`absolute inset-x-0 h-px bg-ember/15 ${side === "top" ? "bottom-0" : "top-0"}`} />
          <motion.div
            initial={false}
            animate={{ opacity: opening ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className={`absolute inset-x-0 ${side === "top" ? "bottom-0" : "top-0"}`}
          >
            <div className="h-[3px] bg-ember/80" />
            <div
              className={`absolute inset-x-0 h-2 bg-[repeating-linear-gradient(90deg,rgba(250,118,54,0.6)_0_24px,transparent_24px_48px)] ${
                side === "top" ? "bottom-[3px]" : "top-[3px]"
              }`}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* seam flash as the doors unlock */}
      {opening && !reduce ? (
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 0.75, times: [0, 0.4, 1] }}
          className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-peach shadow-[0_0_24px_6px_rgba(250,118,54,0.8)]"
        />
      ) : null}

      {/* ── HUD content ── */}
      <AnimatePresence>
        {!opening ? (
          <motion.div
            key="hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.96, filter: reduce ? "none" : "brightness(2)" }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            {/* screen-edge readouts */}
            <div className="pointer-events-none absolute inset-5 sm:inset-8">
              <HudCorners size="h-6 w-6" className="border-ember/70" />
              <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ember/80 sm:left-6">
                SYS://BOOT
              </span>
              <span className="absolute right-4 top-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ember/60 sm:right-6">
                v3.0
              </span>
              <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-dim sm:left-6">
                ΑΡΙΣΤΕΙΑ
              </span>
              <span className="absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ember/60 sm:right-6">
                UNIT H.THAN-01
              </span>
            </div>

            {/* ΑΘΗΝΑ assembling */}
            <motion.div
              initial={reduce ? false : { scale: 0.6, opacity: 0, rotate: -40 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-40 sm:w-52"
            >
              <MechaHalo compact charged={progress > 92} className="w-full" />
            </motion.div>

            {/* title */}
            <h2 className="mt-7 flex font-display text-3xl font-semibold tracking-[0.35em] sm:text-4xl" aria-hidden>
              {TITLE.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.09 }}
                  className="text-gold-gradient"
                >
                  {ch}
                </motion.span>
              ))}
              <motion.span
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="ml-1 font-mono text-sm tracking-[0.2em] text-ember/80 sm:text-base"
              >
                ·OS
              </motion.span>
            </h2>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-sand">Initializing pilot interface</p>

            {/* progress */}
            <div className="mt-7 w-full max-w-sm">
              <div className="chamfer-sm bg-ember/35 p-px">
                <div className="chamfer-sm flex gap-[3px] bg-ink p-1.5">
                  {Array.from({ length: SEGMENTS }, (_, i) => (
                    <span
                      key={i}
                      className={`h-2.5 flex-1 transition-colors duration-150 ${
                        i < lit ? "bg-ember shadow-[0_0_8px_rgba(250,118,54,0.8)]" : "bg-ember/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-dim">Core sync</span>
                <span className="tabular-nums text-peach">{String(pct).padStart(3, "0")}%</span>
              </div>
            </div>

            {/* boot log */}
            <ul className="mt-5 h-[7.5rem] w-full max-w-sm overflow-hidden font-mono text-[10px] uppercase leading-5 tracking-[0.14em]">
              {LOG.slice(0, shown).map(([line, status], i) => (
                <motion.li
                  key={line}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-ember">›</span>
                  <span className={i === LOG.length - 1 ? "text-cream" : "text-sand"}>{line}</span>
                  <span className="flex-1 overflow-hidden whitespace-nowrap text-dim/60">
                    ··································································
                  </span>
                  <span className="text-ember">{status}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
