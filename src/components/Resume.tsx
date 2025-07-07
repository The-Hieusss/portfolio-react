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

export default function Resume() {
  return (
    <section
      id="resume-section"
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Navigation */}
          <nav className="md:w-1/4 mb-8 md:mb-0">
            <ul className="space-y-4 sticky top-24">
              <li>
                <a
                  href="#education"
                  className="text-lg font-serif font-bold text-gold-gradient hover:text-yellow-400 transition"
                >
                  Education
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-lg font-serif font-bold text-gold-gradient hover:text-yellow-400 transition"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-lg font-serif font-bold text-gold-gradient hover:text-yellow-400 transition"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#awards"
                  className="text-lg font-serif font-bold text-gold-gradient hover:text-yellow-400 transition"
                >
                  Awards
                </a>
              </li>
            </ul>
          </nav>
          {/* Content */}
          <div className="md:w-3/4 space-y-16">
            {/* Education */}
            <div id="education">
              <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg">
                Education
              </h2>
              <div className="space-y-6 ">
                {education.map((edu) => (
                  <div
                    key={edu.school}
                    className="flex items-center gap-6 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-lg p-6 border-l-8 border-yellow-400"
                  >
                    <img
                      src={edu.logo}
                      alt={edu.school}
                      className="w-16 h-16 object-contain rounded-lg shadow-md bg-white"
                    />
                    <div>
                      <h3
                        className="text-2xl font-serif font-bold text-white mb-1"
                        id={edu.id}
                      >
                        {edu.school}
                      </h3>
                      <div className="text-yellow-300 font-serif">
                        {edu.degree}
                      </div>
                      <div className="text-gray-300">{edu.location}</div>
                      <div className="text-sm text-gray-400">{edu.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Experience */}
            <div id="experience">
              <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 bg-black/80 rounded-2xl shadow-lg p-6 border-l-8 border-yellow-400"
                  >
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-16 h-16 object-contain rounded-lg shadow-md bg-white"
                    />
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white mb-1">
                        {exp.title}
                      </h3>
                      <div className="text-yellow-300 font-serif">
                        {exp.company}
                      </div>
                      <div className="text-sm text-gray-400">{exp.date}</div>
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
                    className="flex justify-center items-center bg-black/80 rounded-xl p-4 shadow-md hover:scale-110 transition"
                  >
                    <img
                      src={`/images/skills/${img}`}
                      alt={img.replace(".png", "")}
                      className="w-12 h-12 object-contain"
                    />
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
              <h2 className="text-3xl font-serif font-bold mb-6 text-gold-gradient drop-shadow-lg">
                Awards
              </h2>
              <div className="space-y-6">
                {awards.map((award, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-lg p-6 border-l-8 border-yellow-400"
                  >
                    <img
                      src={award.logo}
                      alt={award.title}
                      className="w-16 h-16 object-contain rounded-lg shadow-md bg-white"
                    />
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white mb-1">
                        {award.title}
                      </h3>
                      <div className="text-yellow-300 font-serif">
                        {award.org}
                      </div>
                      <div className="text-sm text-gray-400">{award.date}</div>
                      {award.location && (
                        <div className="text-gray-300">{award.location}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative large numbers in the background */}
      <span className="absolute left-0 bottom-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pl-4 pb-2 z-0">
        07
      </span>
      <span className="absolute right-0 top-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pr-4 pt-2 z-0">
        27
      </span>
    </section>
  );
}
