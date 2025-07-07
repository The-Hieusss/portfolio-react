import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Resume from "./components/Resume";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      <Navbar />
      <Hero />
      <About />
      <Resume />
      <Projects />
      <Contact />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
