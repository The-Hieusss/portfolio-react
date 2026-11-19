/**
 * ΑΘΗΝΑ's "brain": a small, fully client-side intent matcher.
 * No network calls, no API keys. Everything it knows comes from the site's own data files.
 */
import { projectsData } from "../data/projectsData";
import { site, socialLinks } from "../data/site";
import { aiTools, awards, education, experience, frameworks, languages, leadership } from "../data/profile";
import type { Project } from "../types";

export type Action =
  | { kind: "link"; label: string; href: string }
  | { kind: "scroll"; label: string; to: string }
  | { kind: "project"; label: string; title: string }
  | { kind: "ask"; label: string; prompt: string };

export type Reply = { text: string; actions?: Action[] };

const projects = projectsData.filter((p) => p.githubUrl || p.demoUrl);

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s.#+]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

/** True when any of the given words/phrases appears in the text as a whole word. */
const has = (t: string, ...words: string[]) =>
  words.some((w) => new RegExp(`(^|\\s)${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|$|s\\b)`).test(t));

const projectAliases: Record<string, string[]> = {
  "Disposable Downloads": ["disposable", "downloads folder", "self-cleaning", "self cleaning"],
  "Canopy Companion": ["canopy", "shade", "walking route", "route planner"],
  "Mr. T AI": ["mr t", "mr. t", "mrt", "trucking", "fleet", "dispatch"],
  Dreamscape: ["dreamscape", "3d world", "dream scape"],
  "Jobless - A Tinder For Jobs": ["jobless", "tinder"],
  "Google Flight": ["google flight", "flight", "flights"],
};

function findProject(t: string): Project | undefined {
  return projects.find((p) => (projectAliases[p.title] ?? [p.title.toLowerCase()]).some((a) => t.includes(a)));
}

function projectReply(p: Project): Reply {
  const actions: Action[] = [{ kind: "project", label: "Show details", title: p.title }];
  if (p.demoUrl) actions.push({ kind: "link", label: "Live demo", href: p.demoUrl });
  if (p.githubUrl) actions.push({ kind: "link", label: "Source code", href: p.githubUrl });
  const stack = p.modalTech.map((t) => t.label).join(", ");
  return { text: `${p.title}: ${p.description}\n\nBuilt with ${stack}.`, actions };
}

const sectionWords: [string[], string, string][] = [
  [["project", "work", "portfolio"], "project-section", "Projects"],
  [["resume", "résumé", "experience", "education", "skill"], "resume-section", "Résumé"],
  [["about"], "about-section", "About"],
  [["console", "terminal"], "console-section", "Console"],
  [["contact"], "contact-section", "Contact"],
  [["top", "home", "hero"], "home-section", "Home"],
];

const jokes = [
  "Why did Icarus's startup fail? He scaled too close to the sun.",
  "Sisyphus wasn't cursed. He was just maintaining a legacy codebase.",
  "I asked the Oracle for the bug's location. She said “it works on my temple.”",
  "Achilles had 100% test coverage. Except for one heel case.",
];

export const SUGGESTIONS = [
  "Who is Hieu?",
  "What has he built?",
  "Where has he worked?",
  "What are his skills?",
  "How do I contact him?",
];

export function answer(raw: string): Reply {
  const t = norm(raw);
  if (!t) return { text: "I'm listening. Ask me anything about Hieu." };

  // Navigation: "take me to projects", "go to contact", "show the resume section"
  if (has(t, "go to", "take me", "scroll", "navigate", "jump to") || (has(t, "show") && has(t, "section"))) {
    const hit = sectionWords.find(([words]) => words.some((w) => t.includes(w)));
    if (hit) {
      return {
        text: `Plotting a course to ${hit[2]}.`,
        actions: [{ kind: "scroll", label: `Go to ${hit[2]}`, to: hit[1] }],
      };
    }
  }

  // A specific project
  const proj = findProject(t);
  if (proj) return projectReply(proj);

  if (has(t, "hi", "hello", "hey", "yo", "sup", "greetings", "chaire", "χαιρε")) {
    return {
      text: "Χαίρε, traveler. I'm ΑΘΗΝΑ, Hieu's onboard assistant. Ask me about his projects, experience, skills, or how to reach him.",
      actions: SUGGESTIONS.slice(0, 3).map((s) => ({ kind: "ask", label: s, prompt: s })),
    };
  }

  if (has(t, "who are you", "what are you", "your name", "jarvis", "athena", "αθηνα", "assistant", "are you ai", "are you real", "chatgpt")) {
    return {
      text: "I'm ΑΘΗΝΑ (Athena), a small assistant built into this site, named for the goddess of wisdom and craft. I run entirely in your browser and only know what's on this site, so no data leaves your machine.",
    };
  }

  if (has(t, "thank", "thanks", "thx", "ty", "appreciate")) return { text: "Anytime. May your builds be green and your deploys swift." };

  if (has(t, "joke", "funny", "laugh")) return { text: jokes[Math.floor(Math.random() * jokes.length)] };

  if (has(t, "best", "favorite", "favourite", "proud", "coolest", "recommend", "impressive")) {
    const p = projects.find((x) => x.title === "Dreamscape") ?? projects[0];
    const r = projectReply(p);
    return { ...r, text: `My pick: ${r.text}` };
  }

  if (has(t, "project", "built", "build", "made", "make", "portfolio", "apps", "app")) {
    return {
      text:
        "Here's what Hieu has shipped:\n" +
        projects.map((p, i) => `${i + 1}. ${p.title}: ${p.description}`).join("\n") +
        "\n\nAsk me about any one of them for details.",
      actions: [
        { kind: "scroll", label: "Go to Projects", to: "project-section" },
        ...projects.slice(0, 2).map((p): Action => ({ kind: "ask", label: p.title, prompt: `Tell me about ${p.title}` })),
      ],
    };
  }

  if (has(t, "currently", "current", "now", "today") && has(t, "work", "job", "doing", "intern", "employ")) {
    const cur = experience.find((e) => "current" in e && e.current) ?? experience[0];
    return { text: `Hieu is currently a ${cur.title} at ${cur.subtitle}.` };
  }

  if (has(t, "experience", "intern", "internship", "work", "worked", "job", "career", "company", "companies", "employ", "rocket", "movecars", "airline", "eximbank")) {
    return {
      text:
        `Hieu has completed ${experience.length} software engineering internships:\n` +
        experience.map((e) => `• ${e.subtitle} (${e.date})`).join("\n"),
      actions: [{ kind: "scroll", label: "Open Résumé", to: "resume-section" }, { kind: "link", label: "PDF résumé", href: site.resumeUrl }],
    };
  }

  if (has(t, "school", "university", "college", "asu", "study", "studies", "studying", "degree", "major", "graduate", "graduation", "education", "student", "class")) {
    const [uni] = education;
    return {
      text: `Hieu is studying ${uni.subtitle} at ${uni.title} (${uni.date}). Before that: ${education
        .slice(1)
        .map((e) => `${e.title}, ${e.meta}`)
        .join("; ")}.`,
    };
  }

  if (has(t, "lead", "leader", "leadership", "president", "club", "vinasu", "organization", "community")) {
    const l = leadership[0];
    return { text: `Hieu serves as ${l.title} of the ${l.subtitle} (${l.date}).` };
  }

  if (has(t, "award", "awards", "scholarship", "honor", "honors", "dean", "achievement")) {
    return { text: "Honors so far:\n" + awards.map((a) => `• ${a.title} (${a.org}, ${a.date})`).join("\n") };
  }

  if (has(t, "skill", "skills", "language", "languages", "stack", "tech", "technology", "know", "framework", "frameworks", "tools", "program", "code", "coding")) {
    return {
      text:
        `Languages: ${languages.map((l) => l.label).join(", ")}.\n` +
        `Frameworks & tools: ${frameworks.join(", ")}.\n` +
        `AI: ${aiTools.join(", ")}.`,
    };
  }

  if (has(t, "hire", "hiring", "available", "availability", "open to", "opportunit", "recruit", "role", "position")) {
    return {
      text: "Hieu is open to internships, new-grad roles and interesting collaborations. The fastest way in is email.",
      actions: [
        { kind: "link", label: "Email Hieu", href: `mailto:${site.email}` },
        { kind: "link", label: "Résumé (PDF)", href: site.resumeUrl },
      ],
    };
  }

  if (has(t, "contact", "email", "mail", "reach", "phone", "call", "text", "message", "talk")) {
    return {
      text: `Email: ${site.email}\nPhone: ${site.phone}\nHe usually replies within a day.`,
      actions: [
        { kind: "link", label: "Send email", href: `mailto:${site.email}` },
        { kind: "scroll", label: "Contact form", to: "contact-section" },
      ],
    };
  }

  if (has(t, "resume", "résumé", "cv")) {
    return { text: "Here's the full résumé.", actions: [{ kind: "link", label: "Open PDF", href: site.resumeUrl }] };
  }

  if (has(t, "github", "linkedin", "instagram", "social", "socials")) {
    return {
      text: "Find Hieu here:",
      actions: socialLinks.map((s): Action => ({ kind: "link", label: s.label, href: s.href })),
    };
  }

  if (has(t, "where", "location", "located", "based", "live", "lives", "from", "city")) {
    return {
      text: `Hieu is based in ${site.location}. Before ASU he studied in Milwaukee, Wisconsin, and Ho Chi Minh City, Vietnam.`,
    };
  }

  if (has(t, "who", "about", "hieu", "him", "introduce", "background", "tell me")) {
    const cur = experience[0];
    return {
      text: `Hieu Than is a software engineer studying Computer Science (Software Engineering) at Arizona State University. He's currently a ${cur.title} at ${cur.subtitle}, and he builds web, mobile and AI products, from AI-generated 3D worlds to shade-aware route planners.`,
      actions: [
        { kind: "ask", label: "What has he built?", prompt: "What has he built?" },
        { kind: "ask", label: "Where has he worked?", prompt: "Where has he worked?" },
      ],
    };
  }

  if (has(t, "website", "site", "this page", "portfolio built", "made this")) {
    return { text: "This site is built with React 19, TypeScript, Vite, Tailwind CSS v4 and Framer Motion, and it's deployed on Vercel. Hieu designed it himself." };
  }

  if (has(t, "meaning of life", "42")) return { text: "42. The Oracle confirms it." };

  return {
    text: "That's beyond my memory banks for now. I know about Hieu's projects, experience, education, skills and contact info. Try one of these:",
    actions: SUGGESTIONS.slice(0, 4).map((s) => ({ kind: "ask", label: s, prompt: s })),
  };
}
