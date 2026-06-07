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
    <div className="w-full overflow-hidden rounded-[2rem] border border-[#fa7636]/15 bg-[#0d0604]/70 py-6">
      <div className="animate-scroll flex w-max items-stretch gap-5 px-5">
        {logos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex min-w-[10rem] shrink-0 items-center gap-4 rounded-[1.4rem] border border-[#fa7636]/18 bg-[#120905]/92 px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#fa7636]/35 hover:shadow-[0_14px_30px_rgba(250,118,54,0.12)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff6ef] p-3 shadow-md">
              <img
                src={logo.img}
                alt={logo.name}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-serif text-base font-semibold text-[#fff4ed]">{logo.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#cfa891]">Toolkit</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
