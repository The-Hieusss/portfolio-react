import { useMemo, useState } from "react";
import FadeInEffect from "../ui/fadein";
import ProjectModal from "./ProjectModal";
import { projectsData } from "../data/projectsData";

const projects = projectsData.map((project) => ({
  ...project,
  tech: project.tech.map((t) => ({
    ...t,
    icon:
      t.icon.startsWith("/") || t.icon.startsWith("http")
        ? t.icon
        : `/images/tech/${t.icon}`,
  })),
}));

const CATEGORIES = ["All", "Web", "Mobile", "AI", "Tools"] as const;
type Category = (typeof CATEGORIES)[number];
type ViewMode = "grid" | "list";
type SortMode = "featured" | "title-asc";

function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortMode>("featured");

  // Counts per category for chips
  const catCounts = useMemo(() => {
    const byCat = { All: projects.length, Web: 0, Mobile: 0, AI: 0, Tools: 0 } as Record<Category, number>;
    for (const p of projects) {
      if (p.tech.some((t) => ["TailwindCSS", "Bootstrap", "Vite", "React", "Node.js"].some((w) => t.label.includes(w)))) byCat.Web++;
      if (p.tech.some((t) => ["React Native", "Expo"].some((w) => t.label.includes(w)))) byCat.Mobile++;
      if (p.tech.some((t) => ["Python", "Machine Learning", "OpenAI", "AI"].some((w) => t.label.includes(w)))) byCat.AI++;
      // "Tools" left as 0 unless you define criteria; feel free to adapt
    }
    return byCat;
  }, []);

  const filteredBase = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tech.some((t) => t.label.toLowerCase().includes(query.toLowerCase()));

      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Web" &&
          p.tech.some((t) =>
            ["TailwindCSS", "Bootstrap", "Vite", "React", "Node.js"].some((w) =>
              t.label.includes(w)
            )
          )) ||
        (activeCategory === "Mobile" &&
          p.tech.some((t) =>
            ["React Native", "Expo"].some((w) => t.label.includes(w))
          )) ||
        (activeCategory === "AI" &&
          p.tech.some((t) =>
            ["Python", "Machine Learning", "OpenAI", "AI"].some((w) =>
              t.label.includes(w)
            )
          ));

      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const filtered = useMemo(() => {
    const arr = [...filteredBase];
    if (sort === "title-asc") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    }
    return arr;
  }, [filteredBase, sort]);

  const hasActiveFilter = query.trim() !== "" || activeCategory !== "All";

  return (
    <section
      id="project-section"
      className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402]"
      aria-labelledby="projects-heading"
    >
      {/* Decorative top borders */}
      <div className="absolute inset-x-0 top-0 flex justify-between opacity-20 pointer-events-none">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      {/* Subtle radial gold glow */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_50%_at_50%_10%,rgba(250,118,54,0.08),transparent)]" />

      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />

      <FadeInEffect className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <header className="mb-6">
          <div className="text-center md:text-left">
            <h2
              id="projects-heading"
              className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient tracking-wider drop-shadow-lg"
            >
              Projects
            </h2>
            <p className="text-gray-300 mt-2 max-w-xl mx-auto md:mx-0">
              Web apps, mobile demos, AI experiments. Browse highlights or filter to explore.
            </p>
          </div>
        </header>

        {/* Sticky Controls */}
        <div className="sticky top-16 z-20 -mx-4 md:mx-0 backdrop-blur-sm">
          <div className="bg-[#0a0402]/70 rounded-2xl border border-[#fa7636]/20 px-4 py-4 md:px-6 md:py-5">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full max-w-xl">
                <input
                  aria-label="Search projects"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-[#0f0a08]/80 text-[#f2e9e0] placeholder:text-[#d9c9bf] px-4 py-2 rounded-full border border-[#fa7636]/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                  placeholder="Search by title, description or tech..."
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fa7636]">⌕</span>
              </div>

              {/* Chips + actions */}
              <div className="flex flex-wrap items-center gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-serif transition relative
                      ${activeCategory === cat ? "bg-gold-gradient text-black shadow-md" : "bg-[#120905]/70 text-[#fceee6] hover:bg-[#fa7636]/20"}`}
                    aria-pressed={activeCategory === cat}
                  >
                    <span className="flex items-center gap-2">
                      {cat}
                      <span className={`text-xs ${activeCategory === cat ? "text-black/80" : "text-[#ffb48a]"}`}>
                        {cat === "All" ? catCounts.All : catCounts[cat]}
                      </span>
                    </span>
                  </button>
                ))}

                <div className="h-6 w-px bg-[#fa7636]/30 mx-1 hidden sm:block" />

                {/* View toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setView("grid")}
                    className={`px-3 py-1 rounded-full text-xs font-serif transition ${
                      view === "grid" ? "bg-gold-gradient text-black" : "bg-[#120905]/70 text-[#fceee6]"
                    }`}
                    aria-pressed={view === "grid"}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`px-3 py-1 rounded-full text-xs font-serif transition ${
                      view === "list" ? "bg-gold-gradient text-black" : "bg-[#120905]/70 text-[#fceee6]"
                    }`}
                    aria-pressed={view === "list"}
                  >
                    List
                  </button>
                </div>

                {/* Sort */}
                <select
                  aria-label="Sort projects"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className="px-3 py-1 rounded-full text-xs font-serif bg-[#120905]/70 text-[#fceee6] border border-[#fa7636]/20 focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="title-asc">Title A–Z</option>
                </select>

                {/* Clear */}
                {hasActiveFilter && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setActiveCategory("All");
                      setSort("featured");
                    }}
                    className="px-3 py-1 rounded-full text-xs font-serif bg-white text-black hover:bg-yellow-200 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Result count */}
            <div className="mt-2 text-xs text-gray-400" aria-live="polite">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        {/* Content */}
        {filtered.length > 0 ? (
          view === "grid" ? (
            // Featured + grid
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Featured project */}
              {filtered[0] && (
                <div className="lg:col-span-7">
                  <div
                    className="relative group rounded-3xl overflow-hidden border border-[#fa7636]/20 shadow-2xl transition transform hover:scale-[1.01]"
                  >
                    <img
                      src={filtered[0].modalImage}
                      alt={filtered[0].title}
                      className="w-full h-auto md:h-[28rem] object-contain transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="text-3xl font-serif font-bold text-gold-gradient drop-shadow-lg">
                        {filtered[0].title}
                      </h3>
                      <p className="text-sm text-gray-200 mt-2 max-w-lg">
                        {filtered[0].description}
                      </p>
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() =>
                            setOpenIndex(projects.findIndex((p) => p.title === filtered[0].title))
                          }
                          className="bg-gold-gradient text-black px-5 py-2 rounded-full font-serif font-semibold shadow hover:bg-yellow-500"
                        >
                          Read More
                        </button>
                        {filtered[0].demoUrl && (
                          <a
                            href={filtered[0].demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white text-black px-5 py-2 rounded-full font-serif font-semibold shadow hover:bg-yellow-400"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
                  </div>
                </div>
              )}

              {/* Other projects */}
              <div className="lg:col-span-5 grid sm:grid-cols-2 gap-6 auto-rows-[minmax(180px,auto)]">
                {filtered.slice(1).map((project) => {
                  const globalIdx = projects.findIndex((p) => p.title === project.title);
                  return (
                    <div
                      key={project.title}
                      className="group relative flex flex-col bg-[#120905]/80 border border-[#fa7636]/20 rounded-2xl shadow-lg hover:scale-105 hover:shadow-[0_0_25px_#fa7636]/40 transition-all duration-300 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-16 h-16 rounded-lg object-contain bg-white p-2 shadow"
                          loading="lazy"
                        />
                        <div>
                          <h4 className="text-lg font-serif font-bold text-gold-gradient">
                            {project.title}
                          </h4>
                          <p className="text-xs text-gray-300 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tech.slice(0, 5).map((t) => (
                          <span
                            key={t.label}
                            className="flex items-center gap-1.5 bg-[#1f1411] px-2 py-1 rounded-full text-xs text-gray-100 border border-[#fa7636]/20"
                          >
                            <img src={t.icon} alt={t.label} className="w-5 h-5 bg-white rounded p-0.5" />
                            {t.label}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => setOpenIndex(globalIdx)}
                          className="bg-gold-gradient text-black px-3 py-1 rounded-full text-xs font-serif font-semibold"
                        >
                          Read More
                        </button>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white text-black px-3 py-1 rounded-full text-xs font-serif font-semibold"
                          >
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // List view
            <div className="mt-8 space-y-4">
              {filtered.map((project) => {
                const globalIdx = projects.findIndex((p) => p.title === project.title);
                return (
                  <div
                    key={project.title}
                    className="relative flex flex-col md:flex-row gap-4 items-center md:items-stretch bg-[#120905]/80 border border-[#fa7636]/20 rounded-2xl p-4 shadow hover:shadow-[0_0_25px_#fa7636]/30 transition"
                  >
                    <img
                      src={project.modalImage || project.image}
                      alt={project.title}
                      className="w-40 md:w-64 h-40 md:h-28 object-contain rounded-xl"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-bold text-gold-gradient">{project.title}</h3>
                      <p className="text-sm text-gray-300 mt-1">{project.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.tech.slice(0, 8).map((t) => (
                          <span key={t.label} className="flex items-center gap-1.5 bg-[#1f1411] px-2 py-1 rounded-full text-xs text-gray-100 border border-[#fa7636]/20">
                            <img src={t.icon} alt={t.label} className="w-5 h-5 bg-white rounded p-0.5" />
                            {t.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-start md:self-center">
                      <button
                        onClick={() => setOpenIndex(globalIdx)}
                        className="bg-gold-gradient text-black px-4 py-2 rounded-full text-sm font-serif font-semibold"
                      >
                        Read More
                      </button>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-white text-black px-4 py-2 rounded-full text-sm font-serif font-semibold"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                    <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <img
              src="/images/empty-box.svg"
              alt="No projects"
              className="w-40 h-40 opacity-60 mb-6"
            />
            <p>No projects found. Try another search or reset filters.</p>
          </div>
        )}
      </FadeInEffect>

      {/* Decorative bottom borders */}
      <div className="absolute inset-x-0 bottom-0 flex justify-between opacity-20 pointer-events-none">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      {/* Modal */}
      {openIndex !== null && (
        <ProjectModal
          project={projects[openIndex]}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}

export default Projects;
