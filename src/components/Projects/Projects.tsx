import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Github, Hammer } from "lucide-react";
import FadeInEffect from "../ui/fadein";
import { buttonStyles, HudCorners, Panel, Section, SectionHeader } from "../ui/section";
import { cn } from "@/lib/utils";
import ProjectModal from "./ProjectModal";
import { projectsData } from "../data/projectsData";
import { site } from "../data/site";
import type { Project } from "../types";

const FILTERS = {
  All: () => true,
  Web: (p: Project) =>
    p.modalTech.some((t) => ["React", "TailwindCSS", "Vite", "Node.js", "Bootstrap"].includes(t.label)),
  AI: (p: Project) => p.modalTech.some((t) => ["Gemini", "OpenAI"].includes(t.label)),
  Mobile: (p: Project) => p.modalTech.some((t) => ["React Native", "Expo"].includes(t.label)),
  Tools: (p: Project) => p.modalTech.some((t) => ["Shell"].includes(t.label)),
} satisfies Record<string, (p: Project) => boolean>;

type Filter = keyof typeof FILTERS;

const isPlaceholder = (p: Project) => !p.githubUrl && !p.demoUrl;
const realProjects = projectsData.filter((p) => !isPlaceholder(p));
const hasPlaceholder = projectsData.some(isPlaceholder);

function ProjectTile({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <Panel interactive className="group h-full" innerClassName="flex h-full flex-col">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open details for ${project.title}`}
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-surface-2"
      >
        <div aria-hidden className="hud-grid absolute inset-0 opacity-80 [mask-image:none]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_65%_at_50%_50%,rgba(250,118,54,0.35),transparent_70%)] transition-opacity duration-500 group-hover:opacity-100 opacity-70" />
        <div aria-hidden className="absolute inset-0 scanlines" />
        <div className="relative p-2">
          <HudCorners size="h-3 w-3" />
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="chamfer h-24 w-24 bg-white object-contain p-2.5 transition duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
          />
        </div>
        <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.2em] text-ember">
          P-{String(index + 1).padStart(2, "0")}
        </span>
        {project.demoUrl ? (
          <span className="chamfer-sm absolute right-3 top-3 inline-flex items-center gap-1.5 bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ember">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember shadow-[0_0_8px_rgba(250,118,54,1)]" />
            Live
          </span>
        ) : null}
      </button>

      <div className="flex flex-1 flex-col border-t border-ember/30 p-5">
        <h3 className="text-lg font-semibold leading-snug text-cream transition group-hover:text-peach">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-sand">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <li
              key={t.label}
              className="chamfer-sm bg-ember/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-peach"
            >
              {t.label}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
          <button
            type="button"
            onClick={onOpen}
            className="mr-auto font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ember transition hover:text-cream"
          >
            Details ▸
          </button>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              className={cn(buttonStyles.icon, "h-9 w-9")}
            >
              <Github className="h-4 w-4" />
            </a>
          ) : null}
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="chamfer-sm flex h-9 w-9 items-center justify-center bg-gold-gradient text-ink transition hover:brightness-110"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}

function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("All");

  // Lets the ΑΘΗΝΑ assistant open a project's details.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const p = realProjects.find((x) => x.title === (e as CustomEvent<string>).detail);
      if (p) setOpen(p);
    };
    window.addEventListener("open-project", onOpen);
    return () => window.removeEventListener("open-project", onOpen);
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(FILTERS) as Filter[]).map((f) => [f, realProjects.filter(FILTERS[f]).length]),
      ) as Record<Filter, number>,
    [],
  );

  const visible = realProjects.filter(FILTERS[filter]);
  const filters = (Object.keys(FILTERS) as Filter[]).filter((f) => counts[f] > 0);

  return (
    <Section id="project-section" labelledBy="projects-heading">
      <FadeInEffect>
        <SectionHeader
          id="projects-heading"
          eyebrow="Projects"
          title={
            <>
              Selected <span className="text-gold-gradient">work</span>
            </>
          }
          action={
            <div role="group" aria-label="Filter projects" className="chamfer-sm inline-flex flex-wrap gap-1 bg-ember/10 p-1">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`chamfer-sm px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition ${
                    filter === f ? "bg-ember text-ink" : "text-peach hover:text-cream"
                  }`}
                >
                  {f}
                  <span className={`ml-1.5 ${filter === f ? "text-ink/60" : "text-ember/60"}`}>
                    {counts[f]}
                  </span>
                </button>
              ))}
            </div>
          }
        />
      </FadeInEffect>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((project, i) => (
          <li key={project.title}>
            <FadeInEffect delay={(i % 3) * 0.06} className="h-full">
              <ProjectTile project={project} index={i} onOpen={() => setOpen(project)} />
            </FadeInEffect>
          </li>
        ))}

        {hasPlaceholder && filter === "All" ? (
          <li>
            <FadeInEffect delay={(visible.length % 3) * 0.06} className="h-full">
              <a
                href={site.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="chamfer group relative flex h-full min-h-64 flex-col items-center justify-center border border-dashed border-ember/40 p-8 text-center transition hover:border-ember hover:bg-ember/[0.06]"
              >
                <span className="chamfer-sm flex h-12 w-12 items-center justify-center bg-ember/15 text-ember">
                  <Hammer className="h-5 w-5" />
                </span>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-ember">P-?? · Fabricating</p>
                <p className="mt-2 font-semibold text-cream">More in the forge</p>
                <p className="mt-1 max-w-[16rem] text-sm text-sand">
                  Something new is being built. Meanwhile, browse everything on GitHub.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-peach">
                  github.com/The-Hieusss
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </FadeInEffect>
          </li>
        ) : null}
      </ul>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}

export default Projects;
