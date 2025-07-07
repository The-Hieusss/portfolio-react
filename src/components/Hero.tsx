import { Typewriter } from "react-simple-typewriter";
import { ChevronsDown } from "lucide-react";
import FadeInEffect from "./ui/fadein";

const rotatingTexts = [
  "Coding.",
  "Software Development.",
  "Problem Solving.",
  "Machine Learning.",
];

function Hero() {
  return (
    <FadeInEffect
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402] overflow-hidden"
      id="intro-section"
    >
      {/* Background image */}
      <img
        src="/images/hero.png"
        alt="Greek Myth"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        loading="lazy"
        style={{ zIndex: 0 }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0402]/80 via-transparent to-[#0a0402]/80 z-10" />

      {/* Hero Content */}
      <div className="container mx-auto flex flex-col items-center justify-center relative z-20 text-center">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-gold-gradient drop-shadow-lg tracking-widest mb-4">
          Hieu Than
        </h1>
        <h3 className="text-2xl md:text-3xl font-medium text-[#fceee6] mb-4 font-sans">
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

        {/* Scroll Down Icon */}
        <div className="mt-16 flex flex-col items-center">
          <div className="animate-bounce">
            <ChevronsDown className="w-8 h-8 text-[#fa7636]" />
          </div>
          <span className="text-xs text-[#d2bba8] mt-2 font-serif tracking-widest">
            Scroll Down
          </span>
        </div>
      </div>

      {/* Decorative Numbers */}
      <span className="absolute left-0 bottom-0 text-[8rem] md:text-[12rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pl-4 pb-2 z-10">
      </span>
      <span className="absolute right-0 top-0 text-[8rem] md:text-[12rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pr-4 pt-2 z-10">
      </span>
    </FadeInEffect>
  );
}

export default Hero;
