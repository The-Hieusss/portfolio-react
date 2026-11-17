import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    title: "Canopy Companion",
    image: "/images/projdemo/canopy-companion.svg",
    description:
      "Shade-aware walking route planner that finds cooler, tree-covered paths anywhere in the world.",
    demoUrl: "https://canopy-companion.vercel.app/",
    githubUrl: "https://github.com/The-Hieusss/canopy-companion",
    tech: [
      { label: "React", icon: "/frameworks/react.svg" },
      { label: "Node.js", icon: "/frameworks/node.svg" },
      { label: "Express.js", icon: "/frameworks/express.svg" },
      { label: "Gemini", icon: "/frameworks/gemini.png" },
    ],
    modalImage: "/images/projdemo/canopy-companion.svg",
    modalSummary:
      "Canopy Companion helps pedestrians pick a more comfortable walk instead of just the fastest one. You search for a start and destination with Google Places, and it compares up to three walking routes by time, distance, shade score and heat exposure, with per-segment shade drawn on a 3D Google Map. A separate Node.js/Express API generates the routes with OpenRouteService, estimates shade from OpenStreetMap tree, park and building data, adds live weather and UV from Open-Meteo, and uses Gemini to explain its recommendation. You can also ask for routes by voice, hear the recommendation through ElevenLabs, and hand the route off to Google or Apple Maps with a QR code.",
    modalTech: [
      { label: "JavaScript", icon: "/images/skills/javascript.png" },
      { label: "React", icon: "/frameworks/react.svg" },
      { label: "Vite", icon: "/frameworks/vite.png" },
      { label: "Node.js", icon: "/frameworks/node.svg" },
      { label: "Express.js", icon: "/frameworks/express.svg" },
      { label: "Gemini", icon: "/frameworks/gemini.png" },
    ],
  },
  {
    title: "Mr. T AI",
    image: "/images/projdemo/mr-t-ai.svg",
    description:
      "AI fleet copilot for trucking: smart dispatch, proactive alerts and cost insights from plain-language commands.",
    demoUrl: "",
    githubUrl: "https://github.com/The-Hieusss/mr-t-ai",
    tech: [
      { label: "Python", icon: "/images/skills/python.png" },
      { label: "React", icon: "/frameworks/react.svg" },
      { label: "Gemini", icon: "/frameworks/gemini.png" },
    ],
    modalImage: "/images/projdemo/mr-t-ai.svg",
    modalSummary:
      "Mr. T is a hackathon MVP of an AI copilot for fleet dispatchers. Dispatchers type or speak commands like \"assign the best driver to this load\". Gemini parses the intent, and a FastAPI backend routes it to skills that list available drivers, compare options, assign drivers, check alerts and explain each decision. Driver selection uses deterministic scoring, so the AI is only used for understanding requests and explaining results. The React dashboard shows a load board, a driver table, KPIs and a Leaflet map, with voice responses through ElevenLabs. It's built to connect to the Trucker Path NavPro API, which currently runs in mock mode.",
    modalTech: [
      { label: "Python", icon: "/images/skills/python.png" },
      { label: "JavaScript", icon: "/images/skills/javascript.png" },
      { label: "React", icon: "/frameworks/react.svg" },
      { label: "Vite", icon: "/frameworks/vite.png" },
      { label: "Gemini", icon: "/frameworks/gemini.png" },
    ],
  },
  {
    title: "Dreamscape",
    image: "/images/projdemo/dreamscape.logo.png",
    description:
      "Build your world with a thought: describe a scene and Gemini places it in an explorable 3D world.",
    demoUrl: "https://dreamscape-teal.vercel.app/",
    githubUrl: "https://github.com/The-Hieusss/dreamscape",
    tech: [
      { label: "Gemini", icon: "/frameworks/gemini.png" },
      { label: "Three.js", icon: "/frameworks/three.png" },
      { label: "React", icon: "/frameworks/react.svg" },
      { label: "Supabase", icon: "/frameworks/supabase.svg" },
    ],
    modalImage: "/images/projdemo/dreamscape.logo.png",
    modalSummary:
      "Dreamscape is an AI-powered 3D world builder. Users type natural-language commands like \"add five trees\" and Gemini turns them into structured scene actions that place, scale and arrange low-poly models from a built-in asset library. Worlds start from terrain presets (city, woodland, desert, village and ocean), can be edited by hand with selection, move and rotate controls, and saved to each user's account with Supabase. An \"Explore on foot\" mode switches to a first-person camera so you can walk through what you built, following each terrain's height.",
    modalTech: [
      { label: "TypeScript", icon: "/images/skills/typescript.png" },
      { label: "React", icon: "/frameworks/react.svg" },
      { label: "Three.js", icon: "/frameworks/three.png" },
      { label: "Drei", icon: "/frameworks/drei.svg" },
      { label: "Gemini", icon: "/frameworks/gemini.png" },
      { label: "Supabase", icon: "/frameworks/supabase.svg" },
      { label: "PostgreSQL", icon: "/frameworks/postgre.svg" },
      { label: "TailwindCSS", icon: "/frameworks/tailwindcss.svg" },
      { label: "Vite", icon: "/frameworks/vite.png" },
    ],
  },
  {
    title: "Jobless - A Tinder For Jobs",
    image: "/images/projdemo/jobless.svg",
    description:
      "Swipe right on your next career move: a two-sided matching app for students and recruiters.",
    demoUrl: "https://jobless-demo.vercel.app/",
    githubUrl: "https://github.com/The-Hieusss/jobless-demo",
    tech: [
      { label: "TypeScript", icon: "/images/skills/typescript.png" },
      { label: "React", icon: "/frameworks/react.svg" },
      { label: "Supabase", icon: "/frameworks/supabase.svg" },
      { label: "TailwindCSS", icon: "/frameworks/tailwindcss.svg" },
    ],
    modalImage: "/images/projdemo/jobless.svg",
    modalSummary:
      "Jobless is a Tinder-style hiring platform that connects students and recruiters. Both sides sign up with a tailored onboarding flow, then swipe through a card deck of candidates or roles. A conversation opens only on mutual interest, which leads to per-match chat rooms, a shared inbox, a professional network view and RSVP pages for recruiting events. Profiles, matches and messages are stored in Supabase (PostgreSQL).",
    modalTech: [
      { label: "TypeScript", icon: "/images/skills/typescript.png" },
      { label: "React", icon: "/frameworks/react.svg" },
      { label: "TailwindCSS", icon: "/frameworks/tailwindcss.svg" },
      { label: "Supabase", icon: "/frameworks/supabase.svg" },
      { label: "PostgreSQL", icon: "/frameworks/postgre.svg" },
      { label: "Vite", icon: "/frameworks/vite.png" },
    ],
  },
  {
    title: "Google Flight",
    image: "/images/projdemo/googleflight.jpeg",
    description:
      "A recreation of Google Flights' search experience with date pickers, filters and an interactive map.",
    demoUrl: "https://google-flight.vercel.app/",
    githubUrl: "https://github.com/The-Hieusss/GoogleFlight",
    tech: [
      { label: "TypeScript", icon: "/images/skills/typescript.png" },
      { label: "React", icon: "/frameworks/react.svg" },
      { label: "TailwindCSS", icon: "/frameworks/tailwindcss.svg" },
      { label: "Bun", icon: "/frameworks/bun.png" },
    ],
    modalImage: "/images/projdemo/googleflight.jpeg",
    modalSummary:
      "This project recreates the Google Flights search experience. It has a search bar with origin and destination fields, a calendar date picker, and accordion and slider filters built on Radix UI primitives. Results come from a local flight dataset, and Azure Maps shows routes on an interactive map. It's still in beta: the flight search flow is the functional part.",
    modalTech: [
      { label: "TypeScript", icon: "/images/skills/typescript.png" },
      { label: "React", icon: "/frameworks/react.svg" },
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
