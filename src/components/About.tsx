import FadeInEffect from "./ui/fadein";
import { HudCorners, Panel, Section, SectionHeader } from "./ui/section";

function About() {
  return (
    <Section id="about-section" labelledBy="about-heading">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <FadeInEffect className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative p-3">
            <HudCorners size="h-6 w-6" />
            <Panel innerClassName="relative overflow-hidden">
              <img
                src="/images/profile1.jpg"
                alt="Portrait of Hieu Than"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              <div aria-hidden className="scanlines absolute inset-0" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ember/35 via-transparent to-transparent mix-blend-soft-light" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/90 to-transparent px-4 pb-3 pt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-peach">
                <span>ID · H.THAN</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_8px_rgba(250,118,54,1)]" />
                  Verified
                </span>
              </div>
            </Panel>
          </div>
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
            className="!mb-6"
          />
          <div className="space-y-4 text-base leading-7 text-sand md:text-lg md:leading-8">
            <p>
              I&apos;m Hieu, a software engineering student at Arizona State University focused on
              building products that are clear, useful and reliable.
            </p>
            <p>
              My work spans web, mobile and AI-oriented projects. I care about clean interfaces,
              strong technical foundations, and making ideas feel polished in real use.
            </p>
          </div>
        </FadeInEffect>
      </div>
    </Section>
  );
}

export default About;
