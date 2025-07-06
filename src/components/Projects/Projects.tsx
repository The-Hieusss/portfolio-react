import { useState } from "react";
import FadeInEffect from "../ui/fadein";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projectsData } from "../data/projectsData";


const projects = projectsData.map((project) => ({
  ...project,
  tech: project.tech.map((t) => ({
    ...t,
    icon: t.icon.startsWith("http") ? t.icon : `/images/tech/${t.icon}`,
  })),
}));

function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="project-section" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />
      <FadeInEffect className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold-gradient drop-shadow-lg tracking-wider">
            Projects
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <div key={project.title} className="flex flex-col items-center">
              <div className="w-full">
                <ProjectCard project={project} onReadMore={() => setOpenIndex(idx)} />
              </div>
              {openIndex === idx && (
                <ProjectModal project={project} onClose={() => setOpenIndex(null)} />
              )}
            </div>
          ))}
        </div>
      </FadeInEffect>
      {/* Decorative large numbers in the background */}
      <span className="absolute left-0 bottom-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pl-4 pb-2 z-0">
        07
      </span>
      <span className="absolute right-0 top-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pr-4 pt-2 z-0">
        22
      </span>
    </section>
  );
}
export default Projects;