const frameworks = [
  { img: "/frameworks/aspnet.svg", name: "ASP.NET" },
  { img: "/frameworks/bootstrap.png", name: "Bootstrap" },
  { img: "/frameworks/bun.svg", name: "Bun" },
  { img: "/frameworks/expo.svg", name: "Expo" },
  { img: "/frameworks/express.svg", name: "Express.js" },
  { img: "/frameworks/git.svg", name: "Git" },
  { img: "/frameworks/mysql.svg", name: "MySQL" },
  { img: "/frameworks/node.svg", name: "Node.js" },
  { img: "/frameworks/postgre.svg", name: "PostgreSQL" },
  { img: "/frameworks/react.svg", name: "React" },
  { img: "/frameworks/ROR.svg", name: "Ruby on Rails" },
  { img: "/frameworks/tailwindcss.svg", name: "Tailwind CSS" },
  { img: "/frameworks/vite.png", name: "Vite" },
  { img: "/frameworks/supabase.svg", name: "Supabase" },
  { img: "/frameworks/firebase.svg", name: "Firebase" },
];

function Carousel() {
  const logos = [...frameworks, ...frameworks];

  return (
    <div className="max-w-full overflow-hidden rounded-[1.5rem] border border-[#fa7636]/15 bg-[#0d0604]/70 py-4 sm:rounded-[2rem] sm:py-6">
      <div className="animate-scroll flex w-max max-w-none items-stretch gap-3 px-3 sm:gap-5 sm:px-5">
        {logos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex min-w-36 shrink-0 items-center gap-3 rounded-[1.2rem] border border-[#fa7636]/18 bg-[#120905]/92 px-3 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#fa7636]/35 hover:shadow-[0_14px_30px_rgba(250,118,54,0.12)] sm:min-w-[10rem] sm:gap-4 sm:rounded-[1.4rem] sm:px-4 sm:py-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff6ef] p-2.5 shadow-md sm:h-14 sm:w-14 sm:p-3">
              <img
                src={logo.img}
                alt={logo.name}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-[#fff4ed] sm:text-base">{logo.name}</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#cfa891] sm:text-xs sm:tracking-[0.18em]">Toolkit</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
