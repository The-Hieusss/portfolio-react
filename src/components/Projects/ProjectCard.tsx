import { Button } from "../ui/button";

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
    <div
      className="
        relative group w-full flex flex-col items-center
        bg-gradient-to-br from-[#1a0d08]/90 via-[#120905]/80 to-[#1a0d08]/90
        rounded-3xl p-8 shadow-xl
        border border-[#fa7636]/20
        transition-all duration-500 ease-in-out
        hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(250,118,54,0.35)]
        hover:border-[#fa7636]/40
      "
    >
      {/* Project Icon */}
      <div className="relative w-24 h-24 mb-6">
        <img
          src={project.image}
          alt={project.title}
          className="
            w-full h-full rounded-2xl object-contain bg-white/90 p-2
            shadow-lg transition-transform duration-500
            group-hover:rotate-3 group-hover:scale-110
          "
        />
        {/* subtle glow accent */}
        <div className="absolute inset-0 rounded-2xl bg-gold-gradient opacity-0 group-hover:opacity-20 blur-xl transition" />
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-gold-gradient drop-shadow-lg text-center tracking-wide">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-[#fceee6]/90 mb-6 text-center font-sans leading-relaxed text-sm md:text-base line-clamp-4">
        {project.description}
      </p>

      {/* Tech Stack */}
      {project.tech.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t.label}
              className="
                flex items-center gap-1 bg-[#1f1411]/80
                border border-[#fa7636]/30
                px-3 py-1 rounded-full text-xs text-gray-200
                shadow-sm hover:shadow-md hover:border-[#fa7636]/60
                transition
              "
            >
              <img
                src={t.icon}
                alt={t.label}
                className="w-4 h-4 bg-white rounded p-0.5"
              />
              {t.label}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="px-3 py-1 rounded-full bg-[#2a1a14]/70 text-xs text-gray-400">
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3 mt-auto">
        <Button
          onClick={onReadMore}
          className="
            bg-gold-gradient text-[#0a0402] px-5 py-2 rounded-full
            font-serif font-semibold shadow-lg
            hover:scale-105 hover:bg-yellow-400
            transition
          "
        >
          Read More
        </Button>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-[#ffb48a] text-[#0a0402] px-5 py-2 rounded-full
              font-serif font-semibold shadow-lg
              hover:bg-[#fa7636] hover:scale-105 transition
            "
          >
            Live Demo
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-black/80 text-white px-5 py-2 rounded-full
              font-serif font-semibold shadow-lg border border-gray-700
              hover:bg-black hover:border-[#fa7636] hover:text-[#fa7636] hover:scale-105
              transition
            "
          >
            GitHub
          </a>
        )}
      </div>

      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
    </div>
  );
}

export default ProjectCard;
