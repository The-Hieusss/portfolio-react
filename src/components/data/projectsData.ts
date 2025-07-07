import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    title: "Google Flight",
    image: "/images/favicon.svg",
    description:
      "Replica of Google Flight search engine. Simple UI, dummy data, beta mode.",
    demoUrl: "https://google-flight.vercel.app/",
    githubUrl: "https://github.com/The-Hieusss/GoogleFlight",
    tech: [
      { label: "TypeScript", icon: "/images/skills/typescript.png" },
      { label: "Vite", icon: "/frameworks/vite.png" },
      { label: "TailwindCSS", icon: "/frameworks/tailwindcss.svg" },
      { label: "Bun", icon: "/frameworks/bun.png" },
    ],
    modalImage: "/images/projdemo/googleflight.jpeg",
    modalSummary:
      "This project is a replica of the Google Flight flight search engine. It contains dummy data for testing and has a simple UI that resembles the Google Flight UI. It is still in beta mode and only the flight search component is functional.",
    modalTech: [
      { label: "TypeScript", icon: "/images/skills/typescript.png" },
      { label: "Vite", icon: "/frameworks/vite.png" },
      { label: "TailwindCSS", icon: "/frameworks/tailwindcss.svg" },
      { label: "Bun", icon: "/frameworks/bun.png" },
    ],
  },
  {
    title: "The Garden",
    image: "/images/favicon.svg",
    description:
      "Interactive learning app for patients with dementia and stroke recovery.",
    demoUrl: "",
    githubUrl: "https://github.com/ForgotSemiColon/Master-Project",
    tech: [
      { label: "JavaScript", icon: "/images/skills/javascript.png" },
      { label: "HTML", icon: "/images/skills/html.png" },
      { label: "CSS", icon: "/images/skills/css.png" },
      { label: "p5.js", icon: "/images/projdemo/p5js.png" },
    ],
    modalImage: "/images/projdemo/thegarden.png",
    modalSummary:
      "The Garden is a web application that provides an interactive learning experience. It focuses on the development and optimal training for patients with dementia and patients recovering from stroke through video games and graphical presentation. The application features an intuitive and user-friendly interface using HTML, CSS, and JavaScript, while operating on a simplistic design.",
    modalTech: [
      { label: "JavaScript", icon: "/images/skills/javascript.png" },
      { label: "HTML", icon: "/images/skills/html.png" },
      { label: "CSS", icon: "/images/skills/css.png" },
      { label: "p5.js", icon: "/images/projdemo/p5js.png" },
    ],
  },
  {
    title: "Deadline.AI",
    image: "/images/favicon.svg",
    description: "Mobile app for AI-powered personal scheduling and chat.",
    demoUrl: "",
    githubUrl: "https://github.com/Smit2553/deadline.ai-frontend",
    tech: [
      { label: "Python", icon: "/images/skills/python.png" },
      { label: "React Native", icon: "/frameworks/reactnative.svg" },
    ],
    modalImage: "/images/projdemo/deadlineai.png",
    modalSummary:
      "Deadline.AI is a mobile application that allows users to create and manage their personal schedules based on their availability. Using Open.AI API, the program integrates an AI engine for scheduling and a chatbot feature for ease of use.",
    modalTech: [
      { label: "Python", icon: "/images/skills/python.png" },
      { label: "React Native", icon: "/frameworks/reactnative.svg" },
    ],
  },
  {
    title: "Gift4U",
    image: "/images/favicon.svg",
    description:
      "PWA simulating a gift trading/e-commerce website with real-time updates.",
    demoUrl: "",
    githubUrl: "https://github.com/The-Hieusss/EximbankGiftTrading",
    tech: [
      { label: "JavaScript", icon: "/images/skills/javascript.png" },
      { label: "HTML", icon: "/images/skills/html.png" },
      { label: "CSS", icon: "/images/skills/css.png" },
      { label: "Bootstrap", icon: "/frameworks/bootstrap.png" },
      { label: "Node.js", icon: "/frameworks/node.svg" },
      { label: "Express.js", icon: "/frameworks/express.svg" },
    ],
    modalImage: "/images/projdemo/gift4.png",
    modalSummary:
      "Gift4U is a Progressive Web App (PWA) simulating a gift trading/e-commerce website. The app allows users to browse products from Eximbank API for real-time updates and provides full CRUD operations for admin account management.",
    modalTech: [
      { label: "JavaScript", icon: "/images/skills/javascript.png" },
      { label: "HTML", icon: "/images/skills/html.png" },
      { label: "CSS", icon: "/images/skills/css.png" },
      { label: "Bootstrap", icon: "/frameworks/bootstrap.png" },
      { label: "Node.js", icon: "/frameworks/node.svg" },
      { label: "Express.js", icon: "/frameworks/express.svg" },
    ],
  },
  {
    title: "Arizona Tree",
    image: "/images/favicon.svg",
    description: "Web app for visualizing tree canopy coverage by location.",
    demoUrl: "",
    githubUrl: "https://github.com/Gabenn1/TreeZona",
    tech: [
      { label: "Python", icon: "/images/skills/python.png" },
      { label: "TypeScript", icon: "/images/skills/typescript.png" },
      { label: "Vite", icon: "/frameworks/vite.png" },
      { label: "TailwindCSS", icon: "/frameworks/tailwindcss.svg" },
      { label: "Bun", icon: "/frameworks/bun.png" },
    ],
    modalImage: "/images/projdemo/Arizona_Tree.png",
    modalSummary:
      "Arizona Tree is a web-based application designed to provide users with insights into the canopy coverage of a given location. Users can explore an interactive map to visualize the tree canopy and receive a percentage of tree coverage in that area.",
    modalTech: [
      { label: "Python", icon: "/images/skills/python.png" },
      { label: "TypeScript", icon: "/images/skills/typescript.png" },
      { label: "Vite", icon: "/frameworks/vite.png" },
      { label: "TailwindCSS", icon: "/frameworks/tailwindcss.svg" },
      { label: "Bun", icon: "/frameworks/bun.png" },
    ],
  },
  {
    title: "Coming Soon",
    image: "/images/favicon.svg",
    description: "Something awesome is being made...",
    demoUrl: "",
    githubUrl: "",
    tech: [],
    modalImage: "/images/favicon.svg",
    modalSummary: "Stay tuned for more exciting projects!",
    modalTech: [],
  },
];
