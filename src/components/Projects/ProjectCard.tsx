type ProjectCardProps = {
  project: {
    title: string;
    image: string;
    description: string;
    demoUrl?: string;
    githubUrl?: string;
    tech: { label: string; icon: string }[];
    modalImage: string;
    modalSummary: string;
    modalTech: { label: string; icon: string }[];
  };
  onReadMore: () => void;
};

function ProjectCard({ project, onReadMore }: ProjectCardProps) {
  return (
    <div className="relative group w-full flex flex-col h-full bg-gradient-to-br from-[#1a0e09]/95 to-[#120905]/95 rounded-3xl shadow-2xl border-2 border-[#fa7636]/25 overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(250,118,54,0.4)] hover:border-[#fa7636]/50">
      {/* Background decorative glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fa7636]/5 via-transparent to-[#ff9462]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content wrapper */}
      <div className="relative flex flex-col items-center p-8 h-full">
        {/* Project Icon */}
        <div className="relative w-28 h-28 mb-6">
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-gold-gradient opacity-25 blur-2xl rounded-2xl group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />

          {/* Image container */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white via-[#fceee6] to-white p-3 shadow-xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 bg-gradient-to-r from-[#fa7636] via-[#ff9462] to-[#ffb48a] bg-clip-text text-transparent text-center tracking-wide drop-shadow-2xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#e6dcd2]/90 mb-6 text-center font-sans leading-relaxed text-sm md:text-base line-clamp-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.tech.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t.label}
                className="group/tech flex items-center gap-2 bg-[#1f1411]/70 border border-[#fa7636]/30 px-3 py-1.5 rounded-full text-xs font-medium text-[#fceee6] shadow-md hover:bg-[#2a1b15] hover:border-[#fa7636]/60 hover:shadow-lg hover:shadow-[#fa7636]/20 hover:scale-105 transition-all duration-300"
              >
                <img
                  src={t.icon}
                  alt={t.label}
                  className="w-4 h-4 bg-white rounded p-0.5 group-hover/tech:scale-110 transition-transform"
                />
                {t.label}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="flex items-center justify-center px-3 py-1.5 rounded-full bg-[#fa7636]/15 border border-[#fa7636]/30 text-xs font-bold text-[#ffb48a]">
                +{project.tech.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3 mt-auto w-full">
          <button
            onClick={onReadMore}
            className="group/btn flex items-center gap-2 bg-gold-gradient text-[#0a0402] px-6 py-2.5 rounded-full font-serif font-bold shadow-lg hover:shadow-[#fa7636]/40 hover:scale-105 transition-all duration-300"
          >
            <span>Read More</span>
            <svg
              className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/demo flex items-center gap-2 bg-[#fceee6] text-[#0a0402] px-6 py-2.5 rounded-full font-serif font-bold shadow-lg hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <span>Live Demo</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/github flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full font-serif font-bold shadow-lg border-2 border-[#333] hover:bg-black hover:border-[#fa7636] hover:text-[#ffb48a] hover:shadow-[#fa7636]/30 hover:scale-105 transition-all duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* Decorative accent bars */}
      <div className="absolute top-0 left-0 h-1.5 w-1/2 bg-gold-gradient rounded-br-3xl opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 h-1.5 w-1/3 bg-gold-gradient rounded-tl-3xl opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export default ProjectCard;
