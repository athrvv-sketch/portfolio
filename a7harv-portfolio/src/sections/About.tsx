import { Reveal } from "@/hooks/useReveal";

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-12">
      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal direction="up">
            <h2 className="font-display text-4xl text-ink md:text-5xl">The editing bay</h2>
          </Reveal>
          <Reveal direction="up" delay={0.08} className="mt-6 space-y-5 text-lg text-muted">
            <div>
              <p>
                I'm Atharv — I cut video out of a small setup in Lucknow: one low-spec laptop,
                Kdenlive, and whatever footage lands in my inbox. No studio, no team, just a lot
                of hours in the timeline.
              </p>
              <p className="mt-5">
                My editing philosophy is simple: the cut should disappear. If someone notices the
                edit before they notice the story, it's not done yet. I care about pacing that
                matches the audio, transitions that earn their place, and turnarounds that respect
                your deadline as much as mine.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal direction="scale" delay={0.15}>
          <div className="glass-panel relative aspect-square overflow-hidden rounded-2xl p-8">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted">
                <span>timeline.kdenlive</span>
                <span className="text-ember">rendering</span>
              </div>
              <div className="space-y-2">
                {[70, 45, 88, 30, 60].map((w, i) => (
                  <div key={i} className="h-2 rounded-full bg-surface-raised">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brass to-ember"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                ))}
              </div>
              <p className="font-display text-sm text-muted">
                Self-taught, no paid courses — every technique learned the slow way.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
