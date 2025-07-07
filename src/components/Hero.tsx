import { Typewriter } from "react-simple-typewriter";
import { ChevronsDown } from "lucide-react";

const rotatingTexts = [
  "Coding.",
  "Software Development.",
  "Problem Solving.",
  "Machine Learning.",
];

function Hero() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
      id="intro-section"
    >
      <img
        src="/images/hero.png"
        alt="Greek Myth"
        className="absolute inset-0 w-full h-full object-cover items-center justify-center opacity-70"
        loading="lazy"
        style={{ zIndex: 0 }}
      />
      {/* Overlay for gold/black effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />
      <div className="container mx-auto flex flex-col items-center justify-center relative z-20">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-center mb-4 text-gold-gradient drop-shadow-lg tracking-wider">
          Hieu Than
        </h1>
        <h3 className="text-2xl md:text-3xl font-medium text-center text-gray-100 mb-4 font-sans">
          I like{" "}
          <span className="text-gold-gradient font-serif font-semibold">
            <Typewriter
              words={rotatingTexts}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h3>
        {/* Scroll Down Animation */}
        <div className="mt-16 flex flex-col items-center">
          <div className="animate-bounce">
            <ChevronsDown className="w-8 h-8 text-yellow-400" />
          </div>
          <span className="text-xs text-gray-400 mt-2 font-serif tracking-widest">
            Scroll Down
          </span>
        </div>
      </div>
      {/* Large decorative numbers */}
      <span className="absolute left-0 bottom-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pl-4 pb-2 z-10">
        07
      </span>
      <span className="absolute right-0 top-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pr-4 pt-2 z-10">
        22
      </span>
    </section>
  );
}

export default Hero;
