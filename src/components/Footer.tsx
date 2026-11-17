import { ArrowUp } from "lucide-react";
import { navLinks, site, socialLinks } from "./data/site";
import { GreekDivider } from "./ui/section";

function Footer() {
  return (
    <footer className="relative">
      <GreekDivider label="END OF TRANSMISSION" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2.5">
            <img src="/images/favicon.svg" alt="" className="glow-ember h-7 w-7" />
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-cream">HIEU <span className="text-ember">THAN</span></span>
          </p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.3em] text-ember/80">VENI · VIDI · VICI</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-sand">
            {navLinks.map((l) => (
              <li key={l.to}>
                <a href={`#${l.to}`} className="transition hover:text-peach">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="chamfer-sm flex h-9 w-9 items-center justify-center text-peach transition hover:bg-ember hover:text-ink"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#home-section"
            aria-label="Back to top"
            className="chamfer-sm ml-2 flex h-9 w-9 items-center justify-center bg-ember text-ink transition hover:brightness-110"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
      <p className="pb-8 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
        © {new Date().getFullYear()} {site.name}. Designed and built by me.
      </p>
    </footer>
  );
}

export default Footer;
