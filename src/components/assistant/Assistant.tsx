import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight, Send, X } from "lucide-react";
import { scroller } from "react-scroll";
import MechaHalo from "../ui/mecha-halo";
import { HudCorners } from "../ui/section";
import { useHeroInView } from "@/hooks/useHeroInView";
import { answer, SUGGESTIONS } from "./brain";
import type { Action, Reply } from "./brain";

type Msg = { id: number; from: "user" | "bot"; text: string; actions?: Action[] };

/* ---------------------------------------------------------------- */
/* Teleport choreography                                             */
/* ---------------------------------------------------------------- */
const ease = [0.22, 1, 0.36, 1] as const;

const beam: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  shown: {
    scaleY: [0, 1, 1, 0],
    opacity: [0, 1, 1, 0],
    transition: { duration: 0.9, times: [0, 0.3, 0.65, 1], ease: "easeInOut" },
  },
  gone: { scaleY: [0, 1, 0], opacity: [0, 1, 0], transition: { duration: 0.6, ease: "easeInOut" } },
};

const body: Variants = {
  hidden: { opacity: 0, scaleX: 0.2, scaleY: 0.02, filter: "brightness(3)" },
  shown: {
    opacity: [0, 1, 0.35, 1, 0.7, 1],
    scaleX: [0.2, 1.35, 0.9, 1.04, 1],
    scaleY: [0.02, 0.06, 1.15, 0.97, 1],
    filter: ["brightness(3)", "brightness(2.2)", "brightness(1.4)", "brightness(1)"],
    transition: { duration: 0.75, delay: 0.25, ease },
  },
  gone: {
    opacity: [1, 0.6, 0],
    scaleX: [1, 1.35, 0.1],
    scaleY: [1, 0.05, 0.02],
    filter: ["brightness(1)", "brightness(3)", "brightness(3)"],
    transition: { duration: 0.45, ease: "easeIn" },
  },
};

const shock: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  shown: { scale: [0.5, 2.6], opacity: [0, 0.9, 0], transition: { duration: 0.8, delay: 0.5, ease: "easeOut" } },
  gone: { scale: [1, 2.2], opacity: [0.8, 0], transition: { duration: 0.45 } },
};

const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2;
  return { x: Math.cos(a) * 70, y: Math.sin(a) * 70, d: 0.12 + i * 0.025 };
});

const spark = (s: (typeof SPARKS)[number]): Variants => ({
  hidden: { x: s.x, y: s.y, opacity: 0 },
  shown: { x: [s.x, 0], y: [s.y, 0], opacity: [0, 1, 0], transition: { duration: 0.55, delay: s.d, ease: "easeIn" } },
  gone: { x: [0, s.x], y: [0, s.y], opacity: [1, 0], transition: { duration: 0.45, ease: "easeOut" } },
});

const root: Variants = {
  hidden: {},
  shown: {},
  gone: { opacity: 0, transition: { when: "afterChildren", duration: 0.05 } },
};

/* ---------------------------------------------------------------- */
/* Message bubbles                                                    */
/* ---------------------------------------------------------------- */
function BotMessage({
  msg,
  animate,
  onTick,
  onAction,
}: {
  msg: Msg;
  animate: boolean;
  onTick: () => void;
  onAction: (a: Action) => void;
}) {
  const [n, setN] = useState(animate ? 0 : msg.text.length);
  const done = n >= msg.text.length;

  useEffect(() => {
    if (done) return;
    const step = Math.max(1, Math.round(msg.text.length / 90));
    const id = window.setInterval(() => setN((v) => Math.min(msg.text.length, v + step)), 14);
    return () => window.clearInterval(id);
  }, [done, msg.text.length]);

  useEffect(onTick, [n, onTick]);

  return (
    <div className="max-w-[90%] self-start">
      <div className="chamfer-sm bg-ember/10 px-3.5 py-2.5 text-sm leading-6 whitespace-pre-line text-cream">
        {msg.text.slice(0, n)}
        {!done ? <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-ember align-middle" /> : null}
      </div>
      {done && msg.actions?.length ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex flex-wrap gap-1.5"
        >
          {msg.actions.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => onAction(a)}
              className="chamfer-sm inline-flex items-center gap-1 bg-ink px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-peach ring-1 ring-ember/40 transition ring-inset hover:bg-ember hover:text-ink"
            >
              {a.label}
              {a.kind === "link" ? <ArrowUpRight className="h-3 w-3" /> : null}
            </button>
          ))}
        </motion.div>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Assistant                                                          */
/* ---------------------------------------------------------------- */
export default function Assistant() {
  const reduce = useReducedMotion();
  const heroInView = useHeroInView();
  const away = !heroInView;

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const [seen, setSeen] = useState(false);
  const idRef = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const lastAnimated = useRef(-1);

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const pushBot = useCallback((r: Reply) => {
    const id = idRef.current++;
    lastAnimated.current = id;
    setMsgs((m) => [...m, { id, from: "bot", text: r.text, actions: r.actions }]);
  }, []);

  const ask = useCallback(
    (q: string) => {
      const text = q.trim();
      if (!text) return;
      setMsgs((m) => [...m, { id: idRef.current++, from: "user", text }]);
      setThinking(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => {
          setThinking(false);
          pushBot(answer(text));
        },
        reduce ? 0 : 450 + Math.random() * 350,
      );
    },
    [pushBot, reduce],
  );

  // Greet on first open.
  useEffect(() => {
    if (open && msgs.length === 0) {
      pushBot({
        text: "Systems online. I'm ΑΘΗΝΑ, Hieu's onboard assistant. Ask me about his projects, experience, skills, or how to reach him.",
      });
    }
    if (open) {
      setSeen(true);
      // Only auto-focus with a mouse/trackpad, so phones don't pop the keyboard over the panel.
      if (window.matchMedia("(pointer: fine)").matches) {
        window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
      }
    }
  }, [open, msgs.length, pushBot]);

  // Returning to the hero teleports ΑΘΗΝΑ home and closes the panel.
  useEffect(() => {
    if (!away) setOpen(false);
  }, [away]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(scrollToEnd, [msgs, thinking, scrollToEnd]);

  const onAction = (a: Action) => {
    switch (a.kind) {
      case "link":
        window.open(a.href, a.href.startsWith("mailto:") ? "_self" : "_blank", "noopener,noreferrer");
        break;
      case "scroll":
        scroller.scrollTo(a.to, { smooth: true, duration: 700, offset: -64 });
        if (a.to === "home-section") setOpen(false);
        break;
      case "project":
        window.dispatchEvent(new CustomEvent("open-project", { detail: a.title }));
        setOpen(false);
        break;
      case "ask":
        ask(a.prompt);
        break;
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
    setInput("");
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {away && open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="ΑΘΗΝΑ assistant"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96, clipPath: "inset(100% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97, clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.35, ease }}
            className="fixed bottom-28 right-3 z-50 flex h-[min(34rem,calc(100svh-11rem))] w-[calc(100vw-1.5rem)] origin-bottom-right flex-col sm:bottom-[9.5rem] sm:right-6 sm:w-[24rem]"
          >
            <div className="chamfer flex h-full flex-col bg-ember/40 p-px drop-shadow-[0_0_40px_rgba(250,118,54,0.25)]">
              <div className="chamfer relative flex h-full flex-col overflow-hidden bg-ink">
                <div aria-hidden className="scanlines pointer-events-none absolute inset-0" />
                <div aria-hidden className="hud-grid pointer-events-none absolute inset-0 opacity-60" />

                {/* header */}
                <div className="relative flex items-center gap-3 border-b border-ember/30 bg-ember/10 px-4 py-3">
                  <MechaHalo compact className="h-9 w-9 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold tracking-[0.18em] text-cream">ΑΘΗΝΑ</p>
                    <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
                      AI assistant · online
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close assistant"
                    className="chamfer-sm flex h-8 w-8 items-center justify-center bg-ember/10 text-peach transition hover:bg-ember hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* messages */}
                <div
                  ref={listRef}
                  role="log"
                  aria-live="polite"
                  className="relative flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
                >
                  {msgs.map((m) =>
                    m.from === "user" ? (
                      <div
                        key={m.id}
                        className="chamfer-sm max-w-[85%] self-end bg-gold-gradient px-3.5 py-2 text-sm font-medium text-ink"
                      >
                        {m.text}
                      </div>
                    ) : (
                      <BotMessage
                        key={m.id}
                        msg={m}
                        animate={!reduce && m.id === lastAnimated.current}
                        onTick={scrollToEnd}
                        onAction={onAction}
                      />
                    ),
                  )}
                  {thinking ? (
                    <div className="flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                      <span className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="h-1.5 w-1.5 animate-bounce bg-ember"
                            style={{ animationDelay: `${i * 120}ms` }}
                          />
                        ))}
                      </span>
                      Processing
                    </div>
                  ) : null}
                </div>

                {/* suggestions */}
                {msgs.length <= 1 ? (
                  <div className="relative flex gap-1.5 overflow-x-auto px-4 pb-3">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => ask(s)}
                        className="chamfer-sm shrink-0 bg-ember/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] whitespace-nowrap text-peach transition hover:bg-ember hover:text-ink"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : null}

                {/* input */}
                <form onSubmit={submit} className="relative flex items-center gap-2 border-t border-ember/30 bg-surface/80 p-3">
                  <label htmlFor="athena-input" className="sr-only">
                    Ask ΑΘΗΝΑ a question
                  </label>
                  <input
                    id="athena-input"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Hieu…"
                    autoComplete="off"
                    className="chamfer-sm min-w-0 flex-1 bg-ink/80 px-3 py-2.5 font-mono text-sm text-cream outline-none placeholder:text-dim focus:bg-ember/[0.06]"
                  />
                  <button
                    type="submit"
                    aria-label="Send"
                    disabled={!input.trim()}
                    className="chamfer-sm flex h-10 w-10 shrink-0 items-center justify-center bg-gold-gradient text-ink transition hover:brightness-110 disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
            <HudCorners size="h-3 w-3" className="-m-1.5" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Docked ΑΘΗΝΑ (teleports in when the hero scrolls away) */}
      <AnimatePresence>
        {away ? (
          <motion.div
            key="dock"
            variants={reduce ? undefined : root}
            initial={reduce ? { opacity: 0 } : "hidden"}
            animate={reduce ? { opacity: 1 } : "shown"}
            exit={reduce ? { opacity: 0 } : "gone"}
            className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
          >
            <div className="relative h-20 w-20 sm:h-28 sm:w-28">
              {!reduce ? (
                <>
                  <motion.span
                    variants={beam}
                    aria-hidden
                    className="pointer-events-none absolute bottom-1/2 left-1/2 -ml-[3px] h-[100vh] w-1.5 origin-bottom bg-gradient-to-t from-peach via-ember to-transparent shadow-[0_0_24px_6px_rgba(250,118,54,0.6)]"
                  />
                  <motion.span
                    variants={shock}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full border-2 border-peach"
                  />
                  {SPARKS.map((s, i) => (
                    <motion.span
                      key={i}
                      variants={spark(s)}
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-1/2 -ml-1 -mt-1 h-2 w-2 rotate-45 bg-peach shadow-[0_0_8px_rgba(255,180,138,1)]"
                    />
                  ))}
                </>
              ) : null}

              <motion.button
                type="button"
                variants={reduce ? undefined : body}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close ΑΘΗΝΑ assistant" : "Open ΑΘΗΝΑ assistant"}
                aria-expanded={open}
                className="group relative block h-full w-full rounded-full focus-visible:outline-2"
              >
                <motion.span
                  className="block h-full w-full"
                  animate={reduce ? undefined : { y: [0, -4, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MechaHalo
                    compact
                    charged={open}
                    className="h-full w-full drop-shadow-[0_0_16px_rgba(250,118,54,0.55)] transition-[filter] group-hover:drop-shadow-[0_0_26px_rgba(250,118,54,0.9)]"
                  />
                </motion.span>
                {!seen ? (
                  <span className="absolute right-0 top-0 flex h-3.5 w-3.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-ink bg-ember" />
                  </span>
                ) : null}
              </motion.button>

              {!open ? (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 1.1 } }}
                  exit={{ opacity: 0 }}
                  className="chamfer-sm pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 bg-ink/90 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.18em] whitespace-nowrap text-peach ring-1 ring-ember/40 ring-inset sm:block"
                >
                  ASK ΑΘΗΝΑ ▸
                </motion.span>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
