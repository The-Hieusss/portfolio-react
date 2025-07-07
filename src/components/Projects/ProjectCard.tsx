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
    <div className="bg-black/80  rounded-3xl shadow-2xl p-8 w-full flex flex-col items-center relative transition-transform hover:scale-105 hover:shadow-yellow-400/30">
      {/* Project Icon */}
      <img
        src={project.image}
        alt={project.title}
        className="w-20 h-20 mb-4 rounded-xl shadow-lg object-contain"
      />
      {/* Title */}
      <h3 className="text-2xl font-serif font-bold mb-2 text-gold-gradient drop-shadow-lg text-center tracking-wide">
        {project.title}
      </h3>
      {/* Description */}
      <p className="text-gray-200 mb-4 text-center font-sans">
        {project.description}
      </p>
      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <Button
          className="bg-gold-gradient text-black px-5 py-2 rounded-full font-serif font-bold shadow hover:bg-yellow-500 transition"
          onClick={onReadMore}
        >
          Read More
        </Button>

        {/* {project.demoUrl && project.demoUrl !== "" && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-5 py-2 rounded-full font-serif font-bold shadow hover:bg-yellow-400 transition"
          >
            See Demo
          </a>
        )} */}
      </div>
      {/* Decorative gold bar */}
      <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
    </div>
  );
}

export default ProjectCard;
