import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { navLinks, site } from "./data/site";
import { buttonStyles } from "./ui/section";
import { cn } from "@/lib/utils";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative transition-colors duration-300",
          solid ? "bg-ink/85 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <nav
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 md:h-[4.5rem]"
          aria-label="Primary"
        >
          <ScrollLink
            to="home-section"
            href="#home-section"
            smooth
            duration={500}
            className="group flex cursor-pointer items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <img
              src="/images/favicon.svg"
              alt=""
              className="glow-ember h-8 w-8 transition-transform duration-300 group-hover:rotate-[-8deg]"
            />
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-cream">
              HIEU <span className="text-ember">THAN</span>
            </span>
          </ScrollLink>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <ScrollLink
                  to={link.to}
                  href={`#${link.to}`}
                  smooth
                  spy
                  duration={500}
                  offset={-64}
                  activeClass="is-active"
                  className="nav-link relative flex cursor-pointer items-baseline px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-sand transition-colors hover:text-cream after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-ember after:shadow-[0_0_10px_rgba(250,118,54,0.9)] after:transition-transform after:duration-300"
                >
                  {link.label}
                </ScrollLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonStyles.primary, "hidden px-4 py-2.5 md:inline-flex")}
            >
              Résumé
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <button
              className={cn(buttonStyles.icon, "md:hidden")}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0">
            <ul className="mx-auto max-w-6xl space-y-1 px-5 pb-5 pt-1 sm:px-8">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <ScrollLink
                    to={link.to}
                    href={`#${link.to}`}
                    smooth
                    spy
                    duration={500}
                    offset={-64}
                    activeClass="is-active"
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className="nav-link chamfer-sm flex cursor-pointer items-center px-3 py-3 font-mono text-sm uppercase tracking-[0.14em] text-cream transition hover:bg-ember/10"
                  >
                    <span className="flex-1">{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-ember/60" />
                  </ScrollLink>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={open ? 0 : -1}
                  className={cn(buttonStyles.primary, "w-full")}
                >
                  View résumé
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* glowing ember edge */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent transition-opacity duration-300",
            solid ? "opacity-80" : "opacity-0",
          )}
        />
      </div>
    </header>
  );
}

export default Navbar;
