function Carousel() {
  const frameworks = [
    { img: "/frameworks/aspnet.svg", name: "ASP.NET" },
    { img: "/frameworks/bootstrap.png", name: "Bootstrap" },
    { img: "/frameworks/bun.svg", name: "Bun" },
    { img: "/frameworks/expo.svg", name: "Expo" },
    { img: "/frameworks/express.svg", name: "Express.js" },
    { img: "/frameworks/git.svg", name: "Git" },
    { img: "/frameworks/mysql.svg", name: "MySQL" },
    { img: "/frameworks/node.svg", name: "Node.js " },
    { img: "/frameworks/postgre.svg", name: "PostgreSQL" },
    { img: "/frameworks/react.svg", name: "React " },
    { img: "/frameworks/ROR.svg", name: "Ruby on Rails" },
    { img: "/frameworks/tailwindcss.svg", name: "Tailwind CSS" },
    { img: "/frameworks/vite.png", name: "Vite" },
    { img: "/frameworks/supabase.svg", name: "Supabase" },
    { img: "/frameworks/firebase.svg", name: "Firebase" },
  ];

  const logos = [...frameworks, ...frameworks]; // seamless loop

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px]">
      <div className="overflow-x-hidden w-full py-4">
        <div className="flex gap-8 items-center flex-nowrap animate-scroll">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col shrink-0 w-24 h-24 md:w-32 md:h-32 bg-[#1f1411]/90 border border-[#fa7636]/20 rounded-xl shadow-lg items-center justify-center transition-transform hover:scale-105 hover:shadow-[0_0_10px_#fa7636] duration-300"
            >
              <img
                src={logo.img}
                alt={logo.name}
                className="object-contain w-4/5 h-4/5"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
