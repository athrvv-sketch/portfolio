import { Reveal } from "@/hooks/useReveal";
import { MagneticButton } from "@/components/MagneticButton";
import { SERVICES } from "@/data/content";

export function Services() {
  return (
    <section id="services" className="relative px-6 py-28 md:px-12">
      <Reveal direction="up">
        <h2 className="font-display text-4xl text-ink md:text-5xl">Working together</h2>
      </Reveal>
      <Reveal direction="up" delay={0.08}>
        <p className="mt-3 max-w-md text-muted">
          Three shapes that cover most projects — happy to scope something custom too.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.tier} direction={i === 1 ? "scale" : i === 0 ? "left" : "right"} delay={i * 0.08}>
            <div
              className={`glass-panel flex h-full flex-col rounded-2xl p-8 ${
                s.featured ? "border-ember/50 ring-1 ring-ember/20" : ""
              }`}
            >
              <p className="text-xs uppercase tracking-wide text-muted">{s.tier}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-3xl text-ink">{s.price}</span>
                <span className="text-sm text-muted">{s.unit}</span>
              </div>
              <p className="mt-4 text-sm text-muted">{s.description}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink/90">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ember" />
                    {f}
                  </li>
                ))}
              </ul>
              <MagneticButton
                as="a"
                href="#contact"
                className={`mt-8 w-full rounded-full px-5 py-3 text-center text-sm font-medium transition-colors ${
                  s.featured
                    ? "bg-accent text-ink hover:bg-accent-bright"
                    : "border border-brass/30 text-ink hover:border-brass/70"
                }`}
              >
                Start a conversation
              </MagneticButton>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
