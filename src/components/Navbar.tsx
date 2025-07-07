import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";

const navLinks = [
  { label: "Home", to: "home-section" },
  { label: "About", to: "about-section" },
  { label: "Resume", to: "resume-section" },
  { label: "Projects", to: "project-section" },
  { label: "Contact", to: "contact-section" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full z-30 bg-gradient-to-b from-black via-gray-900 to-black bg-opacity-95 shadow-lg border-b border-yellow-400/30">
      <div className="container mx-auto flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/images/favicon.svg"
            alt="logo"
            className="h-12 drop-shadow-lg"
          />
        </div>
        <button
          className="md:hidden text-yellow-400 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? (
            <X className="h-7 w-7 transform rotate-90" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
        <ul className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <ScrollLink
                to={link.to}
                smooth
                duration={500}
                offset={-70}
                className="text-white font-serif text-lg tracking-wide px-3 py-1 rounded transition hover:text-yellow-400 hover:bg-yellow-400/10 focus:outline-none cursor-pointer"
              >
                {link.label}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-black bg-opacity-95 px-8 pb-6 pt-2 space-y-2 border-t border-yellow-400/20">
          {navLinks.map((link) => (
            <li key={link.to}>
              <ScrollLink
                to={link.to}
                smooth
                duration={500}
                offset={-70}
                className="block text-white font-serif text-lg py-2 px-2 rounded hover:text-yellow-400 hover:bg-yellow-400/10 transition cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </ScrollLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
