import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import FadeInEffect from "./ui/fadein";
import { HudCorners, Panel, Section, SectionHeader } from "./ui/section";

/** Portrait framed as a pilot ID scan: tilts toward the pointer, with a sweeping scan beam. */
function PilotScan() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 140, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 16 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-sm [perspective:1000px] lg:max-w-none" onPointerMove={onMove} onPointerLeave={reset}>
      {/* orbit ring behind the card */}
      <div aria-hidden className="pointer-events-none absolute -inset-6 flex items-center justify-center">
        <div className="aspect-square w-[115%] animate-spin-slow rounded-full border border-dashed border-ember/25" />
        <div className="absolute aspect-square w-[95%] animate-spin-rev rounded-full border-2 border-transparent border-l-ember/40 border-t-ember/40" />
        <div className="absolute aspect-square w-[80%] rounded-full bg-[radial-gradient(circle,rgba(250,118,54,0.18),transparent_65%)]" />
      </div>

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative p-3 [transform-style:preserve-3d]">
        <HudCorners size="h-6 w-6" />
        {/* offset armor plate */}
        <div aria-hidden className="chamfer absolute inset-3 translate-x-3 translate-y-3 bg-ember/15" />

        <Panel className="relative" innerClassName="relative overflow-hidden">
          <img
            src="/images/profile1.jpg"
            alt="Portrait of Hieu Than"
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
          <div aria-hidden className="scanlines absolute inset-0" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ember/35 via-transparent to-transparent mix-blend-soft-light" />

          {/* scan beam */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 h-16 animate-portrait-scan bg-[linear-gradient(180deg,transparent,rgba(250,118,54,0.22),transparent)]">
            <div className="absolute inset-x-0 top-1/2 h-px bg-ember/80 shadow-[0_0_10px_rgba(250,118,54,1)]" />
          </div>

          {/* target reticle */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-[39%] h-24 w-24 -translate-x-1/2 -translate-y-1/2">
            <HudCorners size="h-3 w-3" className="border-peach/80" />
            <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-peach/70" />
            <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-peach/70" />
            <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-peach/70" />
            <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-peach/70" />
            <span className="absolute -right-1 top-0 translate-x-full font-mono text-[9px] uppercase tracking-[0.2em] text-peach/90">
              Match 99.7%
            </span>
          </div>

          {/* top readout */}
          <div aria-hidden className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-ink/80 to-transparent px-4 pb-8 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-peach/90">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]" />
              Rec
            </span>
            <span>33.42°N · 111.94°W</span>
          </div>

          {/* bottom ID bar */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent px-4 pb-3 pt-12">
            <div className="flex items-end justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-peach">
              <div>
                <p className="text-dim">Pilot</p>
                <p className="mt-0.5 font-display text-base normal-case tracking-[0.12em] text-cream">Hieu Than</p>
              </div>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_8px_rgba(250,118,54,1)]" />
                Verified
              </span>
            </div>
            <div
              aria-hidden
              className="mt-2 h-3 w-full opacity-70 [background:repeating-linear-gradient(90deg,#fa7636_0_2px,transparent_2px_4px,#fa7636_4px_5px,transparent_5px_9px,#fa7636_9px_12px,transparent_12px_14px)]"
            />
          </div>
        </Panel>

        {/* vertical tag */}
        <p
          aria-hidden
          className="absolute -right-3 top-1/2 hidden origin-center -translate-y-1/2 translate-x-full font-mono text-[10px] uppercase tracking-[0.35em] whitespace-nowrap text-ember/70 [writing-mode:vertical-rl] sm:block"
        >
          Unit H.THAN-01 // Pilot profile
        </p>
      </motion.div>
    </div>
  );
}

function About() {
  return (
    <Section id="about-section" labelledBy="about-heading" className="overflow-hidden">
      {/* oversized monogram */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[16rem] font-bold leading-none text-transparent opacity-[0.07] [-webkit-text-stroke:2px_#fa7636] md:text-[24rem]"
      >
        ΗΘ
      </span>

      <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <FadeInEffect className="px-4 sm:px-6 lg:px-0">
          <PilotScan />
        </FadeInEffect>

        <FadeInEffect delay={0.1}>
          <SectionHeader
            id="about-heading"
            eyebrow="About"
            title={
              <>
                I build thoughtful software with a{" "}
                <span className="text-gold-gradient">practical eye for design.</span>
              </>
            }
            className="!mb-8"
          />

          {/* dossier */}
          <Panel innerClassName="relative">
            <div className="flex items-center justify-between border-b border-ember/25 bg-ember/[0.06] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="text-ember">▸ File · about.sys</span>
              <span className="flex items-center gap-1.5 text-dim">
                <span className="h-1.5 w-1.5 bg-ember/80" />
                <span className="h-1.5 w-1.5 bg-ember/50" />
                <span className="h-1.5 w-1.5 bg-ember/25" />
              </span>
            </div>

            <div className="relative px-5 py-6 sm:px-7 sm:py-7">
              <div aria-hidden className="hud-grid absolute inset-0 opacity-40" />
              <div className="relative space-y-5 border-l border-ember/30 pl-5 sm:pl-6">
                <p className="relative text-lg leading-8 text-cream md:text-xl md:leading-9">
                  <span aria-hidden className="absolute -left-[1.6rem] top-3 h-2 w-2 rotate-45 bg-ember shadow-[0_0_10px_rgba(250,118,54,0.9)] sm:-left-[1.85rem]" />
                  I&apos;m Hieu, a software engineering student at Arizona State University focused on
                  building products that are clear, useful and reliable.
                </p>
                <p className="relative text-base leading-7 text-sand md:text-lg md:leading-8">
                  <span aria-hidden className="absolute -left-[1.55rem] top-3 h-1.5 w-1.5 rotate-45 border border-ember sm:-left-[1.8rem]" />
                  My work spans web, mobile and AI-oriented projects. I care about clean interfaces,
                  strong technical foundations, and making ideas feel polished in real use.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 border-t border-line px-5 py-3 sm:px-7">
              <span aria-hidden className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
                End of file<span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-ember" />
              </span>
            </div>
          </Panel>
        </FadeInEffect>
      </div>
    </Section>
  );
}

export default About;
