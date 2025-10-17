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
      className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402]"
      aria-labelledby="projects-heading"
    >
      {/* Decorative top borders */}
      <div className="absolute inset-x-0 top-0 flex justify-between opacity-20 pointer-events-none">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      {/* Enhanced radial gold glow */}
      <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(60%_50%_at_50%_10%,rgba(250,118,54,0.12),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(40%_40%_at_20%_80%,rgba(255,180,138,0.08),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(40%_40%_at_80%_60%,rgba(250,118,54,0.06),transparent)]" />

      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gold-gradient shadow-lg shadow-[#fa7636]/20" />

      <FadeInEffect className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="mb-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-gold-gradient" />
              <svg className="w-6 h-6 text-[#fa7636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="h-px w-12 bg-gold-gradient" />
            </div>
            <h2
              id="projects-heading"
              className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-[#fa7636] via-[#ff9462] to-[#ffb48a] bg-clip-text text-transparent tracking-wide drop-shadow-2xl mb-4"
            >
              Featured Projects
            </h2>
            <p className="text-[#e6dcd2] text-lg mt-3 max-w-2xl mx-auto leading-relaxed">
              Explore my portfolio of web applications, mobile experiences, and AI experiments.
              <br className="hidden md:block" />
              <span className="text-[#ffb48a]">Filter by technology or search to discover more.</span>
            </p>
          </div>
        </header>

        {/* Sticky Controls */}
        <div className="sticky top-16 z-20 -mx-4 md:mx-0 backdrop-blur-md mb-10">
          <div className="bg-gradient-to-br from-[#120905]/90 to-[#1a0d08]/90 rounded-3xl border-2 border-[#fa7636]/30 shadow-2xl shadow-[#fa7636]/10 px-5 py-6 md:px-8 md:py-7">
            <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full max-w-xl group">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#fa7636] group-focus-within:text-[#ffb48a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  aria-label="Search projects"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-[#0f0a08]/90 text-[#fceee6] placeholder:text-[#d9c9bf]/70 pl-12 pr-4 py-3 rounded-full border-2 border-[#fa7636]/20 focus:outline-none focus:border-[#fa7636]/60 focus:ring-4 focus:ring-[#fa7636]/10 transition-all duration-300 font-sans"
                  placeholder="Search projects by title, description, or technology..."
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-[#fa7636]/20 hover:bg-[#fa7636]/40 text-[#ffb48a] transition-colors"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Chips + actions */}
              <div className="flex flex-wrap items-center gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`group relative px-5 py-2 rounded-full text-sm font-serif font-semibold transition-all duration-300 overflow-hidden
                      ${activeCategory === cat
                        ? "bg-gold-gradient text-[#0a0402] shadow-lg shadow-[#fa7636]/30 scale-105"
                        : "bg-[#1f1411]/60 text-[#fceee6] hover:bg-[#2a1b15] border border-[#fa7636]/20 hover:border-[#fa7636]/50 hover:scale-105"}`}
                    aria-pressed={activeCategory === cat}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {cat}
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                        activeCategory === cat
                          ? "bg-[#0a0402]/20 text-[#0a0402]"
                          : "bg-[#fa7636]/20 text-[#ffb48a]"
                      }`}>
                        {cat === "All" ? catCounts.All : catCounts[cat]}
                      </span>
                    </span>
                  </button>
                ))}

                <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#fa7636]/50 to-transparent mx-2 hidden lg:block" />

                {/* View toggle */}
                <div className="flex gap-2 bg-[#0f0a08]/60 p-1 rounded-full border border-[#fa7636]/20">
                  <button
                    onClick={() => setView("grid")}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif font-semibold transition-all duration-300 ${
                      view === "grid"
                        ? "bg-gold-gradient text-[#0a0402] shadow-md"
                        : "text-[#e6dcd2] hover:text-[#ffb48a]"
                    }`}
                    aria-pressed={view === "grid"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                    Grid
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif font-semibold transition-all duration-300 ${
                      view === "list"
                        ? "bg-gold-gradient text-[#0a0402] shadow-md"
                        : "text-[#e6dcd2] hover:text-[#ffb48a]"
                    }`}
                    aria-pressed={view === "list"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    List
                  </button>
                </div>

                {/* Sort */}
                <select
                  aria-label="Sort projects"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className="px-4 py-2 rounded-full text-sm font-serif font-semibold bg-[#1f1411]/60 text-[#fceee6] border border-[#fa7636]/20 hover:border-[#fa7636]/50 focus:outline-none focus:border-[#fa7636]/60 focus:ring-4 focus:ring-[#fa7636]/10 transition-all duration-300 cursor-pointer"
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
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-serif font-semibold bg-[#fceee6] text-[#0a0402] hover:bg-[#ffb48a] hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Result count */}
            <div className="mt-5 flex items-center gap-2 text-sm text-[#d9c9bf]" aria-live="polite">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-gradient animate-pulse" />
                <span className="font-semibold text-[#ffb48a]">{filtered.length}</span>
                <span>project{filtered.length === 1 ? "" : "s"} found</span>
              </div>
              {hasActiveFilter && (
                <>
                  <span className="text-[#fa7636]/50">•</span>
                  <span className="text-[#ffb48a]">Filtered results</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {filtered.length > 0 ? (
          view === "grid" ? (
            // Featured + grid
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Featured project */}
              {filtered[0] && (
                <div className="lg:col-span-7">
                  <div
                    className="relative group rounded-3xl overflow-hidden border-2 border-[#fa7636]/30 shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,118,54,0.3)] hover:scale-[1.02]"
                  >
                    {/* Featured badge */}
                    <div className="absolute top-6 right-6 z-10 flex items-center gap-2 bg-gold-gradient px-4 py-2 rounded-full shadow-lg">
                      <svg className="w-4 h-4 text-[#0a0402]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-serif font-bold text-[#0a0402]">Featured</span>
                    </div>

                    {/* Background image with overlay */}
                    <div className="relative bg-gradient-to-br from-[#1a0e09] to-[#0f0a08] p-8">
                      <img
                        src={filtered[0].modalImage}
                        alt={filtered[0].title}
                        className="w-full h-[28rem] object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0402] via-[#0a0402]/50 to-transparent opacity-90" />
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#0a0402] to-transparent">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {filtered[0].tech.slice(0, 4).map((t) => (
                          <span
                            key={t.label}
                            className="flex items-center gap-2 bg-[#1f1411]/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-[#fceee6] border border-[#fa7636]/30"
                          >
                            <img src={t.icon} alt={t.label} className="w-5 h-5 bg-white rounded p-0.5" />
                            {t.label}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-4xl font-serif font-bold bg-gradient-to-r from-[#fa7636] via-[#ff9462] to-[#ffb48a] bg-clip-text text-transparent drop-shadow-2xl mb-3">
                        {filtered[0].title}
                      </h3>
                      <p className="text-base text-[#e6dcd2] mb-5 max-w-2xl leading-relaxed">
                        {filtered[0].description}
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() =>
                            setOpenIndex(projects.findIndex((p) => p.title === filtered[0].title))
                          }
                          className="group/btn bg-gold-gradient text-[#0a0402] px-6 py-3 rounded-full font-serif font-bold shadow-lg hover:shadow-[#fa7636]/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                          <span>Learn More</span>
                          <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                        {filtered[0].demoUrl && (
                          <a
                            href={filtered[0].demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#fceee6] text-[#0a0402] px-6 py-3 rounded-full font-serif font-bold shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Decorative accents */}
                    <div className="absolute left-0 top-0 h-1.5 w-1/2 bg-gold-gradient" />
                    <div className="absolute right-0 bottom-0 h-1.5 w-1/3 bg-gold-gradient" />
                  </div>
                </div>
              )}

              {/* Other projects */}
              <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {filtered.slice(1).map((project) => {
                  const globalIdx = projects.findIndex((p) => p.title === project.title);
                  return (
                    <div
                      key={project.title}
                      className="group relative flex flex-col bg-gradient-to-br from-[#1a0e09]/90 to-[#120905]/90 border-2 border-[#fa7636]/20 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(250,118,54,0.25)] hover:border-[#fa7636]/50 transition-all duration-300 overflow-hidden"
                    >
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#fa7636]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative p-5">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-gold-gradient opacity-20 blur-lg rounded-xl group-hover:opacity-40 transition-opacity" />
                            <img
                              src={project.image}
                              alt={project.title}
                              className="relative w-20 h-20 rounded-xl object-contain bg-gradient-to-br from-white to-[#fceee6] p-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xl font-serif font-bold bg-gradient-to-r from-[#fa7636] to-[#ffb48a] bg-clip-text text-transparent mb-2">
                              {project.title}
                            </h4>
                            <p className="text-sm text-[#e6dcd2]/80 line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.slice(0, 3).map((t) => (
                            <span
                              key={t.label}
                              className="group/tech flex items-center gap-1.5 bg-[#1f1411]/60 px-3 py-1.5 rounded-full text-xs text-[#fceee6] border border-[#fa7636]/20 hover:border-[#fa7636]/50 hover:bg-[#2a1b15]/80 transition-all"
                            >
                              <img
                                src={t.icon}
                                alt={t.label}
                                className="w-4 h-4 bg-white rounded p-0.5 group-hover/tech:scale-110 transition-transform"
                              />
                              {t.label}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="flex items-center justify-center px-3 py-1.5 rounded-full text-xs text-[#ffb48a] bg-[#fa7636]/10 border border-[#fa7636]/20 font-semibold">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 pt-3 border-t border-[#fa7636]/10">
                          <button
                            onClick={() => setOpenIndex(globalIdx)}
                            className="flex-1 bg-gold-gradient text-[#0a0402] px-4 py-2 rounded-full text-sm font-serif font-bold hover:shadow-lg hover:shadow-[#fa7636]/30 transition-all duration-300 hover:scale-105"
                          >
                            Learn More
                          </button>
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center w-10 h-10 bg-[#fceee6] text-[#0a0402] rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-110"
                              title="View Demo"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Decorative accent */}
                      <div className="absolute top-0 left-0 h-1 w-1/2 bg-gold-gradient opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // List view
            <div className="mt-10 space-y-6">
              {filtered.map((project) => {
                const globalIdx = projects.findIndex((p) => p.title === project.title);
                return (
                  <div
                    key={project.title}
                    className="group relative flex flex-col md:flex-row gap-6 items-start bg-gradient-to-br from-[#1a0e09]/90 to-[#120905]/90 border-2 border-[#fa7636]/20 rounded-3xl shadow-xl hover:shadow-[0_0_35px_rgba(250,118,54,0.25)] hover:border-[#fa7636]/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fa7636]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex flex-col md:flex-row gap-6 items-start p-6 w-full">
                      {/* Image */}
                      <div className="relative flex-shrink-0 mx-auto md:mx-0">
                        <div className="absolute inset-0 bg-gold-gradient opacity-20 blur-2xl rounded-2xl group-hover:opacity-40 transition-opacity" />
                        <img
                          src={project.modalImage || project.image}
                          alt={project.title}
                          className="relative w-48 h-36 md:w-56 md:h-40 object-contain rounded-2xl bg-gradient-to-br from-white to-[#fceee6] p-4 shadow-lg group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-3xl font-serif font-bold bg-gradient-to-r from-[#fa7636] via-[#ff9462] to-[#ffb48a] bg-clip-text text-transparent mb-3">
                          {project.title}
                        </h3>
                        <p className="text-base text-[#e6dcd2]/90 leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {project.tech.slice(0, 8).map((t) => (
                            <span
                              key={t.label}
                              className="group/tech flex items-center gap-2 bg-[#1f1411]/60 px-3 py-2 rounded-full text-sm text-[#fceee6] border border-[#fa7636]/20 hover:border-[#fa7636]/50 hover:bg-[#2a1b15]/80 transition-all"
                            >
                              <img
                                src={t.icon}
                                alt={t.label}
                                className="w-5 h-5 bg-white rounded p-0.5 group-hover/tech:scale-110 transition-transform"
                              />
                              {t.label}
                            </span>
                          ))}
                          {project.tech.length > 8 && (
                            <span className="flex items-center justify-center px-3 py-2 rounded-full text-sm text-[#ffb48a] bg-[#fa7636]/10 border border-[#fa7636]/20 font-semibold">
                              +{project.tech.length - 8} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex md:flex-col gap-3 self-stretch md:self-start justify-center md:justify-start w-full md:w-auto">
                        <button
                          onClick={() => setOpenIndex(globalIdx)}
                          className="flex-1 md:flex-initial bg-gold-gradient text-[#0a0402] px-6 py-3 rounded-full text-sm font-serif font-bold shadow-lg hover:shadow-[#fa7636]/30 transition-all duration-300 hover:scale-105 whitespace-nowrap"
                        >
                          Learn More
                        </button>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 md:flex-initial bg-[#fceee6] text-[#0a0402] px-6 py-3 rounded-full text-sm font-serif font-bold shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 text-center whitespace-nowrap"
                          >
                            View Demo
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Decorative accents */}
                    <div className="absolute top-0 left-0 h-1.5 w-1/2 bg-gold-gradient opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 h-1.5 w-1/3 bg-gold-gradient opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gold-gradient opacity-10 blur-3xl rounded-full" />
              <div className="relative w-48 h-48 mx-auto bg-gradient-to-br from-[#1a0e09] to-[#120905] rounded-full border-2 border-[#fa7636]/20 flex items-center justify-center">
                <svg className="w-24 h-24 text-[#fa7636]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#ffb48a] mb-3">No Projects Found</h3>
            <p className="text-[#d9c9bf] text-lg mb-6 max-w-md">
              We couldn't find any projects matching your criteria. Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
                setSort("featured");
              }}
              className="bg-gold-gradient text-[#0a0402] px-8 py-3 rounded-full font-serif font-bold shadow-lg hover:shadow-[#fa7636]/30 transition-all duration-300 hover:scale-105"
            >
              Reset Filters
            </button>
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
