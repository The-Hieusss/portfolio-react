const frameworks = [
  { img: "/frameworks/react.svg", name: "React" },
  { img: "/frameworks/reactnative.svg", name: "React Native" },
  { img: "/frameworks/node.svg", name: "Node.js" },
  { img: "/frameworks/express.svg", name: "Express" },
  { img: "/frameworks/tailwindcss.svg", name: "Tailwind CSS" },
  { img: "/frameworks/vite.png", name: "Vite" },
  { img: "/frameworks/bun.svg", name: "Bun" },
  { img: "/frameworks/supabase.svg", name: "Supabase" },
  { img: "/frameworks/postgre.svg", name: "PostgreSQL" },
  { img: "/frameworks/mysql.svg", name: "MySQL" },
  { img: "/frameworks/firebase.svg", name: "Firebase" },
  { img: "/frameworks/three.png", name: "Three.js" },
  { img: "/frameworks/gemini.png", name: "Gemini" },
  { img: "/frameworks/expo.svg", name: "Expo" },
  { img: "/frameworks/angular.svg", name: "Angular" },
  { img: "/frameworks/aspnet.svg", name: "ASP.NET" },
  { img: "/frameworks/ROR.svg", name: "Ruby on Rails" },
  { img: "/frameworks/bootstrap.png", name: "Bootstrap" },
  { img: "/frameworks/git.svg", name: "Git" },
];

function Carousel() {
  const logos = [...frameworks, ...frameworks];

  return (
    <div className="mask-fade-x group overflow-hidden" aria-label="Frameworks and tools">
      {/* Accessible static list for screen readers */}
      <ul className="sr-only">
        {frameworks.map((f) => (
          <li key={f.name}>{f.name}</li>
        ))}
      </ul>
      <div
        aria-hidden
        className="flex w-max animate-marquee gap-2.5 py-1 group-hover:[animation-play-state:paused]"
      >
        {logos.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="chamfer-sm flex shrink-0 items-center gap-2.5 bg-ember/10 px-3.5 py-2.5"
          >
            <span className="chamfer-sm flex h-7 w-7 items-center justify-center bg-white p-1">
              <img src={logo.img} alt="" className="h-full w-full object-contain" loading="lazy" />
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-cream">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
