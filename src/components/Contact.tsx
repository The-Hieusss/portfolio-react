import { useState } from "react";
import {
  Check,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/The-Hieusss",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hieu-than-40b264290/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/the_hieusss/",
    icon: Instagram,
  },
];

function Contact() {
  const [copied, setCopied] = useState<null | "phone" | "email">(null);

  const copy = async (text: string, key: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1500);
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
      `Hi Hieu,\n\n${message}\n\n— ${name}${email ? ` (${email})` : ""}`,
    );
    const url = `mailto:hieuthan1703@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = url;
  };

  return (
    <section
      id="contact-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0402] via-[#1a0d08] to-[#0a0402] py-16 md:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="absolute left-0 top-0 h-2 w-full bg-gold-gradient" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_50%_at_50%_10%,rgba(250,118,54,0.08),transparent)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between opacity-20">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#fa7636]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-12 h-64 w-64 rounded-full bg-[#ffb48a]/8 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-14 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.26em] text-[#ffb48a]">Contact</p>
          <h2
            id="contact-heading"
            className="mt-4 text-3xl font-serif font-bold leading-tight text-gold-gradient sm:text-4xl md:text-6xl"
          >
            If you want to build something strong, let’s talk.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#e5d1c4] md:text-xl md:leading-8">
            I’m open to internships, collaborations, and interesting technical conversations.
            The fastest way in is email, but pick whatever channel is easiest.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[#fa7636]/20 bg-[#120905]/88 p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-[#ffb48a]">Direct details</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start justify-between gap-3 rounded-[1.4rem] border border-[#fa7636]/15 bg-[#0d0604]/75 p-4">
                  <div className="flex min-w-0 gap-3 sm:gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1411] text-[#fa7636]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#caa58f]">Phone</p>
                      <p className="mt-1 text-base text-[#fff4ed] sm:text-lg">602-214-1715</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copy("602-214-1715", "phone")}
                    className="rounded-full border border-[#fa7636]/20 bg-[#1a100c] p-3 text-[#fceee6] transition hover:border-[#fa7636]/40"
                    aria-label="Copy phone number"
                  >
                    {copied === "phone" ? <Check className="h-4 w-4 text-[#ffb48a]" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-start justify-between gap-3 rounded-[1.4rem] border border-[#fa7636]/15 bg-[#0d0604]/75 p-4">
                  <div className="flex min-w-0 gap-3 sm:gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1411] text-[#fa7636]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#caa58f]">Email</p>
                      <a
                        href="mailto:hieuthan1703@gmail.com"
                        className="mt-1 block break-all text-lg text-[#fff4ed] transition hover:text-[#ffb48a]"
                      >
                        hieuthan1703@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copy("hieuthan1703@gmail.com", "email")}
                    className="rounded-full border border-[#fa7636]/20 bg-[#1a100c] p-3 text-[#fceee6] transition hover:border-[#fa7636]/40"
                    aria-label="Copy email address"
                  >
                    {copied === "email" ? <Check className="h-4 w-4 text-[#ffb48a]" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <div className="rounded-[1.4rem] border border-[#fa7636]/15 bg-[#0d0604]/75 p-4">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f1411] text-[#fa7636]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#caa58f]">Location</p>
                      <p className="mt-1 text-lg text-[#fff4ed]">Tempe, Arizona</p>
                      <p className="mt-1 text-sm text-[#caa58f]">Typically replies within 24 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#fa7636]/20 bg-[#120905]/88 p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.22em] text-[#ffb48a]">Find me elsewhere</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#fa7636]/20 bg-[#0d0604]/75 px-4 py-3 text-[#fceee6] transition hover:border-[#fa7636]/40 hover:bg-[#1a100c]"
                    >
                      <Icon className="h-4 w-4 text-[#fa7636]" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-[#fa7636]/20 bg-[#120905]/88 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.3)] md:p-8">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.22em] text-[#ffb48a]">Send a message</p>
              <p className="mt-3 text-lg leading-8 text-[#dcc2b3]">
                This opens your mail client with a prefilled draft so reaching out stays simple.
              </p>
            </div>

            <form onSubmit={mailto} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm uppercase tracking-[0.16em] text-[#caa58f]">Name</span>
                  <input
                    name="name"
                    required
                    className="mt-2 h-12 w-full rounded-2xl border border-[#fa7636]/18 bg-[#0d0604]/88 px-4 text-[#fff4ed] outline-none transition focus:border-[#fa7636]/45"
                    placeholder="John Doe"
                    aria-label="Your Name"
                  />
                </label>
                <label className="block">
                  <span className="text-sm uppercase tracking-[0.16em] text-[#caa58f]">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 h-12 w-full rounded-2xl border border-[#fa7636]/18 bg-[#0d0604]/88 px-4 text-[#fff4ed] outline-none transition focus:border-[#fa7636]/45"
                    placeholder="john@example.com"
                    aria-label="Email"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm uppercase tracking-[0.16em] text-[#caa58f]">Subject</span>
                <input
                  name="subject"
                  className="mt-2 h-12 w-full rounded-2xl border border-[#fa7636]/18 bg-[#0d0604]/88 px-4 text-[#fff4ed] outline-none transition focus:border-[#fa7636]/45"
                  placeholder="Let's build something"
                  aria-label="Subject"
                />
              </label>

              <label className="block">
                <span className="text-sm uppercase tracking-[0.16em] text-[#caa58f]">Message</span>
                <textarea
                  name="message"
                  rows={7}
                  required
                  className="mt-2 w-full rounded-[1.6rem] border border-[#fa7636]/18 bg-[#0d0604]/88 px-4 py-3 text-[#fff4ed] outline-none transition focus:border-[#fa7636]/45"
                  placeholder="Hello Hieu, I’d like to talk about..."
                  aria-label="Message"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3 font-serif font-bold text-[#0a0402] shadow-lg transition hover:scale-[1.02]"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
                <a
                  href="mailto:hieuthan1703@gmail.com?subject=Hello%20Hieu"
                  className="text-sm text-[#d5b6a3] transition hover:text-[#ffb48a]"
                >
                  Prefer direct email instead?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between opacity-20">
        <img src="/images/greek-border.svg" alt="" className="h-12" />
        <img src="/images/greek-border.svg" alt="" className="h-12 rotate-180" />
      </div>
    </section>
  );
}

export default Contact;
