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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0402]/80 backdrop-blur-sm overflow-auto px-4 py-8">
      <div className="bg-[#120905] text-[#fceee6] rounded-2xl w-full max-w-md p-6 shadow-2xl relative border border-[#fa7636]/30">
        {/* Accent bar */}
        <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />

        {/* Title */}
        <h2 className="text-2xl font-serif font-bold mb-4 text-gold-gradient text-center">
          {project.title}
        </h2>

        {/* Image */}
        <div className="flex justify-center mb-4">
          
          <img
            src={project.modalImage} 
            alt={project.title}
            className="w-32 h-32 object-contain rounded-lg border border-[#fa7636] bg-white p-2"
          />
        </div>

        {/* Summary */}
        <div className="mb-5">
          <h3 className="text-lg font-serif text-[#ffb48a] mb-2">Summary</h3>
          <p className="text-sm leading-relaxed font-sans text-[#e6dcd2]">
            {project.modalSummary}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h3 className="text-lg font-serif text-[#ffb48a] mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.modalTech.map((tech) => (
              <div
                key={tech.label}
                className="flex items-center gap-2 bg-[#1f1411] px-3 py-1 rounded-lg border border-[#fa7636]/20"
              >
                <img
                  src={tech.icon}
                  alt={tech.label}
                  className="w-6 h-6 bg-white rounded p-1"
                />
                <span className="text-sm text-[#fceee6]">{tech.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-gradient text-[#0a0402] px-4 py-2 rounded-full text-sm font-serif font-semibold hover:bg-[#ff9462] transition"
            >
              View Code
            </a>
          )}
          <button
            onClick={onClose}
            className="bg-[#fceee6] text-[#0a0402] px-4 py-2 rounded-full text-sm font-serif font-semibold hover:bg-[#e6dcd2] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
