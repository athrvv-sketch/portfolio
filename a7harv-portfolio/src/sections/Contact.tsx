import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Reveal } from "@/hooks/useReveal";
import { MagneticButton } from "@/components/MagneticButton";
import { SITE } from "@/data/content";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const whatsappHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      await fetch(SITE.formspreeAction, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-28 md:px-12">
      <Reveal direction="up">
        <h2 className="font-display text-4xl text-ink md:text-5xl">Let's cut something</h2>
      </Reveal>
      <Reveal direction="up" delay={0.08}>
        <p className="mt-3 max-w-md text-muted">
          Fastest way to reach me is WhatsApp or Instagram — the form works too if you'd rather
          write it out.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal direction="left" delay={0.1}>
          <div className="flex flex-col gap-4 sm:flex-row">
            <MagneticButton
              as="a"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium text-ink hover:bg-accent-bright"
            >
              <MessageCircle size={18} /> WhatsApp
            </MagneticButton>
            <MagneticButton
              as="a"
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brass/30 px-6 py-4 text-sm font-medium text-ink hover:border-brass/70"
            >
              <InstagramIcon /> @{SITE.instagram}
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.15}>
          <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-3 rounded-2xl p-6">
            <input
              name="name"
              placeholder="Your name"
              required
              className="rounded-lg border border-brass/20 bg-transparent px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-ember focus:outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="rounded-lg border border-brass/20 bg-transparent px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-ember focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="What are you working on?"
              rows={3}
              required
              className="rounded-lg border border-brass/20 bg-transparent px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-ember focus:outline-none"
            />
            <button
              type="submit"
              disabled={status !== "idle"}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-surface-raised px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent disabled:opacity-60"
            >
              <Send size={16} />
              {status === "sending" ? "Sending…" : status === "sent" ? "Sent — thanks!" : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
