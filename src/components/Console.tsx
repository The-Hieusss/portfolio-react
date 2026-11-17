import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import FadeInEffect from "./ui/fadein";
import { HudCorners, Panel, Section, SectionHeader } from "./ui/section";
import { projectsData } from "./data/projectsData";
import { site, socialLinks } from "./data/site";

type Line = { id: number; kind: "in" | "out" | "err" | "sys"; body: ReactNode };

const PROMPT = "hieu@olympus:~$";

const projects = projectsData.filter((p) => p.githubUrl || p.demoUrl);

const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "Java", "C#", "C++", "C", "SQL", "Ruby", "MATLAB"],
  frameworks: ["React", "React Native", "Node.js", "Express", "Tailwind", "Three.js", "Supabase", "PostgreSQL", "Firebase"],
  ai: ["Gemini", "OpenAI", "FastAPI"],
};

const oracles = [
  "Know thyself.",
  "Nothing in excess.",
  "Ship it, then make it beautiful.",
  "The unexamined code is not worth deploying.",
  "Fortune favors the bold commit.",
  "Measure twice, refactor once.",
  "Even Achilles had one unhandled exception.",
  "Every labor of Heracles began with a single PR.",
];

const QUICK = ["help", "whoami", "projects", "skills", "oracle", "roll", "contact"];

const COMMANDS: Record<string, string> = {
  help: "list available commands",
  whoami: "who is running this machine",
  projects: "list projects  ·  open <n> to launch one",
  open: "open <n|name> — launch a project demo or repo",
  skills: "loadout: languages, frameworks, AI",
  resume: "open the PDF résumé",
  contact: "ways to reach me",
  socials: "GitHub, LinkedIn, Instagram",
  oracle: "consult the Oracle of Delphi",
  roll: "roll a d20 (try: roll 3d6)",
  date: "current system time",
  echo: "echo <text>",
  clear: "wipe the screen",
};

const Hl = ({ children }: { children: ReactNode }) => <span className="text-peach">{children}</span>;
const Dim = ({ children }: { children: ReactNode }) => <span className="text-dim">{children}</span>;
const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel="noopener noreferrer"
    className="text-ember underline decoration-ember/40 underline-offset-2 hover:text-cream"
  >
    {children}
  </a>
);

function findProject(arg: string) {
  const n = Number(arg);
  if (Number.isInteger(n) && n >= 1 && n <= projects.length) return projects[n - 1];
  const q = arg.toLowerCase();
  return projects.find((p) => p.title.toLowerCase().includes(q));
}

function rollDice(spec: string): ReactNode {
  const m = /^(\d{0,2})d(\d{1,3})$/i.exec(spec || "d20");
  if (!m) return <span className="text-red-400">usage: roll [NdM], e.g. roll 2d6</span>;
  const count = Math.min(Math.max(Number(m[1] || 1), 1), 12);
  const sides = Math.min(Math.max(Number(m[2]), 2), 100);
  const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * sides));
  const total = rolls.reduce((a, b) => a + b, 0);
  const crit = count === 1 && sides === 20 && total === 20;
  const fumble = count === 1 && sides === 20 && total === 1;
  return (
    <>
      🎲 {count}d{sides} → [{rolls.join(", ")}] = <Hl>{total}</Hl>
      {crit ? <span className="text-ember"> · CRITICAL! The gods smile upon you.</span> : null}
      {fumble ? <span className="text-red-400"> · Critical fail. Zeus is displeased.</span> : null}
    </>
  );
}

export default function Console() {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [booted, setBooted] = useState(false);
  const idRef = useRef(0);
  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const push = useCallback((kind: Line["kind"], body: ReactNode) => {
    setLines((prev) => [...prev, { id: idRef.current++, kind, body }]);
  }, []);

  // Boot sequence, played once when the console scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const boot: [Line["kind"], ReactNode][] = [
      ["sys", "ΑΘΗΝΑ-OS v3.0 · kernel olympus-6.11 · tty1"],
      ["sys", "[ ok ] mounting /dev/aegis … shield online"],
      ["sys", "[ ok ] calibrating bronze servos … 100%"],
      ["sys", "[ ok ] linking oracle uplink → Delphi"],
      ["out", <>Welcome, traveler. Type <Hl>help</Hl> or tap a command below.</>],
    ];
    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduce) {
          boot.forEach(([k, b]) => push(k, b));
          setBooted(true);
          return;
        }
        timers = boot.map(([k, b], i) =>
          window.setTimeout(() => {
            push(k, b);
            if (i === boot.length - 1) setBooted(true);
          }, 260 * (i + 1)),
        );
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [push, reduce]);

  // Keep the newest line visible (scrolls the terminal, never the page).
  useEffect(() => {
    const out = outRef.current;
    if (out) out.scrollTop = out.scrollHeight;
  }, [lines]);

  const run = useCallback(
    (raw: string) => {
      const text = raw.trim();
      push("in", text);
      if (!text) return;
      setHistory((h) => [...h.filter((x) => x !== text), text].slice(-50));
      setHistIdx(null);

      const [cmd, ...rest] = text.split(/\s+/);
      const arg = rest.join(" ");

      switch (cmd.toLowerCase()) {
        case "help":
        case "?":
          push(
            "out",
            <div className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[7rem_1fr]">
              {Object.entries(COMMANDS).map(([c, d]) => (
                <div key={c} className="contents">
                  <Hl>{c}</Hl>
                  <Dim>{d}</Dim>
                </div>
              ))}
            </div>,
          );
          break;
        case "whoami":
          push(
            "out",
            <>
              <Hl>Hieu Than</Hl> — software engineer · CS (Software Engineering) @ ASU.
              <br />
              Builds web, mobile and AI products. Currently interning at Rocket. Based in {site.location}.
            </>,
          );
          break;
        case "ls":
        case "projects":
          push(
            "out",
            <div className="space-y-0.5">
              {projects.map((p, i) => (
                <div key={p.title}>
                  <Dim>[{i + 1}]</Dim> <Hl>{p.title}</Hl> <Dim>— {p.tech.map((t) => t.label).slice(0, 3).join(", ")}</Dim>
                  {p.demoUrl ? <span className="text-ember"> ● live</span> : null}
                </div>
              ))}
              <div className="pt-1">
                <Dim>tip:</Dim> open 1
              </div>
            </div>,
          );
          break;
        case "open":
        case "cd": {
          if (!arg) {
            push("err", "usage: open <n|name>  (see: projects)");
            break;
          }
          const p = findProject(arg);
          if (!p) {
            push("err", `open: no project matches "${arg}"`);
            break;
          }
          const url = p.demoUrl || p.githubUrl!;
          window.open(url, "_blank", "noopener,noreferrer");
          push("out", <>Launching <Hl>{p.title}</Hl> → <A href={url}>{url}</A></>);
          break;
        }
        case "skills":
          push(
            "out",
            <div className="space-y-0.5">
              <div><Dim>languages ▸</Dim> {skills.languages.join(" · ")}</div>
              <div><Dim>frameworks ▸</Dim> {skills.frameworks.join(" · ")}</div>
              <div><Dim>ai ▸</Dim> {skills.ai.join(" · ")}</div>
            </div>,
          );
          break;
        case "resume":
        case "cv":
          window.open(site.resumeUrl, "_blank", "noopener,noreferrer");
          push("out", <>Opening résumé → <A href={site.resumeUrl}>Resume.pdf</A></>);
          break;
        case "contact":
        case "email":
          push(
            "out",
            <>
              email ▸ <A href={`mailto:${site.email}`}>{site.email}</A>
              <br />
              phone ▸ {site.phone}
            </>,
          );
          break;
        case "socials":
          push(
            "out",
            <div className="space-y-0.5">
              {socialLinks.map((s) => (
                <div key={s.label}>
                  <Dim>{s.label.toLowerCase()} ▸</Dim> <A href={s.href}>{s.href.replace(/^https:\/\/(www\.)?/, "")}</A>
                </div>
              ))}
            </div>,
          );
          break;
        case "oracle":
          push("out", <>🏛 The Oracle speaks: “<Hl>{oracles[Math.floor(Math.random() * oracles.length)]}</Hl>”</>);
          break;
        case "roll":
          push("out", rollDice(arg));
          break;
        case "date":
          push("out", new Date().toString());
          break;
        case "echo":
          push("out", arg || " ");
          break;
        case "sudo":
          push("err", "Permission denied. Only Zeus has root on Olympus.");
          break;
        case "rm":
          push("err", "Nice try. The Fates do not allow deletion.");
          break;
        case "hello":
        case "hi":
          push("out", "Χαίρε! (Greetings!) Type help to see what I can do.");
          break;
        case "clear":
        case "cls":
          setLines([]);
          break;
        default:
          push("err", `command not found: ${cmd}. Type help.`);
      }
    },
    [push],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const i = histIdx + 1;
      if (i >= history.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(input.trim().toLowerCase()));
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) push("out", <Dim>{matches.join("   ")}</Dim>);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <Section id="console-section" labelledBy="console-heading">
      <FadeInEffect>
        <SectionHeader
          id="console-heading"
          eyebrow="Console"
          title={
            <>
              Deus Ex <span className="text-gold-gradient">Machina</span>
            </>
          }
        />
      </FadeInEffect>

      <FadeInEffect>
        <div ref={rootRef} className="relative p-2">
          <HudCorners size="h-5 w-5" />
          <Panel className="drop-shadow-[0_0_40px_rgba(250,118,54,0.15)]" innerClassName="relative overflow-hidden bg-ink/95">
            {/* title bar */}
            <div className="flex items-center justify-between border-b border-ember/30 bg-ember/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-peach">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 bg-ember shadow-[0_0_8px_rgba(250,118,54,1)]" />
                ΑΘΗΝΑ-OS · tty1
              </span>
              <span className="hidden text-ember/70 sm:inline">↑↓ history · tab complete · ctrl+L clear</span>
            </div>

            {/* screen */}
            <div
              className="relative cursor-text"
              onClick={() => {
                if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
              }}
            >
              <div aria-hidden className="scanlines pointer-events-none absolute inset-0 z-10" />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(250,118,54,0.08),transparent)]" />

              <div
                ref={outRef}
                role="log"
                aria-live="polite"
                aria-label="Console output"
                className="relative h-[22rem] overflow-y-auto px-4 py-4 font-mono text-[13px] leading-6 text-cream sm:h-[26rem] sm:px-5"
              >
                {lines.map((l) => (
                  <div key={l.id} className="whitespace-pre-wrap break-words">
                    {l.kind === "in" ? (
                      <>
                        <span className="text-ember">{PROMPT}</span> {l.body}
                      </>
                    ) : l.kind === "err" ? (
                      <span className="text-red-400">{l.body}</span>
                    ) : l.kind === "sys" ? (
                      <span className="text-sand/70">{l.body}</span>
                    ) : (
                      <div className="text-sand">{l.body}</div>
                    )}
                  </div>
                ))}

                {booted ? (
                  <label className="flex items-center gap-2">
                    <span className="shrink-0 text-ember">{PROMPT}</span>
                    <span className="sr-only">Command</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      enterKeyHint="send"
                      className="min-w-0 flex-1 bg-transparent text-cream caret-ember outline-none"
                    />
                  </label>
                ) : (
                  <span className="inline-block h-4 w-2 animate-pulse bg-ember align-middle" />
                )}
              </div>
            </div>

            {/* quick commands */}
            <div className="flex flex-wrap gap-1.5 border-t border-ember/30 bg-surface/80 px-3 py-3 sm:px-4">
              {QUICK.map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={!booted}
                  onClick={() => run(c)}
                  className="chamfer-sm bg-ember/10 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-peach transition hover:bg-ember hover:text-ink disabled:opacity-40"
                >
                  {c}
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </FadeInEffect>
    </Section>
  );
}
