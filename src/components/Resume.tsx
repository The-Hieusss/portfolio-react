import { useEffect, useState } from "react";

import Carousel from "./Carousel";

const education = [
  {
    logo: "/images/asulogo.jpeg",
    school: "Arizona State University",
    degree: "Bachelor of Science | Computer Science: Software Engineering",
    location: "Tempe, Arizona",
    date: "2023 - 2027",
    id: "asu",
  },
  {
    logo: "/images/wiscologo.jpg",
    school: "Wisconsin Lutheran High School",
    degree: "",
    location: "Milwaukee, Wisconsin",
    date: "2019 - 2023",
    id: "wisco",
  },
  {
    logo: "/images/tdnlogo.svg",
    school: "Tran Dai Nghia High School For The Gifted",
    degree: "",
    location: "Ho Chi Minh City, Vietnam",
    date: "2016 - 2019",
    id: "tdn",
  },
];

const experience = [
  {
    logo: "/images/rocket.jpg",
    title: "Software Engineer Intern",
    company: "Rocket",
    date: "Present",
  },
  {
    logo: "/images/movedcars.png",
    title: "Software Engineer Intern",
    company: "MoveCars.com",
    date: "Jan 2025 - May 2025",
  },
  {
    logo: "/images/viagslogo.png",
    title: "Software Engineer Intern",
    company: "Vietnam Airlines",
    date: "Jun 2024 - Aug 2024",
  },
  {
    logo: "/images/eximbank.ico",
    title: "Software Engineer Intern",
    company: "Vietnam Export Import Commercial Joint Stock Bank",
    date: "Jun 2024 - Aug 2024",
  },
];

const programmingLanguages = [
  "javascript.png",
  "csharp.png",
  "html.png",
  "css.png",
  "java.png",
  "typescript.png",
  "c++.png",
  "c.png",
  "sql.png",
  "matlab.svg",
  "python.png",
  "ruby.svg",
];

const awards = [
  {
    logo: "/images/asulogo.jpeg",
    title: "Kaplan International Scholarship",
    org: "Arizona State University",
    date: "Fall 2023",
    location: "Tempe, Arizona",
  },
  {
    logo: "/images/asulogo.jpeg",
    title: "New American University Scholarship",
    org: "Arizona State University",
    date: "Fall 2023",
    location: "Tempe, Arizona",
  },
  {
    logo: "/images/asulogo.jpeg",
    title: "Dean's List",
    org: "Arizona State University",
    date: "Fall 2023",
    location: "Tempe, Arizona",
  },
  {
    logo: "/images/CollegeBoard.png",
    title: "AP Scholar with Distinction",
    org: "College Board",
    date: "Summer 2023",
    location: "",
  },
];

const leadership = [
  {
    logo: "/images/vinasubanner.jpg",
    title: "President",
    company: "Vietnamese Student Union at ASU",
    date: "Aug 2024 - Present",
  },
];

const NAV_SECTIONS = ["education", "experience", "leadership", "skills", "awards"] as const;

function SectionHeading({ id, title, copy }: { id: string; title: string; copy: string }) {
  return (
    <div className="mb-6">
      <p className="text-sm uppercase tracking-[0.2em] text-[#ffb48a]">{id}</p>
      <h2 className="mt-2 text-3xl font-serif font-bold text-gold-gradient md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[#d8c0b1]">{copy}</p>
    </div>
  );
}

function TimelineCard({
  image,
  title,
  subtitle,
  meta,
  extra,
}: {
  image: string;
  title: string;
  subtitle: string;
  meta: string;
  extra?: string;
}) {
  return (
    <div className="relative rounded-[1.8rem] border border-[#fa7636]/18 bg-[#120905]/88 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] transition duration-300 hover:border-[#fa7636]/35 hover:bg-[#17100c]">
      <span className="absolute -left-[1.7rem] top-7 h-3.5 w-3.5 rounded-full bg-gold-gradient shadow-[0_0_18px_rgba(250,118,54,0.4)]" />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-[1.2rem] bg-white p-2 shadow-md">
          <img src={image} alt={title} className="h-14 w-14 object-contain" />
        </div>
        <div>
          <h3 className="text-xl font-serif font-bold text-[#fff4ed]">{title}</h3>
          <p className="mt-1 text-base text-[#ffb48a]">{subtitle}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.15em] text-[#caa58f]">{meta}</p>
          {extra ? <p className="mt-2 text-sm text-[#e3cdbf]">{extra}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default function Resume() {
  const [active, setActive] = useState<(typeof NAV_SECTIONS)[number]>("education");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target?.id && NAV_SECTIONS.includes(visible.target.id as (typeof NAV_SECTIONS)[number])) {
          setActive(visible.target.id as (typeof NAV_SECTIONS)[number]);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5, 0.75] },
    );

    NAV_SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="resume-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402] py-22"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between opacity-20">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>
      <div className="absolute left-0 top-0 h-2 w-full bg-gold-gradient" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_50%_at_50%_10%,rgba(250,118,54,0.08),transparent)]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-14 grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-[#ffb48a]">Resume</p>
            <h1 className="mt-4 text-4xl font-serif font-bold text-gold-gradient md:text-6xl">
              Experience, education, and the stack behind the work.
            </h1>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.7rem] border border-[#fa7636]/18 bg-[#120905]/84 p-5">
              <p className="text-3xl font-serif font-bold text-gold-gradient">3+</p>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#ffb48a]">Internships</p>
            </div>
            <div className="rounded-[1.7rem] border border-[#fa7636]/18 bg-[#120905]/84 p-5">
              <p className="text-3xl font-serif font-bold text-gold-gradient">12+</p>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#ffb48a]">Languages</p>
            </div>
            <div className="rounded-[1.7rem] border border-[#fa7636]/18 bg-[#120905]/84 p-5">
              <p className="text-3xl font-serif font-bold text-gold-gradient">2027</p>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#ffb48a]">Expected Graduation</p>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <nav className="lg:pt-2">
            <div className="sticky top-24 rounded-[2rem] border border-[#fa7636]/18 bg-[#0a0402]/55 p-4 backdrop-blur-sm">
              <p className="mb-4 px-3 text-xs uppercase tracking-[0.22em] text-[#caa58f]">Sections</p>
              <ul className="space-y-2">
                {NAV_SECTIONS.map((id) => {
                  const label = id[0].toUpperCase() + id.slice(1);
                  const isActive = active === id;

                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`flex items-center gap-3 rounded-[1rem] px-3 py-3 font-serif transition ${
                          isActive
                            ? "bg-gold-gradient text-[#0a0402] shadow-lg"
                            : "text-[#fceee6] hover:bg-[#120905]/75"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            isActive ? "bg-[#0a0402]" : "bg-[#ffb48a]"
                          }`}
                        />
                        <span className={isActive ? "font-bold" : "opacity-90"}>{label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href="/Resume.pdf"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#fa7636]/22 bg-[#120905]/75 px-4 py-3 font-serif font-semibold text-[#ffcfb4] transition hover:bg-[#1a100c]"
              >
                Open PDF Resume
              </a>
            </div>
          </nav>

          <div className="space-y-16">
            <section id="education" aria-labelledby="education-heading">
              <SectionHeading
                id="education"
                title="Education"
                copy="A technical foundation shaped across Vietnam, Wisconsin, and now Arizona State University."
              />
              <div className="relative pl-7">
                <div className="absolute left-1 top-0 bottom-0 w-px bg-[#fa7636]/28" />
                <div className="space-y-6">
                  {education.map((item) => (
                    <TimelineCard
                      key={item.school}
                      image={item.logo}
                      title={item.school}
                      subtitle={item.degree || "Academic background"}
                      meta={item.date}
                      extra={item.location}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section id="experience" aria-labelledby="experience-heading">
              <SectionHeading
                id="experience"
                title="Experience"
                copy="Internship work across fintech, aviation, automotive platforms, and product-focused software teams."
              />
              <div className="relative pl-7">
                <div className="absolute left-1 top-0 bottom-0 w-px bg-[#fa7636]/28" />
                <div className="space-y-6">
                  {experience.map((item) => (
                    <TimelineCard
                      key={`${item.company}-${item.date}`}
                      image={item.logo}
                      title={item.title}
                      subtitle={item.company}
                      meta={item.date}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section id="leadership" aria-labelledby="leadership-heading">
              <SectionHeading
                id="leadership"
                title="Leadership"
                copy="Work beyond code that sharpened communication, ownership, and community-building."
              />
              <div className="grid gap-6 md:grid-cols-2">
                {leadership.map((item) => (
                  <div
                    key={`${item.company}-${item.date}`}
                    className="group rounded-[1.8rem] border border-[#fa7636]/18 bg-[#120905]/88 p-6 transition duration-300 hover:border-[#fa7636]/35 hover:bg-[#17100c]"
                  >
                    <div className="flex items-center gap-5">
                      <div className="flex h-18 w-18 shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] bg-white">
                        <img src={item.logo} alt={item.company} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-[#fff4ed]">{item.title}</h3>
                        <p className="mt-1 text-[#ffb48a]">{item.company}</p>
                        <p className="mt-2 text-sm uppercase tracking-[0.15em] text-[#caa58f]">{item.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="skills" aria-labelledby="skills-heading">
              <SectionHeading
                id="skills"
                title="Skills"
                copy="Core languages plus the frameworks, runtimes, and backend tools I regularly work with."
              />

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {programmingLanguages.map((img) => {
                  const label = img.replace(/\.(png|svg)/, "").toUpperCase();

                  return (
                    <div
                      key={img}
                      className="flex items-center gap-4 rounded-[1.4rem] border border-[#fa7636]/18 bg-[#120905]/88 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#fa7636]/35"
                      title={label}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d0604]">
                        <img
                          src={`/images/skills/${img}`}
                          alt={label}
                          className="h-9 w-9 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-sm uppercase tracking-[0.14em] text-[#fceee6]">{label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 rounded-[2rem] border border-[#fa7636]/18 bg-[#120905]/72 p-5">
                <p className="mb-5 text-sm uppercase tracking-[0.18em] text-[#ffb48a]">Frameworks & libraries</p>
                <Carousel />
              </div>
            </section>

            <section id="awards" aria-labelledby="awards-heading">
              <SectionHeading
                id="awards"
                title="Awards"
                copy="Recognition that reflects consistency in academic performance and long-term effort."
              />
              <div className="relative pl-7">
                <div className="absolute left-1 top-0 bottom-0 w-px bg-[#fa7636]/28" />
                <div className="space-y-6">
                  {awards.map((item) => (
                    <TimelineCard
                      key={`${item.title}-${item.date}`}
                      image={item.logo}
                      title={item.title}
                      subtitle={item.org}
                      meta={item.date}
                      extra={item.location || undefined}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between opacity-20">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>
    </section>
  );
}
