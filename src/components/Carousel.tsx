import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Crosshair, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HudCorners } from "./ui/section";

const frameworks = [
  { img: "/frameworks/react.svg", name: "React" },
  { img: "/frameworks/reactnative.svg", name: "React Native" },
  { img: "/frameworks/node.svg", name: "Node.js" },
  { img: "/frameworks/express.svg", name: "Express" },
  { img: "/frameworks/tailwindcss.svg", name: "Tailwind CSS" },
  { img: "/frameworks/vite.png", name: "Vite" },
  { img: "/frameworks/bun.svg", name: "Bun" },
  { img: "/frameworks/supabase.svg", name: "Supabase" },
  { img: "/frameworks/postgre.svg", name: "PostgreSQL" },
  { img: "/frameworks/mysql.svg", name: "MySQL" },
  { img: "/frameworks/firebase.svg", name: "Firebase" },
  { img: "/frameworks/three.png", name: "Three.js" },
  { img: "/frameworks/gemini.png", name: "Gemini" },
  { img: "/frameworks/expo.svg", name: "Expo" },
  { img: "/frameworks/angular.svg", name: "Angular" },
  { img: "/frameworks/aspnet.svg", name: "ASP.NET" },
  { img: "/frameworks/ROR.svg", name: "Ruby on Rails" },
  { img: "/frameworks/bootstrap.png", name: "Bootstrap" },
  { img: "/frameworks/git.svg", name: "Git" },
].map((f, i) => ({ ...f, code: `MOD-${String(i + 1).padStart(2, "0")}` }));

type Module = (typeof frameworks)[number];
type Phase = "idle" | "playing" | "over";
type Flash = { code: string; ok: boolean; id: number };

const half = Math.ceil(frameworks.length / 2);
const rails = [frameworks.slice(0, half), frameworks.slice(half)];

const ROUND_MS = 30_000;
const MISS_PENALTY_MS = 2_000;
const BEST_KEY = "target-lock-best";

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};
const saveBest = (n: number) => {
  try {
    localStorage.setItem(BEST_KEY, String(n));
  } catch {
    /* storage unavailable: best score just won't persist */
  }
};

const pickTarget = (prev?: Module) => {
  const pool = frameworks.filter((m) => m.code !== prev?.code);
  return pool[Math.floor(Math.random() * pool.length)];
};

/** A single plug-in "cartridge": logo socket, unit code and a signal meter. */
function Cartridge({
  m,
  flash,
  onPick,
}: {
  m: Module;
  flash?: Flash;
  /** Present only during a round: turns the tile into a button. */
  onPick?: (m: Module) => void;
}) {
  const hit = flash?.ok === true;
  const miss = flash?.ok === false;

  const body = (
    <div
      className={cn(
        "chamfer-sm relative flex items-center gap-3 py-2 pl-2 pr-4 transition-colors duration-200",
        hit ? "bg-ember/30" : miss ? "bg-red-500/25" : "bg-surface-2",
      )}
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
        <HudCorners size="h-2 w-2" className="border-ember/60 transition group-hover/tile:border-ember" />
        <span className="chamfer-sm flex h-8 w-8 items-center justify-center bg-white p-1 transition duration-300 group-hover/tile:scale-110">
          <img src={m.img} alt="" className="h-full w-full object-contain" loading="lazy" draggable={false} />
        </span>
      </span>
      <span className="flex flex-col text-left">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ember/70 transition group-hover/tile:text-ember">
          {hit ? "LOCKED" : miss ? "NO MATCH" : m.code}
        </span>
        <span className="whitespace-nowrap text-sm font-medium text-cream">{m.name}</span>
      </span>
      <span aria-hidden className="ml-1 flex items-end gap-[3px] self-stretch py-1.5">
        {[0.45, 0.7, 1].map((h, i) => (
          <span
            key={i}
            style={{ height: `${h * 100}%` }}
            className="w-[3px] bg-ember/35 transition group-hover/tile:bg-ember"
          />
        ))}
      </span>
    </div>
  );

  const shell = cn(
    "group/tile chamfer-sm block shrink-0 p-px transition duration-200",
    hit
      ? "bg-ember drop-shadow-[0_0_18px_rgba(250,118,54,0.8)]"
      : miss
        ? "animate-shake bg-red-500"
        : "bg-ember/25 hover:bg-ember hover:drop-shadow-[0_0_16px_rgba(250,118,54,0.45)]",
  );

  return onPick ? (
    <button
      type="button"
      key={flash?.id}
      onPointerDown={(e) => {
        e.preventDefault();
        onPick(m);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPick(m);
        }
      }}
      aria-label={`Lock ${m.name}`}
      className={cn(shell, "cursor-crosshair touch-manipulation")}
    >
      {body}
    </button>
  ) : (
    <div className={shell}>{body}</div>
  );
}

/** A looping feed. Driven by rAF so its speed can change smoothly mid-round. */
function Rail({
  items,
  reverse,
  speed,
  paused,
  renderTile,
}: {
  items: Module[];
  reverse?: boolean;
  speed: number;
  paused: boolean;
  renderTile: (m: Module, key: string) => ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const speedRef = useRef(speed);
  const pausedRef = useRef(paused);
  speedRef.current = speed;
  pausedRef.current = paused;

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const el = track.current;
      if (el) {
        const loop = el.scrollWidth / 2;
        if (!pausedRef.current && loop > 0) offset.current = (offset.current + speedRef.current * dt) % loop;
        const x = reverse ? offset.current - loop : -offset.current;
        el.style.transform = `translate3d(${x}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reverse]);

  return (
    <div className="mask-fade-x overflow-hidden">
      {/* pr-3 matches gap-3 so both copies are exactly the same width */}
      <div ref={track} className="flex w-max gap-3 py-1.5 pr-3 will-change-transform">
        {[...items, ...items].map((m, i) => renderTile(m, `${m.code}-${i}`))}
      </div>
    </div>
  );
}

function Carousel() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [hovering, setHovering] = useState(false);
  const [target, setTarget] = useState<Module>(() => pickTarget());
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS);
  const [best, setBest] = useState(readBest);
  const [newBest, setNewBest] = useState(false);
  const [flash, setFlash] = useState<Flash | null>(null);
  const [pop, setPop] = useState<{ text: string; ok: boolean; id: number } | null>(null);
  const deadline = useRef(0);
  const scoreRef = useRef(0);
  scoreRef.current = score;

  const playing = phase === "playing";
  const level = Math.floor(hits / 3);
  const speed = playing
    ? Math.min(reduce ? 70 : 170, (reduce ? 35 : 60) + level * 16)
    : reduce
      ? 0
      : 30;

  const start = () => {
    setScore(0);
    setHits(0);
    setMisses(0);
    setCombo(0);
    setFlash(null);
    setPop(null);
    setNewBest(false);
    setTarget((t) => pickTarget(t));
    deadline.current = performance.now() + ROUND_MS;
    setTimeLeft(ROUND_MS);
    setPhase("playing");
  };

  // Round clock.
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const left = Math.max(0, deadline.current - performance.now());
      setTimeLeft(left);
      if (left <= 0) {
        setPhase("over");
        const final = scoreRef.current;
        setBest((b) => {
          if (final > b) {
            saveBest(final);
            setNewBest(true);
            return final;
          }
          return b;
        });
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [playing]);

  // Esc abandons a round.
  useEffect(() => {
    if (phase === "idle") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPhase("idle");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // Clear tile feedback shortly after it fires.
  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 380);
    return () => window.clearTimeout(id);
  }, [flash]);

  const onPick = useCallback(
    (m: Module) => {
      const id = performance.now();
      if (m.code === target.code) {
        const gained = 10 + combo * 2;
        setScore((s) => s + gained);
        setCombo((c) => c + 1);
        setHits((h) => h + 1);
        setFlash({ code: m.code, ok: true, id });
        setPop({ text: `+${gained}`, ok: true, id });
        setTarget(pickTarget(m));
      } else {
        deadline.current -= MISS_PENALTY_MS;
        setCombo(0);
        setMisses((n) => n + 1);
        setFlash({ code: m.code, ok: false, id });
        setPop({ text: "−2s", ok: false, id });
      }
    },
    [target, combo],
  );

  const renderTile = (m: Module, key: string) => (
    <Cartridge
      key={key}
      m={m}
      flash={flash?.code === m.code ? flash : undefined}
      onPick={playing ? onPick : undefined}
    />
  );

  const secs = (timeLeft / 1000).toFixed(1);
  const accuracy = hits + misses ? Math.round((hits / (hits + misses)) * 100) : 0;
  const rank =
    score >= 300 ? "Olympian" : score >= 180 ? "Spartan" : score >= 80 ? "Hoplite" : "Recruit";

  return (
    <div
      className="group/bay chamfer bg-ember/30 p-px"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <div className="chamfer relative overflow-hidden bg-surface">
        {/* Accessible static list for screen readers */}
        <ul className="sr-only" aria-label="Frameworks and tools">
          {frameworks.map((f) => (
            <li key={f.name}>{f.name}</li>
          ))}
        </ul>

        {/* header strip */}
        <div className="relative flex min-h-[2.75rem] items-center justify-between gap-3 border-b border-ember/25 bg-ember/[0.06] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em]">
          {playing ? (
            <>
              <span className="flex min-w-0 items-center gap-2 text-ember" aria-live="polite">
                <Crosshair className="h-3.5 w-3.5 shrink-0 animate-pulse" />
                <span className="hidden sm:inline">Acquire</span>
                <span className="chamfer-sm flex h-5 w-5 shrink-0 items-center justify-center bg-white p-0.5">
                  <img src={target.img} alt="" className="h-full w-full object-contain" />
                </span>
                <span className="truncate text-xs font-semibold normal-case tracking-[0.06em] text-cream">
                  {target.name}
                </span>
              </span>
              <span className="relative flex shrink-0 items-center gap-3 text-peach/80">
                <span>
                  <span className="text-dim">pts </span>
                  <span className="text-cream">{String(score).padStart(3, "0")}</span>
                </span>
                {combo > 1 ? <span className="text-ember">×{combo}</span> : null}
                <span className={cn("tabular-nums", timeLeft < 5000 ? "text-red-400" : "text-cream")}>
                  {secs}s
                </span>
                <button
                  type="button"
                  onClick={() => setPhase("idle")}
                  aria-label="Quit game"
                  className="text-dim transition hover:text-cream"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <AnimatePresence>
                  {pop ? (
                    <motion.span
                      key={pop.id}
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.7 }}
                      className={cn(
                        "pointer-events-none absolute -top-1 left-6 font-semibold",
                        pop.ok ? "text-ember" : "text-red-400",
                      )}
                    >
                      {pop.text}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </span>
              {/* time bar */}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px bg-ember shadow-[0_0_8px_rgba(250,118,54,1)] transition-[width] duration-100 ease-linear"
                style={{ width: `${(timeLeft / ROUND_MS) * 100}%` }}
              />
            </>
          ) : (
            <>
              <span className="text-ember">▸ Module bay</span>
              <span className="flex items-center gap-3 text-peach/80">
                <span className="hidden items-center gap-2 sm:flex">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember shadow-[0_0_8px_rgba(250,118,54,1)]" />
                  {frameworks.length} units linked
                </span>
                <button
                  type="button"
                  onClick={start}
                  className="chamfer-sm inline-flex items-center gap-1.5 bg-ember px-2.5 py-1 font-semibold text-ink transition hover:brightness-110"
                >
                  <Crosshair className="h-3 w-3" />
                  Target lock
                </button>
              </span>
            </>
          )}
        </div>

        {/* feed rails */}
        <div className="relative space-y-1 py-4">
          <div aria-hidden className="hud-grid absolute inset-0 opacity-60" />
          <div aria-hidden className="scanlines pointer-events-none absolute inset-0" />
          <Rail
            items={rails[0]}
            speed={speed}
            paused={phase === "idle" && hovering}
            renderTile={renderTile}
          />
          <div
            aria-hidden
            className="mx-4 h-2 bg-[repeating-linear-gradient(90deg,rgb(250_118_54/0.45)_0_1px,transparent_1px_10px)] opacity-60 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]"
          />
          <Rail
            items={rails[1]}
            reverse
            speed={speed * 1.12}
            paused={phase === "idle" && hovering}
            renderTile={renderTile}
          />
          {/* round results */}
          <AnimatePresence>
            {phase === "over" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-ink/85 px-4 backdrop-blur-[2px]"
                role="status"
              >
                <div className="text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
                    {newBest ? "▲ New record ▲" : "Round complete"}
                  </p>
                  <p className="mt-1 font-display text-3xl text-cream">
                    {score} <span className="text-gold-gradient">pts</span>
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-sand">
                    Rank {rank} · {hits} locks · {accuracy}% acc · best {best}
                  </p>
                  <div className="mt-3 flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={start}
                      className="chamfer-sm inline-flex items-center gap-1.5 bg-ember px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:brightness-110"
                    >
                      <RotateCcw className="h-3 w-3" /> Retry
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhase("idle")}
                      className="chamfer-sm bg-ember/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-peach transition hover:text-cream"
                    >
                      Exit
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* footer readout */}
        <div
          aria-hidden
          className="flex items-center justify-between gap-3 border-t border-ember/25 px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-dim"
        >
          {playing ? (
            <>
              <span>Tap the target as it passes</span>
              <span className="hidden sm:inline">miss −2s · speed lv {level + 1}</span>
              <span className="sm:hidden">lv {level + 1}</span>
            </>
          ) : (
            <>
              <span>feed α ▸▸</span>
              <span className="hidden sm:inline">{best ? `Σ best lock score ${best}` : "Σ stack integrity 100%"}</span>
              <span>◂◂ feed β</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
