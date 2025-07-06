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
    const section = document.getElementById("project-section")
    if (!section) return

    const handleScroll = () => {
      const { top, bottom } = section.getBoundingClientRect()
      // if the entire section is above the top **or** below the bottom of the viewport
      if (bottom < 0 || top > window.innerHeight) {
        onClose()
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [onClose])
  return (
    <div className="absolute inset-0 z-100 flex items-center justify-center bg-black/80 bg-opacity-80 overflow-hidden">
      <div className="bg-gradient-to-br from-black via-gray-900 to-black 
                      rounded-3xl max-w-xl w-11/12 sm:w-3/4 
                      p-6 relative shadow-2xl">
        {/* Gold accent bar */}
        <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />

        {/* Title */}
        <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg text-center tracking-wider">
          {project.title}
        </h2>

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={project.modalImage}
            alt={project.title}
            className="w-36 h-36 rounded-2xl shadow-lg bg-white object-contain border-4 border-yellow-400"
          />
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h3 className="font-serif text-xl font-bold mb-2 text-yellow-300">Summary</h3>
          <p className="text-gray-200 font-sans leading-relaxed">
            {project.modalSummary}
          </p>
        </div>

        {/* Tech */}
        <div className="mb-8">
          <h3 className="font-serif text-xl font-bold mb-2 text-yellow-300">Technologies</h3>
          <div className="flex gap-3 flex-wrap">
            {project.modalTech.map((t) => (
              <div key={t.label} className="flex items-center gap-2 bg-black/70 px-3 py-2 rounded-lg shadow">
                <img src={t.icon} alt={t.label} className="w-8 h-8 rounded bg-white p-1" />
                <span className="text-sm text-gray-100 font-serif">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-gradient text-black px-6 py-2 rounded-full font-serif font-bold shadow hover:bg-yellow-500 transition"
            >
              See Program
            </a>
          )}
          <button
            className="bg-gray-200 text-black px-6 py-2 rounded-full font-serif font-bold shadow hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;