import Carousel from "./Carousel";

const education = [
  {
    logo: "/images/asulogo.jpeg",
    school: "Arizona State University",
    degree: "Bachelor of Science | Computer Science: Software Engineering",
    location: "Tempe - Arizona",
    date: "2023 - 2027",
    id: "asu",
  },
  {
    logo: "/images/wiscologo.jpg",
    school: "Wisconsin Lutheran High School",
    degree: "",
    location: "Milwaukee - Wisconsin",
    date: "2019 - 2023",
    id: "wisco",
  },
  {
    logo: "/images/tdnlogo.svg",
    school: "Tran Dai Nghia High School For The Gifted",
    degree: "",
    location: "Ho Chi Minh City - Vietnam",
    date: "2016 - 2019",
    id: "tdn",
  },
];

const experience = [
  {
    logo: "/images/movedcars.png",
    title: "Software Engineer Intern",
    company: "MoveCars.com",
    date: "Jan 2025 - Present",
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
  {
    logo: "/images/rhlogo.jpeg",
    title: "Website Developer",
    company: "RoomieHub, LLC",
    date: "May 2024 - Aug 2024",
  },
  {
    logo: "/images/ttlogo.png",
    title: "Website Developer Intern",
    company: "Thuan Thien Techonosolution Joint-Stock Company",
    date: "May 2023 - Aug 2023",
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
    location: "Tempe - Arizona",
  },
  {
    logo: "/images/asulogo.jpeg",
    title: "New American University Scholarship",
    org: "Arizona State University",
    date: "Fall 2023",
    location: "Tempe - Arizona",
  },
  {
    logo: "/images/asulogo.jpeg",
    title: "Dean's List",
    org: "Arizona State University",
    date: "Fall 2023",
    location: "Tempe - Arizona",
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

export default function Resume() {
  return (
    <section
      id="resume-section"
      className="py-24 bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402] relative overflow-hidden"
    >
      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Navigation */}
          <nav className="md:w-1/4 mb-8 md:mb-0">
            <ul className="space-y-4 sticky top-24">
              {[
                "Education",
                "Experience",
                "Leadership",
                "Skills",
                "Awards",
              ].map((label) => (
                <li key={label}>
                  <a
                    href={`#${label.toLowerCase()}`}
                    className="text-lg font-serif font-bold text-gold-gradient hover:text-[#ffb48a] transition"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content Area */}
          <div className="md:w-3/4 space-y-16">
            {/* Education */}
            <div id="education">
              <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg tracking-wide">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.school}
                    className="flex items-center gap-6 bg-[#1f1411]/90 border border-[#fa7636]/20 border-l-8 border-l-[#fa7636] rounded-2xl shadow-lg hover:shadow-[0_0_15px_#fa7636] transition-shadow p-6"
                  >
                    {/* Logo */}
                    <img
                      src={edu.logo}
                      alt={edu.school}
                      className="w-16 h-16 object-contain rounded-lg shadow-md bg-white p-1"
                    />

                    {/* Info */}
                    <div>
                      <h3
                        className="text-2xl font-serif font-bold text-gold-gradient mb-1 tracking-wide"
                        id={edu.id}
                      >
                        {edu.school}
                      </h3>
                      {edu.degree && (
                        <div className="text-[#ffb48a] font-sans text-sm mb-1 italic">
                          {edu.degree}
                        </div>
                      )}
                      <div className="text-[#fceee6] text-sm">
                        {edu.location}
                      </div>
                      <div className="text-xs text-[#d2bba8] mt-1">
                        {edu.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div id="experience">
              <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg tracking-wide">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 bg-[#1f1411]/90 border border-[#fa7636]/20 border-l-8 border-l-[#fa7636] rounded-2xl shadow-lg hover:shadow-[0_0_15px_#fa7636] transition-shadow p-6"
                  >
                    {/* Logo */}
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-16 h-16 object-contain rounded-lg shadow-md bg-white p-1"
                    />

                    {/* Info */}
                    <div>
                      <h3 className="text-xl font-serif font-bold text-gold-gradient mb-1 tracking-wide">
                        {exp.title}
                      </h3>
                      <div className="text-[#ffb48a] font-sans mb-1">
                        {exp.company}
                      </div>
                      <div className="text-sm text-[#d2bba8]">{exp.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership */}
            <div id="leadership">
  <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg tracking-wide">
    Leadership
  </h2>
  <div className="space-y-6">
    {leadership.map((lead, i) => (
      <div
        key={i}
        className="flex items-center gap-6 bg-[#1f1411]/90 border border-[#fa7636]/20 border-l-8 border-l-[#fa7636] rounded-2xl shadow-lg hover:shadow-[0_0_15px_#fa7636] transition-shadow p-6"
      >
        {/* Logo */}
        <img
          src={lead.logo}
          alt={lead.company}
          className="w-16 h-16 object-contain rounded-lg shadow-md bg-white p-1"
        />

        {/* Info */}
        <div>
          <h3 className="text-xl font-serif font-bold text-gold-gradient mb-1 tracking-wide">
            {lead.title}
          </h3>
          <div className="text-[#ffb48a] font-sans mb-1">{lead.company}</div>
          <div className="text-sm text-[#d2bba8]">{lead.date}</div>
        </div>
      </div>
    ))}
  </div>
</div>


            {/* Skills */}
            <div id="skills">
              <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg">
                Programming Languages
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 mb-8">
                {programmingLanguages.map((img) => (
                  <div
                    key={img}
                    className="flex flex-col items-center justify-center bg-[#1f1411]/90 border border-[#fa7636]/20 rounded-xl p-4 shadow-lg hover:scale-110 hover:shadow-[0_0_10px_#fa7636] transition-transform duration-300"
                  >
                    <img
                      src={`/images/skills/${img}`}
                      alt={img.replace(".png", "").replace(".svg", "")}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="mt-2 text-xs text-[#fceee6] font-sans tracking-wide">
                      {img.replace(/\.(png|svg)/, "").toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg">
                Frameworks & Libraries
              </h2>
              <Carousel />
            </div>

            {/* Awards */}
            <div id="awards">
              <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg tracking-wide">
                Awards
              </h2>
              <div className="space-y-6">
                {awards.map((award, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 bg-[#1f1411]/90 border border-[#fa7636]/20 border-l-8 border-l-[#fa7636] rounded-2xl shadow-lg hover:shadow-[0_0_15px_#fa7636] transition-shadow p-6"
                  >
                    {/* Logo */}
                    <img
                      src={award.logo}
                      alt={award.title}
                      className="w-16 h-16 object-contain rounded-lg shadow-md bg-white p-1"
                    />

                    {/* Info */}
                    <div>
                      <h3 className="text-xl font-serif font-bold text-gold-gradient mb-1 tracking-wide">
                        {award.title}
                      </h3>
                      <div className="text-[#ffb48a] font-sans mb-1">
                        {award.org}
                      </div>
                      <div className="text-sm text-[#d2bba8]">{award.date}</div>
                      {award.location && (
                        <div className="text-sm text-[#fceee6] mt-1">
                          {award.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative numbers in the background */}
      <span className="absolute left-0 bottom-0 text-[8rem] md:text-[12rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pl-4 pb-2 z-0"></span>
      <span className="absolute right-0 top-0 text-[8rem] md:text-[12rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pr-4 pt-2 z-0"></span>
    </section>
  );
}
