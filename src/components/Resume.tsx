import { ArrowUpRight, Award, Briefcase, Cpu, GraduationCap, Users, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import Carousel from "./Carousel";
import FadeInEffect from "./ui/fadein";
import { buttonStyles, GreekDivider, Panel, Section, SectionHeader } from "./ui/section";
import { site } from "./data/site";
import { awards, education, experience, languages, leadership } from "./data/profile";

type Entry = {
  logo: string;
  title: string;
  subtitle: string;
  date: string;
  meta?: string;
  current?: boolean;
};

function Group({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-peach">
        <span className="chamfer-sm flex h-8 w-8 items-center justify-center bg-ember text-ink">
          {icon}
        </span>
        {title}
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-ember/50 to-transparent" />
      </h3>
      {children}
    </div>
  );
}

function Timeline({ items }: { items: Entry[] }) {
  return (
    <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[1.6rem] before:top-6 before:w-0.5 before:bg-gradient-to-b before:from-ember before:via-ember/40 before:to-ember/5">
      {items.map((item) => (
        <li
          key={`${item.title}-${item.subtitle}-${item.date}`}
          className="chamfer-sm relative flex gap-4 p-2.5 transition hover:bg-ember/[0.07]"
        >
          <div className="chamfer-sm relative z-10 flex h-11 w-11 shrink-0 items-center justify-center bg-ember p-0.5">
            <div className="chamfer-sm flex h-full w-full items-center justify-center bg-white p-1">
              <img src={item.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
            </div>
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="font-semibold leading-snug text-cream">{item.title}</p>
              <p
                className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] ${
                  item.current ? "text-ember" : "text-dim"
                }`}
              >
                {item.current ? "● " : ""}
                {item.date}
              </p>
            </div>
            {item.subtitle ? <p className="mt-0.5 text-sm text-peach">{item.subtitle}</p> : null}
            {item.meta ? <p className="mt-0.5 text-sm text-dim">{item.meta}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Resume() {
  return (
    <>
      <GreekDivider label="RÉSUMÉ" />
      <Section id="resume-section" labelledBy="resume-heading">
        <FadeInEffect>
          <SectionHeader
            id="resume-heading"
            eyebrow="Résumé"
            title={
              <>
                Experience <span className="text-gold-gradient">&amp; education</span>
              </>
            }
            action={
              <a href={site.resumeUrl} target="_blank" rel="noreferrer" className={buttonStyles.secondary}>
                Full résumé (PDF)
                <ArrowUpRight className="h-4 w-4" />
              </a>
            }
          />
        </FadeInEffect>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInEffect>
            <div id="experience">
              <Group icon={<Briefcase className="h-4 w-4" />} title="Experience">
                <Timeline items={experience} />
              </Group>
            </div>
          </FadeInEffect>

          <FadeInEffect delay={0.1} className="space-y-12">
            <div id="education">
              <Group icon={<GraduationCap className="h-4 w-4" />} title="Education">
                <Timeline items={education} />
              </Group>
            </div>
            <div id="leadership">
              <Group icon={<Users className="h-4 w-4" />} title="Leadership">
                <Timeline items={leadership} />
              </Group>
            </div>
          </FadeInEffect>
        </div>

        {/* Skills */}
        <FadeInEffect className="mt-20" id="skills">
          <Group icon={<Cpu className="h-4 w-4" />} title="Skills · Languages">
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
              {languages.map(({ file, label }) => (
                <li key={file}>
                  <Panel interactive innerClassName="flex items-center gap-3 px-3 py-2.5">
                    <span className="chamfer-sm flex h-7 w-7 shrink-0 items-center justify-center bg-white p-1">
                      <img src={`/images/skills/${file}`} alt="" className="h-full w-full object-contain" loading="lazy" />
                    </span>
                    <span className="truncate text-sm font-medium text-cream">{label}</span>
                  </Panel>
                </li>
              ))}
            </ul>
          </Group>

          <div className="mt-10">
            <Group icon={<Wrench className="h-4 w-4" />} title="Frameworks & tools">
              <Carousel />
            </Group>
          </div>
        </FadeInEffect>

        {/* Awards */}
        <FadeInEffect className="mt-20" id="awards">
          <Group icon={<Award className="h-4 w-4" />} title="Awards">
            <ul className="grid gap-3 sm:grid-cols-2">
              {awards.map((a) => (
                <li key={a.title}>
                  <Panel interactive innerClassName="p-4">
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug text-cream">{a.title}</p>
                      <p className="mt-0.5 text-sm text-sand">
                        {a.org} <span className="font-mono text-xs text-dim">· {a.date}</span>
                      </p>
                    </div>
                  </Panel>
                </li>
              ))}
            </ul>
          </Group>
        </FadeInEffect>
      </Section>
      <GreekDivider label="PROJECTS" />
    </>
  );
}
