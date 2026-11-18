import { Typewriter } from "react-simple-typewriter";
import { ArrowDown, ArrowRight, FileText, Mail } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site, socialLinks } from "./data/site";
import { buttonStyles, HudCorners } from "./ui/section";
import MechaHalo from "./ui/mecha-halo";
import { useHeroInView } from "@/hooks/useHeroInView";
import { playMechaSpin } from "@/lib/mecha-sfx";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import TeleportHalo from "./hero/TeleportHalo";

const rotatingTexts = ["web apps.", "mobile apps.", "AI tools.", "useful software."];

function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  // Desktop: the halo roams the hero. Mobile / reduced motion: it stays a fixed accent.
  const roam = useMediaQuery("(min-width: 1024px)") && !reduce;
  const [charged, setCharged] = useState(false);
  const [surge, setSurge] = useState(0);
  // When the hero scrolls away, the halo "teleports" to the floating ΑΘΗΝΑ dock.
  const away = !useHeroInView();
  const chargeTimer = useRef<number | undefined>(undefined);

  // Halo tilts toward the pointer (desktop only).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-1, 1], [-18, 18]), { stiffness: 120, damping: 14 });
  const rotateX = useSpring(useTransform(py, [-1, 1], [14, -14]), { stiffness: 120, damping: 14 });

  useEffect(() => () => window.clearTimeout(chargeTimer.current), []);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const overclock = () => {
    playMechaSpin(2.6);
    setSurge((n) => n + 1);
    setCharged(true);
    window.clearTimeout(chargeTimer.current);
    chargeTimer.current = window.setTimeout(() => setCharged(false), 2600);
  };
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
        };

  return (
    <section
      ref={sectionRef}
      id="home-section"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background art, tinted ember */}
      <img
        src="/images/hero.png"
        alt=""
        aria-hidden
        className="absolute inset-0 -z-30 h-full w-full object-cover opacity-45 grayscale"
      />
      <div aria-hidden className="absolute inset-0 -z-20 bg-ember/35 mix-blend-color" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_75%_45%,rgba(250,118,54,0.22),transparent_70%),linear-gradient(90deg,rgba(11,7,5,0.95)_0%,rgba(11,7,5,0.75)_45%,rgba(11,7,5,0.35)_100%),linear-gradient(to_bottom,transparent_60%,#0b0705)]"
      />
      <div aria-hidden className="scanlines absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 animate-scan bg-gradient-to-b from-transparent via-ember/10 to-transparent" />

      {/* HUD readouts */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-20 hidden md:block">
        <div className="mx-auto flex max-w-6xl justify-between px-8 font-mono text-[10px] tracking-[0.25em] text-ember/80">
          <span>SYS://PORTFOLIO v3.0</span>
          <span>33.42°N · 111.94°W · TEMPE</span>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div ref={textRef} className="relative">
          <motion.p
            {...rise(0)}
            data-obstacle="box"
            className="chamfer-sm inline-flex items-center gap-2.5 bg-ember/12 px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-peach"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            Online
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            data-obstacle="text"
            className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-wide text-cream sm:text-7xl lg:text-8xl"
          >
            Hieu <span className="glow-ember text-gold-gradient">Than</span>
          </motion.h1>

          <motion.div {...rise(0.12)} data-obstacle="children" className="mt-5 flex items-center gap-3" aria-hidden>
            <span className="h-px w-12 bg-ember" />
            <span className="font-mono text-[10px] tracking-[0.22em] text-ember sm:text-[11px] sm:tracking-[0.3em]">
              ENGINEER · BUILDER · ΑΡΙΣΤΕΙΑ
            </span>
          </motion.div>

          <motion.p
            {...rise(0.16)}
            data-obstacle="box"
            className="mt-6 text-xl font-medium text-cream sm:text-2xl md:text-3xl"
          >
            I build{" "}
            <span className="text-ember">
              <Typewriter
                words={rotatingTexts}
                loop
                cursor
                cursorStyle="▌"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1800}
              />
            </span>
          </motion.p>

          <motion.div {...rise(0.24)} data-obstacle="children" className="mt-9 flex flex-wrap items-center gap-3">
            <ScrollLink
              to="project-section"
              href="#project-section"
              smooth
              duration={600}
              offset={-64}
              className={`${buttonStyles.primary} cursor-pointer`}
            >
              See my work
              <ArrowRight className="h-4 w-4" />
            </ScrollLink>
            <a href={site.resumeUrl} target="_blank" rel="noreferrer" className={buttonStyles.secondary}>
              <FileText className="h-4 w-4" />
              Résumé
            </a>

            <span className="mx-1 hidden h-6 w-px bg-ember/30 sm:block" aria-hidden />

            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={buttonStyles.icon}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <a href={`mailto:${site.email}`} aria-label="Email" className={buttonStyles.icon}>
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {roam ? (
          /* Home slot: the roaming halo parks here and measures its size from it */
          <div ref={homeRef} aria-hidden className="pointer-events-none">
            <div className="aspect-square w-full" />
            <div className="h-7" />
          </div>
        ) : (
          /* Mecha halo: background accent on mobile, its own column on desktop */
        <div className="pointer-events-none absolute -right-40 top-20 -z-10 w-[24rem] opacity-[0.18] [perspective:900px] sm:-right-24 sm:opacity-25 lg:pointer-events-auto lg:relative lg:inset-auto lg:z-auto lg:w-full lg:opacity-100">
          {/* teleport beam when ΑΘΗΝΑ returns */}
          {!reduce ? (
            <motion.span
              aria-hidden
              initial={false}
              animate={away ? { scaleY: 0, opacity: 0 } : { scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, delay: away ? 0 : 0.3, ease: "easeInOut" }}
              className="pointer-events-none absolute bottom-1/2 left-1/2 z-10 -ml-[3px] hidden h-[120vh] w-1.5 origin-bottom bg-gradient-to-t from-peach via-ember to-transparent shadow-[0_0_30px_8px_rgba(250,118,54,0.6)] lg:block"
            />
          ) : null}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={
              away && !reduce
                ? { opacity: 0, scaleX: 1.3, scaleY: 0.02, scale: 1, filter: "brightness(3)" }
                : {
                    opacity: 1,
                    scale: charged ? 1.04 : 1,
                    scaleX: 1,
                    scaleY: 1,
                    filter: "brightness(1)",
                  }
            }
            transition={
              away
                ? { duration: 0.45, ease: "easeIn" }
                : { duration: charged ? 0.25 : 0.9, ease: [0.22, 1, 0.36, 1], delay: charged ? 0 : 0.35 }
            }
            style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative p-4"
          >
            <HudCorners size="h-5 w-5" className="hidden lg:block" />
            <button
              type="button"
              onClick={overclock}
              tabIndex={-1}
              aria-hidden
              className="group block w-full cursor-pointer rounded-full focus:outline-none"
              title="Click to overclock"
            >
              <MechaHalo className="w-full transition-[filter] duration-300 group-hover:drop-shadow-[0_0_30px_rgba(250,118,54,0.45)]" charged={charged} surge={surge} />
            </button>
            <p className="mt-1 hidden text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ember/60 lg:block">
              {charged ? "⚡ Power surge" : "▸ Click the core"}
            </p>
          </motion.div>
        </div>
        )}
      </div>

      {roam ? (
        <TeleportHalo
          sectionRef={sectionRef}
          textRef={textRef}
          homeRef={homeRef}
          away={away}
          charged={charged}
          surge={surge}
          onOverclock={overclock}
          rotateX={rotateX}
          rotateY={rotateY}
        />
      ) : null}

      <ScrollLink
        to="about-section"
        href="#about-section"
        smooth
        duration={600}
        offset={-64}
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ember/80 transition hover:text-peach sm:flex"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </ScrollLink>
    </section>
  );
}

export default Hero;
