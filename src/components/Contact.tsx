import { useState } from "react";
import type { FormEvent } from "react";
import { Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import FadeInEffect from "./ui/fadein";
import { buttonStyles, HudCorners, Panel, Section, SectionHeader } from "./ui/section";
import { site, socialLinks } from "./data/site";
import { cn } from "@/lib/utils";

const fieldClass =
  "chamfer-sm mt-2 w-full border-b-2 border-ember/30 bg-ink/70 px-4 py-3 text-cream placeholder:text-dim outline-none transition focus:border-ember focus:bg-ember/[0.06]";

function Contact() {
  const [copied, setCopied] = useState<null | "phone" | "email">(null);

  const copy = async (text: string, key: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const mailto = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const subject = String(form.get("subject") || "Let's connect");
    const message = String(form.get("message") || "");
    const body = encodeURIComponent(`Hi Hieu,\n\n${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const methods = [
    { key: "email" as const, icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { key: "phone" as const, icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/-/g, "")}` },
  ];

  return (
    <Section id="contact-section" labelledBy="contact-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(250,118,54,0.2),transparent)]"
      />
      <FadeInEffect>
        <SectionHeader
          id="contact-heading"
          eyebrow="Contact"
          title={
            <>
              Want to build something? <span className="text-gold-gradient">Let&apos;s talk.</span>
            </>
          }
          description="I'm open to internships, new-grad roles and interesting collaborations. I usually reply within a day."
        />
      </FadeInEffect>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeInEffect className="space-y-3">
          {methods.map(({ key, icon: Icon, label, value, href }) => (
            <Panel key={key} interactive innerClassName="flex items-center gap-4 p-4">
              <span className="chamfer-sm flex h-11 w-11 shrink-0 items-center justify-center bg-ember text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">{label}</p>
                <a href={href} className="mt-0.5 block truncate font-medium text-cream transition hover:text-peach">
                  {value}
                </a>
              </div>
              <button
                type="button"
                onClick={() => copy(value, key)}
                className={buttonStyles.icon}
                aria-label={`Copy ${label.toLowerCase()}`}
              >
                {copied === key ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied === key ? `${label} copied` : ""}
              </span>
            </Panel>
          ))}

          <Panel innerClassName="flex items-center gap-4 p-4">
            <span className="chamfer-sm flex h-11 w-11 shrink-0 items-center justify-center bg-ember text-ink">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">Based in</p>
              <p className="mt-0.5 font-medium text-cream">{site.location}</p>
            </div>
          </Panel>

          <div className="flex flex-wrap gap-2 pt-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonStyles.secondary, "py-2.5")}
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </FadeInEffect>

        <FadeInEffect delay={0.1}>
          <Panel className="relative" innerClassName="relative p-6 sm:p-8">
          <HudCorners size="h-4 w-4" className="m-2" />
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ember">// Transmit message</p>
          <form onSubmit={mailto}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-peach">
                Name
                <input name="name" required autoComplete="name" className={fieldClass} placeholder="Jane Doe" />
              </label>
              <label className="block font-mono text-[11px] uppercase tracking-[0.16em] text-peach">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={fieldClass}
                  placeholder="jane@example.com"
                />
              </label>
            </div>
            <label className="mt-5 block font-mono text-[11px] uppercase tracking-[0.16em] text-peach">
              Subject
              <input name="subject" className={fieldClass} placeholder="Let's build something" />
            </label>
            <label className="mt-5 block font-mono text-[11px] uppercase tracking-[0.16em] text-peach">
              Message
              <textarea
                name="message"
                rows={5}
                required
                className={`${fieldClass} resize-y`}
                placeholder="Hi Hieu, I'd like to talk about…"
              />
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className={buttonStyles.primary}>
                <Send className="h-4 w-4" />
                Send message
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">Opens your email app, prefilled.</p>
            </div>
          </form>
          </Panel>
        </FadeInEffect>
      </div>
    </Section>
  );
}

export default Contact;
