import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "../types";
import { buttonStyles, HudCorners } from "../ui/section";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Dialog.Root open={project !== null} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        {project ? (
          <Dialog.Content
            className="fixed inset-x-0 bottom-0 z-50 max-h-[92svh] overflow-y-auto border-t-2 border-ember bg-surface text-cream shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-8 data-[state=open]:fade-in-0 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(92vw,44rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:chamfer sm:border-t-0 sm:data-[state=open]:slide-in-from-bottom-0 sm:data-[state=open]:zoom-in-95"
          >
            <div className="relative flex items-center justify-center overflow-hidden bg-surface-2 px-6 py-10">
              <div aria-hidden className="hud-grid absolute inset-0 [mask-image:none]" />
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_75%_at_50%_45%,rgba(250,118,54,0.4),transparent_70%)]" />
              <div aria-hidden className="scanlines absolute inset-0" />
              <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.2em] text-ember">FILE://PROJECT</span>
              <div className="relative p-2.5">
                <HudCorners size="h-4 w-4" />
                <img
                  src={project.modalImage}
                  alt=""
                  className="chamfer h-28 w-28 bg-white object-contain p-3 sm:h-32 sm:w-32"
                />
              </div>
              <Dialog.Close
                className="chamfer-sm absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-ink/70 text-peach transition hover:bg-ember hover:text-ink"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <div className="p-6 sm:p-8">
              <Dialog.Title className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
                {project.title}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-peach sm:text-base">
                {project.description}
              </Dialog.Description>

              <p className="mt-5 text-[15px] leading-7 text-sand">{project.modalSummary}</p>

              <h4 className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-ember">// Built with</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.modalTech.map((tech) => (
                  <li
                    key={tech.label}
                    className="chamfer-sm flex items-center gap-2 bg-ember/10 px-2.5 py-1.5 text-sm text-cream"
                  >
                    <span className="chamfer-sm flex h-5 w-5 items-center justify-center bg-white p-0.5">
                      <img src={tech.icon} alt="" className="h-full w-full object-contain" />
                    </span>
                    {tech.label}
                  </li>
                ))}
              </ul>

              {project.githubUrl || project.demoUrl ? (
                <div className="mt-8 flex flex-col gap-3 border-t border-ember/30 pt-6 sm:flex-row">
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.primary}>
                      Live demo
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
                      <Github className="h-4 w-4" />
                      Source code
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Dialog.Content>
        ) : null}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ProjectModal;
