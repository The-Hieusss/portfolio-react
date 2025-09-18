import { Omega } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#0a0402] text-[#fceee6] py-10 border-t border-[#fa7636]/20">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-wrap justify-between gap-12 mb-10">
          {/* Motto */}
          <div>
            <h2 className="text-xl font-serif font-bold mb-2 text-gold-gradient tracking-wider">
              VENI, VIDI, VICI
            </h2>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-xl font-serif font-bold mb-2 text-gold-gradient">
              Links
            </h2>
            <ul className="space-y-1 font-sans">
              {["Home", "About", "Resume", "Projects", "Contact"].map((label) => (
                <li key={label}>
                  <a
                    href={`#${label.toLowerCase()}-section`}
                    className="hover:text-[#ffb48a] transition"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-serif font-bold mb-2 text-gold-gradient tracking-wide">
              DEUS EX MACHINA
            </h2>
            <ul className="space-y-1 font-sans">
              <li>
                📞{" "}
                <span className="ml-1">
                  602-214-1715
                </span>
              </li>
              <li>
                📧{" "}
                <a
                  href="mailto:hank170305@gmail.com"
                  className="hover:text-[#ffb48a] ml-1 transition"
                >
                  hieuthan1703@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <Omega className="h-24 w-24 animate-bounce" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
