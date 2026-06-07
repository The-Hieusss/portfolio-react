const focusAreas = [
  "Full-stack web products",
  "Mobile-first experiences",
  "Applied AI workflows",
  "Interface systems that feel deliberate",
];

const highlights = [
  {
    value: "3+",
    label: "Internships",
    detail: "Across engineering, product thinking, and execution-heavy teams.",
  },
  {
    value: "15+",
    label: "Projects",
    detail: "Shipped across web apps, experiments, and portfolio-grade builds.",
  },
  {
    value: "ASU",
    label: "Software Engineering",
    detail: "Grounding product intuition with formal technical training.",
  },
];

function About() {
  return (
    <section
      id="about-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0402] via-[#120905] to-[#0a0402] py-24"
      aria-labelledby="about-heading"
    >
      <div className="absolute left-0 top-0 h-2 w-full bg-gold-gradient" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_45%_at_50%_8%,rgba(250,118,54,0.10),transparent)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between opacity-20">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      <div className="pointer-events-none absolute bottom-10 left-0 h-56 w-56 rounded-full bg-[#fa7636]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-[#ffb48a]/8 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.26em] text-[#ffb48a]">About Me</p>
          <h2
            id="about-heading"
            className="mt-4 text-4xl font-serif font-bold text-gold-gradient md:text-6xl"
          >
            I like building things that feel clear, useful, and intentional.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#e6d3c6] md:text-xl">
            I’m Hieu Than, a software engineer at Arizona State University focused on turning ideas
            into products with strong UX and solid technical foundations.
          </p>
        </div>

        <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.3rem] bg-gold-gradient opacity-10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.3rem] border border-[#fa7636]/24 bg-[#120905]/88 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
              <div className="absolute left-0 top-0 h-1.5 w-40 rounded-br-3xl bg-gold-gradient" />
              <img
                src="/images/profile1.jpg"
                alt="Portrait of Hieu Than"
                className="h-[24rem] w-full object-cover md:h-[32rem]"
                loading="lazy"
              />

            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-[#fa7636]/20 bg-[#120905]/84 p-6 md:p-8">
              <p className="text-xl leading-8 text-[#f6e8df]">
                My work sits between <span className="font-serif text-gold-gradient">design sensitivity</span> and{" "}
                <span className="font-serif text-gold-gradient">engineering discipline</span>. I care about
                how software looks, how it behaves, and whether it actually helps someone do something
                better.
              </p>
              <p className="mt-5 text-lg leading-8 text-[#d9c0b1]">
                I’ve built across web, mobile, and AI-oriented projects, and I’m especially drawn to
                products that need both thoughtful interaction design and dependable implementation.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {focusAreas.map((area, index) => (
                <div
                  key={area}
                  className="group rounded-[1.6rem] border border-[#fa7636]/18 bg-[#0f0705]/78 p-5 transition duration-300 hover:border-[#fa7636]/35 hover:bg-[#140a07]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#fa7636]/20 bg-[#1a100c] font-serif text-sm font-bold text-[#ffb48a]">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-serif font-semibold text-[#fff4ed]">{area}</p>
                      <p className="mt-2 text-sm leading-6 text-[#cba58f]">
                        Work I naturally keep returning to because it rewards both precision and taste.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.7rem] border border-[#fa7636]/18 bg-[#120905]/84 p-5"
                >
                  <p className="text-3xl font-serif font-bold text-gold-gradient">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#ffb48a]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#cfaf9b]">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/Resume.pdf"
                className="inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-3 font-serif font-bold text-[#0a0402] shadow-lg transition hover:scale-[1.02]"
              >
                View Resume
              </a>
              <a
                href="#contact-section"
                className="inline-flex items-center justify-center rounded-full border border-[#fa7636]/30 bg-[#120905]/80 px-6 py-3 text-[#fceee6] transition hover:bg-[#1a100c]"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between opacity-20">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      <span className="pointer-events-none absolute bottom-0 left-0 select-none pl-3 pb-2 font-serif text-[7rem] font-bold text-[#fa7636]/10 md:text-[10rem]">
        03
      </span>
      <span className="pointer-events-none absolute right-0 top-0 select-none pr-3 pt-2 font-serif text-[7rem] font-bold text-[#fa7636]/10 md:text-[10rem]">
        17
      </span>
    </section>
  );
}

export default About;
