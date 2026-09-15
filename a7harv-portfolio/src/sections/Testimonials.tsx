import { Reveal } from "@/hooks/useReveal";
import { TESTIMONIALS } from "@/data/content";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative px-6 py-28 md:px-12">
      <Reveal direction="up">
        <h2 className="font-display text-4xl text-ink md:text-5xl">What clients say</h2>
      </Reveal>

      <div className="mt-12 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} direction="up" delay={i * 0.06} className="shrink-0">
            <figure className="glass-panel w-[300px] rounded-2xl p-7 sm:w-[360px]">
              <blockquote className="font-display text-lg leading-snug text-ink">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted">— {t.name}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
