import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Resume from "./components/Resume";
import Projects from "./components/Projects/Projects";
import Console from "./components/Console";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Assistant from "./components/assistant/Assistant";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="relative isolate min-h-dvh font-sans text-cream">
      <div aria-hidden className="hud-grid pointer-events-none fixed inset-0 -z-10" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Resume />
        <Projects />
        <Console />
        <Contact />
      </main>
      <Footer />
      <Assistant />
      <Analytics />
    </div>
  );
}

export default App;
