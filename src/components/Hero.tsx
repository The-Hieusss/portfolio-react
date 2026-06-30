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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402] px-4 pt-28"
      id="home-section"
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
      <div className="container relative z-20 mx-auto flex max-w-5xl flex-col items-center justify-center text-center">
        <h1 className="mb-4 max-w-full break-words font-serif text-5xl font-bold tracking-wide text-gold-gradient drop-shadow-lg sm:text-6xl md:text-8xl md:tracking-widest">
          Hieu Than
        </h1>
        <h3 className="mb-4 max-w-full text-xl font-medium leading-tight text-[#fceee6] sm:text-2xl md:text-3xl">
          I like{" "}
          <span className="font-serif font-semibold text-gold-gradient sm:hidden">
            building software.
          </span>
          <span className="hidden max-w-full break-words font-serif font-semibold text-gold-gradient sm:inline-block">
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
        <div className="mt-12 flex flex-col items-center md:mt-16">
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
