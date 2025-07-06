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
    { img: "/frameworks/npm.svg", name: "npm" },
    { img: "/frameworks/postgre.svg", name: "PostgreSQL" },
    { img: "/frameworks/react.svg", name: "React " },
    { img: "/frameworks/ROR.svg", name: "Ruby on Rails" },
    { img: "/frameworks/tailwindcss.svg", name: "Tailwind CSS" },
    { img: "/frameworks/vite.png", name: "Vite" },
  ];
  // Duplicate the array for seamless looping
  const logos = [...frameworks, ...frameworks];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px] ">
      <div className="" />
      <div className="overflow-x-hidden w-full py-4">
        <div className="flex gap-8 items-center flex-nowrap animate-scroll">
          {logos.map((logo, index) => (
            <div
              className="flex-col shrink-0 w-24 h-24 md:w-32 md:h-32 bg-gray-500 rounded-xl shadow-md flex items-center justify-center transition-transform hover:scale-105 hover:shadow-lg"
              key={index}
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
      {/* Tailwind custom animation keyframes (add to your tailwind.config.js if needed) */}
    </div>
  );
}

export default Carousel;
