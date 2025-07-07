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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-80 overflow-auto px-4 py-8">
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-2xl w-full max-w-md p-6 shadow-lg relative">
        <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          {project.title}
        </h2>

        {/* Image */}
        <div className="flex justify-center mb-4">
          <img
            src={project.modalImage}
            alt={project.title}
            className="w-32 h-32 object-contain rounded-lg border border-yellow-400 bg-white"
          />
        </div>

        {/* Summary */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-yellow-300 mb-1">Summary</h3>
          <p className="text-sm leading-relaxed">{project.modalSummary}</p>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-yellow-300 mb-2">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.modalTech.map((tech) => (
              <div
                key={tech.label}
                className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg"
              >
                <img
                  src={tech.icon}
                  alt={tech.label}
                  className="w-6 h-6 bg-white rounded p-1"
                />
                <span className="text-sm">{tech.label}</span>
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
              className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-300"
            >
              View Code
            </a>
          )}
          <button
            onClick={onClose}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
