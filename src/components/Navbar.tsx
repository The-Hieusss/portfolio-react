import { Code, File, HomeIcon, Menu, SearchX, SmartphoneNfc, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

const navLinks = [
  { label: "Home", to: "home-section", icon: <HomeIcon /> },
  { label: "About", to: "about-section", icon: <SearchX /> },
  { label: "Resume", to: "resume-section", icon: <File /> },
  { label: "Projects", to: "project-section", icon: <Code /> },
  { label: "Contact", to: "contact-section", icon: <SmartphoneNfc /> },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0402]/95 backdrop-blur-lg shadow-2xl shadow-[#fa7636]/10 border-b-2 border-[#fa7636]/40"
            : "bg-gradient-to-b from-[#0a0402]/90 to-transparent backdrop-blur-sm border-b border-[#fa7636]/20"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <ScrollLink
              to="home-section"
              smooth
              duration={500}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gold-gradient opacity-30 blur-lg rounded-full group-hover:opacity-50 transition-opacity" />
                <img
                  src="/images/favicon.svg"
                  alt="logo"
                  className="relative h-12 md:h-14 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="hidden sm:block">
              </div>
            </ScrollLink>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink
                    to={link.to}
                    smooth
                    duration={500}
                    offset={-80}
                    spy={true}
                    activeClass="active-nav-link"
                    className="group relative text-[#fceee6] font-serif text-base font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:text-[#ffb48a] cursor-pointer flex items-center gap-2"
                  >
                    <span className="text-lg group-hover:scale-125 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-gradient group-hover:w-full transition-all duration-300" />
                    </span>
                  </ScrollLink>
                </li>
              ))}
            </ul>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <ScrollLink
                to="contact-section"
                smooth
                duration={500}
                offset={-80}
                className="group bg-gold-gradient text-[#0a0402] px-6 py-3 rounded-full font-serif font-bold shadow-lg hover:shadow-[#fa7636]/40 transition-all duration-300 hover:scale-105 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Let's Talk</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </ScrollLink>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-full bg-[#1f1411]/60 border-2 border-[#fa7636]/30 hover:border-[#fa7636]/60 text-[#fa7636] hover:bg-[#2a1b15] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#fa7636]/20"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? (
                <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Decorative bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fa7636]/50 to-transparent" />
      </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#0a0402]/80 backdrop-blur-sm lg:hidden animate-fadeIn"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-20 right-0 bottom-0 z-40 w-full max-w-sm bg-gradient-to-b from-[#120905] to-[#0a0402] border-l-2 border-[#fa7636]/30 shadow-2xl lg:hidden transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto">
          {/* Decorative header */}
          <div className="p-6 border-b border-[#fa7636]/20">
            <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-[#fa7636] to-[#ffb48a] bg-clip-text text-transparent">
              Navigation
            </h2>
          </div>

          {/* Navigation Links */}
          <ul className="p-6 space-y-3">
            {navLinks.map((link, index) => (
              <li
                key={link.to}
                className="animate-slideInRight"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ScrollLink
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-80}
                  spy={true}
                  activeClass="active-mobile-nav-link"
                  className="group flex items-center gap-4 text-[#fceee6] font-serif text-lg font-semibold px-5 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-[#fa7636]/10 hover:to-transparent border-2 border-transparent hover:border-[#fa7636]/30 transition-all duration-300 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span className="flex-1">{link.label}</span>
                  <svg
                    className="w-5 h-5 text-[#fa7636] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </ScrollLink>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="p-6 border-t border-[#fa7636]/20">
            <ScrollLink
              to="contact-section"
              smooth
              duration={500}
              offset={-80}
              className="group w-full bg-gold-gradient text-[#0a0402] px-6 py-4 rounded-full font-serif font-bold shadow-lg hover:shadow-[#fa7636]/40 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              onClick={() => setOpen(false)}
            >
              <span>Let's Talk</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </ScrollLink>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-gradient opacity-5 blur-3xl rounded-full" />
          <div className="absolute bottom-20 left-0 w-24 h-24 bg-[#ff9462] opacity-5 blur-3xl rounded-full" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
