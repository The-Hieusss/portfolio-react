export interface Project {
  title: string;
  image: string;
  description: string;
  demoUrl?: string;
  githubUrl?: string;
  tech: { label: string; icon: string }[];
  modalImage: string;
  modalSummary: string;
  modalTech: { label: string; icon: string }[];
}
