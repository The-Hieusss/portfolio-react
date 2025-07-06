import { Phone, Mail, Link, Github, Linkedin, Instagram } from "lucide-react";

function Contact() {
  return (
    <section id="contact-section" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold-gradient drop-shadow-lg tracking-wider">
            Contact Me
          </h2>
          <p className="text-lg text-gray-300 font-sans max-w-2xl mx-auto">
            Feel free to reach out for collaborations, questions, or just to connect!
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {/* Phone */}
          <div className="flex-1 min-w-[220px] max-w-xs bg-black/80 rounded-3xl shadow-lg p-8 text-center text-white relative hover:shadow-yellow-400/30 transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <Phone className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-bold text-gold-gradient">Contact Number</h3>
            <p className="text-gray-200 font-sans">414-394-5060</p>
            <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
          </div>
          {/* Email */}
          <div className="flex-1 min-w-[220px] max-w-xs bg-black/80  rounded-3xl shadow-lg p-8 text-center text-white relative  hover:shadow-yellow-400/30 transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <Mail className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-bold text-gold-gradient">Email Address</h3>
            <p className="text-gray-200 font-sans">
              <a href="mailto:hank170305@gmail.com" className="underline hover:text-yellow-400 transition">hank170305@gmail.com</a>
            </p>
            <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
          </div>
          {/* Social */}
          <div className="flex-1 min-w-[220px] max-w-xs bg-black/80  rounded-3xl shadow-lg p-8 text-center text-white relative  hover:shadow-yellow-400/30 transition-transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <Link className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-bold text-gold-gradient">Social Links</h3>
            <ul className="flex justify-center gap-4 mt-2">
              <li>
                <a href="https://github.com/The-Hieusss" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-7 h-7 hover:text-yellow-400 transition" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/hieu-than-40b264290/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-7 h-7 hover:text-yellow-400 transition" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/the_hieusss/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-7 h-7 hover:text-yellow-400 transition" />
                </a>
              </li>
            </ul>
            <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
          </div>
        </div>
      </div>
      {/* Decorative large numbers in the background */}
      <span className="absolute left-0 bottom-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pl-4 pb-2 z-0">
        07
      </span>
      <span className="absolute right-0 top-0 text-[8rem] md:text-[12rem] text-yellow-900/10 font-serif font-bold select-none pointer-events-none pr-4 pt-2 z-0">
        22
      </span>
    </section>
  );
}
export default Contact;