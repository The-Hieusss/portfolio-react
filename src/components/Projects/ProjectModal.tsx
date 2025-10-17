import { useEffect } from "react";

type ProjectModalProps = {
  project: {
    title: string;
    modalImage: string;
    modalSummary: string;
    modalTech: { label: string; icon: string }[];
    githubUrl?: string;
  };
  onClose: () => void;
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0402]/90 backdrop-blur-md overflow-auto px-4 py-8 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#1a0e09] to-[#120905] text-[#fceee6] rounded-3xl w-full max-w-3xl shadow-2xl relative border border-[#fa7636]/40 overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fa7636]/5 via-transparent to-[#ff9462]/5 pointer-events-none" />

        {/* Accent bars */}
        <div className="absolute left-0 top-0 h-1.5 w-1/2 bg-gold-gradient rounded-br-3xl" />
        <div className="absolute right-0 bottom-0 h-1.5 w-1/3 bg-gold-gradient rounded-tl-3xl" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-[#1f1411]/80 hover:bg-[#2a1b15] border border-[#fa7636]/30 hover:border-[#fa7636]/60 transition-all duration-300 z-10 group"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-[#ffb48a] group-hover:text-[#fa7636] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative p-8 md:p-10">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 bg-gradient-to-r from-[#fa7636] via-[#ff9462] to-[#ffb48a] bg-clip-text text-transparent text-center">
            {project.title}
          </h2>

          <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative group">
                <div className="absolute inset-0 bg-gold-gradient opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity duration-300" />
                <img
                  src={project.modalImage}
                  alt={project.title}
                  className="relative w-full h-64 md:h-72 object-contain rounded-2xl border-2 border-[#fa7636]/50 bg-gradient-to-br from-white to-[#fceee6] p-6 shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Summary */}
              <div>
                <h3 className="text-xl font-serif font-semibold text-[#ffb48a] mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gold-gradient rounded-full" />
                  Summary
                </h3>
                <p className="text-base leading-relaxed font-sans text-[#e6dcd2]/90">
                  {project.modalSummary}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-serif font-semibold text-[#ffb48a] mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gold-gradient rounded-full" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.modalTech.map((tech) => (
                    <div
                      key={tech.label}
                      className="group flex items-center gap-2.5 bg-[#1f1411]/60 px-4 py-2 rounded-xl border border-[#fa7636]/30 hover:border-[#fa7636]/60 hover:bg-[#2a1b15]/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#fa7636]/10"
                    >
                      <img
                        src={tech.icon}
                        alt={tech.label}
                        className="w-7 h-7 bg-white rounded-md p-1 group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="text-sm font-medium text-[#fceee6] group-hover:text-[#ffb48a] transition-colors">
                        {tech.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-10 pt-6 border-t border-[#fa7636]/20">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gold-gradient text-[#0a0402] px-8 py-3 rounded-full text-base font-serif font-semibold hover:shadow-lg hover:shadow-[#fa7636]/30 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </span>
              </a>
            )}
            <button
              onClick={onClose}
              className="bg-[#fceee6] text-[#0a0402] px-8 py-3 rounded-full text-base font-serif font-semibold hover:bg-[#e6dcd2] hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
