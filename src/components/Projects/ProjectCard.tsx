import { Button } from "../ui/button";

type ProjectCardProps = {
  project: {
    title: string;
    image: string;
    description: string;
    demoUrl?: string;
    tech: { label: string; icon: string }[];
    modalImage: string;
    modalSummary: string;
    modalTech: { label: string; icon: string }[];
    githubUrl?: string;
  };
  onReadMore: () => void;
};

function ProjectCard({ project, onReadMore }: ProjectCardProps) {
  return (
    <div className="bg-[#120905]/90 rounded-3xl shadow-xl p-8 w-full flex flex-col items-center relative transition-transform ease-in-out">
      {/* Project Icon */}
      <img
        src={project.image}
        alt={project.title}
        className="w-20 h-20 mb-4 rounded-xl shadow-lg object-contain  p-2"
      />

      {/* Title */}
      <h3 className="text-2xl font-serif font-bold mb-2 text-gold-gradient drop-shadow-lg text-center tracking-wide">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-[#fceee6] mb-4 text-center font-sans leading-relaxed">
        {project.description}
      </p>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <Button
          className="bg-gold-gradient text-[#0a0402] px-5 py-2 rounded-full font-serif font-bold shadow-lg hover:bg-[#ff9462] hover:text-[#0a0402] transition"
          onClick={onReadMore}
        >
          Read More
        </Button>

        {/* Optional Demo Button */}
        {/* {project.demoUrl && project.demoUrl !== "" && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ffb48a] text-[#0a0402] px-5 py-2 rounded-full font-serif font-bold shadow-lg hover:bg-[#fa7636] transition"
          >
            See Demo
          </a>
        )} */}
      </div>

      {/* Decorative orange accent bar */}
      <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
    </div>
  );
}

export default ProjectCard;
