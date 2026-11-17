import { Github, Instagram, Linkedin } from "lucide-react";

export const site = {
  name: "Hieu Than",
  email: "hieuthan1703@gmail.com",
  phone: "602-214-1715",
  location: "Tempe, Arizona",
  resumeUrl: "/Resume.pdf",
  githubProfile: "https://github.com/The-Hieusss",
};

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/The-Hieusss", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hieu-than-40b264290/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/the_hieusss/", icon: Instagram },
];

export const navLinks = [
  { label: "Home", to: "home-section" },
  { label: "About", to: "about-section" },
  { label: "Resume", to: "resume-section" },
  { label: "Projects", to: "project-section" },
  { label: "Console", to: "console-section" },
  { label: "Contact", to: "contact-section" },
];
