function About() {
  return (
    <section
      id="about-section"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-[#0a0402] via-[#120905] to-[#0a0402]"
      aria-labelledby="about-heading"
    >
      {/* Top accent bar + subtle radial glow */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_50%_at_50%_10%,rgba(250,118,54,0.08),transparent)]" />

      {/* Greek borders (top) */}
      <div className="absolute inset-x-0 top-0 flex justify-between opacity-20 pointer-events-none">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Profile */}
          <div className="flex justify-center md:justify-start order-1 md:order-none">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Glow behind */}
              <div className="absolute -inset-4 rounded-[14%] blur-2xl opacity-30 bg-gold-gradient" />
              {/* Framed card */}
              <div className="relative w-full h-full rounded-[10%] overflow-hidden border border-[#fa7636]/30 bg-[#120905]/90 shadow-2xl">
                {/* Decorative thin top strip */}
                <div className="absolute left-0 top-0 h-1 w-1/3 bg-gold-gradient rounded-br-2xl" />
                {/* Image */}
                <img
                  src="/images/IMG_1649.PNG"
                  alt="Profile"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                {/* Name tag */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="inline-block rounded-full px-4 py-1 bg-[#1f1411]/80 border border-[#fa7636]/30">
                    <span className="font-serif text-sm tracking-wide text-gold-gradient">
                      
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy + CTAs */}
          <div>
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-serif font-bold mb-3 text-gold-gradient drop-shadow-lg"
            >
              About Me
            </h2>
            <div className="h-1 w-20 bg-gold-gradient rounded-full mb-6" />
            <p className="text-base md:text-lg text-[#fceee6] leading-relaxed">
              Hi, I&apos;m{" "}
              <span className="text-gold-gradient font-serif font-semibold">
                Huey Than
              </span>
              —a learner, leader, and software engineer. I study at{" "}
              <span className="text-[#ffb48a] font-serif font-semibold">
                Arizona State University
              </span>{" "}
              and build products that blend elegant UX with solid engineering. My interests span
              full‑stack web, mobile, and AI-assisted experiences.
            </p>
            <p className="text-base md:text-lg text-[#fceee6] leading-relaxed mt-4">
              My goal is to use technology to create access and opportunity for people who need it most.
            </p>

            {/* Quick stats */}
            <ul className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
              <li className="rounded-2xl bg-[#1f1411]/80 border border-[#fa7636]/20 p-4 text-center">
                <div className="text-2xl font-serif font-bold text-gold-gradient">3+</div>
                <div className="text-xs text-[#d2bba8]">Internships</div>
              </li>
              <li className="rounded-2xl bg-[#1f1411]/80 border border-[#fa7636]/20 p-4 text-center">
                <div className="text-2xl font-serif font-bold text-gold-gradient">15+</div>
                <div className="text-xs text-[#d2bba8]">Projects</div>
              </li>
              <li className="rounded-2xl bg-[#1f1411]/80 border border-[#fa7636]/20 p-4 text-center">
                <div className="text-2xl font-serif font-bold text-gold-gradient">ASU</div>
                <div className="text-xs text-[#d2bba8]">Software Eng.</div>
              </li>
            </ul>

            {/* Skill chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js", "TailwindCSS", "PostgreSQL", "Python"].map((s) => (
                <span
                  key={s}
                  className="text-xs sm:text-sm bg-[#120905]/80 text-[#fceee6] border border-[#fa7636]/20 rounded-full px-3 py-1"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/Resume.pdf"
                className="inline-flex items-center justify-center bg-gold-gradient text-[#0a0402] px-6 py-3 rounded-full font-serif font-bold shadow hover:bg-yellow-500 transition"
              >
                View & Download Resume
              </a>
              <a
                href="#contact-section"
                className="inline-flex items-center justify-center bg-[#120905]/80 text-[#fceee6] px-6 py-3 rounded-full border border-[#fa7636]/30 hover:bg-[#1f1411] transition"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Greek borders (bottom) */}
      <div className="absolute inset-x-0 bottom-0 flex justify-between opacity-20 pointer-events-none">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      {/* Corner numerals */}
      <span className="absolute left-0 bottom-0 text-[7rem] md:text-[10rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pl-3 pb-2">
        03
      </span>
      <span className="absolute right-0 top-0 text-[7rem] md:text-[10rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pr-3 pt-2">
        17
      </span>
    </section>
  );
}

export default About;
