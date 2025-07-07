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
    <section
      id="project-section"
      className="py-24 bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402] relative overflow-hidden"
    >
      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />

      <FadeInEffect className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold-gradient drop-shadow-lg tracking-wider">
            Projects
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <div key={project.title} className="flex flex-col items-center">
              <div className="w-full bg-[#120905]/80 rounded-xl shadow-lg p-4 hover:scale-105 hover:shadow-[0_0_15px_#fa7636]/30 transition-all duration-300 ease-in-out border border-[#fa7636]/20">
                <ProjectCard
                  project={project}
                  onReadMore={() => setOpenIndex(idx)}
                />
              </div>

              {/* Modal */}
              {openIndex === idx && (
                <ProjectModal
                  project={project}
                  onClose={() => setOpenIndex(null)}
                />
              )}
            </div>
          ))}
        </div>
      </FadeInEffect>
    </section>
  );
}

export default Projects;
