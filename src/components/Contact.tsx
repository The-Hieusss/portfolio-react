import { useState } from "react";
import {
  Phone,
  Mail,
  Link as LinkIcon,
  Github,
  Linkedin,
  Instagram,
  Send,
  Copy,
  Check,
} from "lucide-react";

function Contact() {
  const [copied, setCopied] = useState<null | "phone" | "email">(null);

  const copy = async (text: string, key: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  const mailto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const subject = String(form.get("subject") || "Let's connect");
    const message = String(form.get("message") || "");
    const body = encodeURIComponent(
      `Hi Hieu,\n\n${message}\n\n— ${name}${email ? ` (${email})` : ""}`
    );
    const url = `mailto:hieuthan1703@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.location.href = url;
  };

  return (
    <section
      id="contact-section"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402]"
      aria-labelledby="contact-heading"
    >
      {/* Accent + glow */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gold-gradient" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_50%_at_50%_10%,rgba(250,118,54,0.08),transparent)]" />
      {/* Greek border top */}
      <div className="absolute inset-x-0 top-0 flex justify-between opacity-20 pointer-events-none">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold-gradient drop-shadow-lg tracking-wider"
          >
            Contact Me
          </h2>
          <p className="text-lg text-[#fceee6] font-sans max-w-2xl mx-auto">
            Feel free to reach out for collaborations, questions, or just to connect!
          </p>
        </div>

        {/* Grid: Form + Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-[#120905]/80 border border-[#fa7636]/20 rounded-3xl p-6 md:p-8 shadow-xl">
            <h3 className="text-2xl font-serif font-bold text-gold-gradient mb-4">
              Send a Message
            </h3>
            <form onSubmit={mailto} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-[#d2bba8]">Your Name</span>
                  <input
                    name="name"
                    required
                    className="mt-1 w-full rounded-xl bg-[#0f0a08]/80 text-[#fceee6] border border-[#fa7636]/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                    placeholder="John Doe"
                    aria-label="Your Name"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-[#d2bba8]">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-xl bg-[#0f0a08]/80 text-[#fceee6] border border-[#fa7636]/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                    placeholder="john@example.com"
                    aria-label="Email"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm text-[#d2bba8]">Subject</span>
                <input
                  name="subject"
                  className="mt-1 w-full rounded-xl bg-[#0f0a08]/80 text-[#fceee6] border border-[#fa7636]/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                  placeholder="Let's build something"
                  aria-label="Subject"
                />
              </label>

              <label className="block">
                <span className="text-sm text-[#d2bba8]">Message</span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="mt-1 w-full rounded-2xl bg-[#0f0a08]/80 text-[#fceee6] border border-[#fa7636]/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                  placeholder="Hello Hieu, I’d like to talk about..."
                  aria-label="Message"
                />
              </label>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-black px-6 py-3 rounded-full font-serif font-bold shadow hover:bg-yellow-500 transition"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
                <span className="text-xs text-[#d2bba8]">
                  Opens your email client with a prefilled draft.
                </span>
              </div>
            </form>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="relative bg-[#120905]/90 rounded-3xl shadow-lg p-6 text-white border border-[#fa7636]/20 hover:shadow-[0_0_15px_#fa7636]/40 transition">
              <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-7 h-7 text-[#fa7636]" />
                  <h3 className="font-serif text-lg font-bold text-gold-gradient">
                    Contact Number
                  </h3>
                </div>
                <button
                  onClick={() => copy("602-214-1715", "phone")}
                  className="p-2 rounded-full bg-[#1f1411]/70 border border-[#fa7636]/20 hover:bg-[#1f1411] transition"
                  aria-label="Copy phone number"
                >
                  {copied === "phone" ? (
                    <Check className="w-4 h-4 text-[#ffb48a]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#fceee6]" />
                  )}
                </button>
              </div>
              <p className="text-[#fceee6] font-sans">602-214-1715</p>
              <div className="sr-only" aria-live="polite">
                {copied === "phone" ? "Phone number copied" : ""}
              </div>
            </div>

            {/* Email */}
            <div className="relative bg-[#120905]/90 rounded-3xl shadow-lg p-6 text-white border border-[#fa7636]/20 hover:shadow-[0_0_15px_#fa7636]/40 transition">
              <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-7 h-7 text-[#fa7636]" />
                  <h3 className="font-serif text-lg font-bold text-gold-gradient">
                    Email Address
                  </h3>
                </div>
                <button
                  onClick={() => copy("hieuthan1703@gmail.com", "email")}
                  className="p-2 rounded-full bg-[#1f1411]/70 border border-[#fa7636]/20 hover:bg-[#1f1411] transition"
                  aria-label="Copy email address"
                >
                  {copied === "email" ? (
                    <Check className="w-4 h-4 text-[#ffb48a]" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#fceee6]" />
                  )}
                </button>
              </div>
              <a
                href="mailto:hieuthan1703@gmail.com"
                className="text-[#fceee6] underline hover:text-[#ffb48a] transition break-all"
              >
                hieuthan1703@gmail.com
              </a>
              <div className="sr-only" aria-live="polite">
                {copied === "email" ? "Email copied" : ""}
              </div>
            </div>

            {/* Social */}
            <div className="relative sm:col-span-2 bg-[#120905]/90 rounded-3xl shadow-lg p-6 text-white border border-[#fa7636]/20 hover:shadow-[0_0_15px_#fa7636]/40 transition">
              <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
              <div className="flex items-center gap-3 mb-3">
                <LinkIcon className="w-7 h-7 text-[#fa7636]" />
                <h3 className="font-serif text-lg font-bold text-gold-gradient">
                  Social Links
                </h3>
              </div>
              <ul className="flex flex-wrap gap-3">
                <li>
                  <a
                    href="https://github.com/The-Hieusss"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f1411]/70 border border-[#fa7636]/20 hover:bg-[#1f1411] transition"
                  >
                    <Github className="w-5 h-5 text-[#fceee6]" />
                    <span className="text-sm text-[#fceee6]">GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/hieu-than-40b264290/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f1411]/70 border border-[#fa7636]/20 hover:bg-[#1f1411] transition"
                  >
                    <Linkedin className="w-5 h-5 text-[#fceee6]" />
                    <span className="text-sm text-[#fceee6]">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/the_hieusss/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f1411]/70 border border-[#fa7636]/20 hover:bg-[#1f1411] transition"
                  >
                    <Instagram className="w-5 h-5 text-[#fceee6]" />
                    <span className="text-sm text-[#fceee6]">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Availability */}
            <div className="relative bg-[#120905]/90 rounded-3xl shadow-lg p-6 text-white border border-[#fa7636]/20 hover:shadow-[0_0_15px_#fa7636]/40 transition">
              <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
              <h3 className="font-serif text-lg font-bold text-gold-gradient mb-2">
                Availability
              </h3>
              <p className="text-sm text-[#d2bba8]">
                Typically replies within 24 hours. Based in Tempe, AZ (MST).
              </p>
            </div>

            {/* CTA */}
            <div className="relative bg-[#120905]/90 rounded-3xl shadow-lg p-6 text-white border border-[#fa7636]/20 hover:shadow-[0_0_15px_#fa7636]/40 transition">
              <div className="absolute left-0 top-0 h-2 w-1/3 bg-gold-gradient rounded-tr-3xl" />
              <h3 className="font-serif text-lg font-bold text-gold-gradient mb-3">
                Prefer email?
              </h3>
              <a
                href="mailto:hieuthan1703@gmail.com?subject=Hello%20Hieu"
                className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-black px-5 py-2 rounded-full font-serif font-bold shadow hover:bg-yellow-500 transition"
              >
                <Mail className="w-5 h-5" />
                Start an email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Greek border bottom */}
      <div className="absolute inset-x-0 bottom-0 flex justify-between opacity-20 pointer-events-none">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      {/* Decorative numbers */}
      <span className="absolute left-0 bottom-0 text-[7rem] md:text-[10rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pl-4 pb-2" />
      <span className="absolute right-0 top-0 text-[7rem] md:text-[10rem] text-[#fa7636]/10 font-serif font-bold select-none pointer-events-none pr-4 pt-2" />
    </section>
  );
}

export default Contact;
