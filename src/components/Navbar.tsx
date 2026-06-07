import {
  ArrowUpRight,
  Code,
  File,
  HomeIcon,
  Menu,
  SearchX,
  SmartphoneNfc,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

const navLinks = [
  { label: "Home", to: "home-section", icon: HomeIcon },
  { label: "About", to: "about-section", icon: SearchX },
  { label: "Resume", to: "resume-section", icon: File },
  { label: "Projects", to: "project-section", icon: Code },
  { label: "Contact", to: "contact-section", icon: SmartphoneNfc },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-7xl rounded-[1.8rem] border transition-all duration-300 ${
            scrolled
              ? "border-[#fa7636]/35 bg-[#0a0402]/88 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-[#fa7636]/18 bg-[#0a0402]/62 backdrop-blur-md"
          }`}
        >
          <div className="flex h-20 items-center justify-between px-4 md:px-6">
            <ScrollLink
              to="home-section"
              smooth
              duration={500}
              className="group flex cursor-pointer items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gold-gradient opacity-30 blur-lg transition-opacity duration-300 group-hover:opacity-55" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#fa7636]/25 bg-[#120905]/92">
                  <img
                    src="/images/favicon.svg"
                    alt="logo"
                    className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="hidden sm:block">
                <p className="font-serif text-lg font-bold tracking-[0.16em] text-gold-gradient">
                  HIEU THAN
                </p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#caa58f]">
                  Software Engineer
                </p>
              </div>
            </ScrollLink>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center rounded-full border border-[#fa7636]/16 bg-[#120905]/78 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <ScrollLink
                      key={link.to}
                      to={link.to}
                      smooth
                      duration={500}
                      offset={-90}
                      spy={true}
                      activeClass="active-nav-link"
                      className="group relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 font-serif text-sm font-semibold text-[#fceee6] transition-all duration-300 hover:text-[#ffb48a]"
                    >
                      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>{link.label}</span>
                    </ScrollLink>
                  );
                })}
              </div>

              <ScrollLink
                to="contact-section"
                smooth
                duration={500}
                offset={-90}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold-gradient px-5 py-3 font-serif text-sm font-bold text-[#0a0402] shadow-lg shadow-[#fa7636]/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-[#fa7636]/30"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </ScrollLink>
            </div>

            <button
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#fa7636]/25 bg-[#120905]/88 text-[#fa7636] transition-all duration-300 hover:border-[#fa7636]/55 hover:bg-[#1a100c] focus:outline-none focus:ring-4 focus:ring-[#fa7636]/15 lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? (
                <X className="h-5 w-5 rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {open ? (
        <div
          className="fixed inset-0 z-40 animate-fadeIn bg-[#0a0402]/82 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={`fixed right-4 top-24 bottom-4 z-40 w-[calc(100%-2rem)] max-w-sm rounded-[2rem] border border-[#fa7636]/22 bg-gradient-to-b from-[#120905] to-[#0a0402] shadow-[0_24px_90px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-[120%]"
        }`}
      >
        <div className="relative flex h-full flex-col overflow-hidden">
          <div className="border-b border-[#fa7636]/16 px-6 py-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#caa58f]">Navigation</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-gold-gradient">
              Explore the site
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-3">
              {navLinks.map((link, index) => {
                const Icon = link.icon;

                return (
                  <li
                    key={link.to}
                    className="animate-slideInRight"
                    style={{ animationDelay: `${index * 55}ms` }}
                  >
                    <ScrollLink
                      to={link.to}
                      smooth
                      duration={500}
                      offset={-90}
                      spy={true}
                      activeClass="active-mobile-nav-link"
                      className="group flex cursor-pointer items-center gap-4 rounded-[1.4rem] border border-transparent bg-[#0d0604]/55 px-5 py-4 font-serif text-lg font-semibold text-[#fceee6] transition-all duration-300 hover:border-[#fa7636]/25 hover:bg-[#17100c]"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#fa7636]/16 bg-[#120905] text-[#fa7636]">
                        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="flex-1">{link.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-[#fa7636] opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </ScrollLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-[#fa7636]/16 p-6">
            <ScrollLink
              to="contact-section"
              smooth
              duration={500}
              offset={-90}
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-4 font-serif font-bold text-[#0a0402] transition-all duration-300 hover:scale-[1.02]"
              onClick={() => setOpen(false)}
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ScrollLink>
          </div>

          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-gold-gradient opacity-6 blur-3xl" />
          <div className="pointer-events-none absolute bottom-12 left-0 h-24 w-24 rounded-full bg-[#ff9462] opacity-8 blur-3xl" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
