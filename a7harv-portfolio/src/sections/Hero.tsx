import { useEffect, useRef } from "react";
import { gsap, WORLD_EASE } from "@/lib/ease";
import { MagneticButton } from "@/components/MagneticButton";
import { GALLERY_ITEMS, SITE } from "@/data/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HEADLINE_WORDS = ["Edits", "that", "hold", "the", "beat."];

export function Hero() {
  const pillRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const descRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        pillRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: WORLD_EASE }
      );
      tl.fromTo(
        wordsRef.current,
        { opacity: 0, y: 26, fontVariationSettings: "'wght' 300" },
        {
          opacity: 1,
          y: 0,
          fontVariationSettings: "'wght' 600",
          duration: 0.9,
          stagger: 0.09,
          ease: WORLD_EASE,
        },
        "-=0.25"
      );
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: WORLD_EASE },
        "-=0.35"
      );
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-between px-6 pt-32 pb-10 md:px-12">
      <div className="max-w-3xl">
        <div
          ref={pillRef}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-brass/30 px-4 py-1.5 text-xs tracking-wide text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          Freelance video editor · Lucknow
        </div>

        <h1 className="font-display text-[13vw] leading-[0.95] text-ink sm:text-6xl md:text-7xl lg:text-8xl">
          {HEADLINE_WORDS.map((word, i) => (
            <span key={word} className="mr-4 inline-block overflow-hidden last:mr-0">
              <span
                ref={(el) => {
                  if (el) wordsRef.current[i] = el;
                }}
                className="inline-block"
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div ref={descRef} className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <p className="max-w-sm text-base text-muted">
            {SITE.legalName} cuts short-form, long-form, and brand work for creators who need it
            fast and want it to feel intentional.
          </p>
          <MagneticButton
            as="a"
            href="#gallery"
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink shadow-[0_0_30px_-10px_rgba(232,163,61,0.7)] transition-colors hover:bg-accent-bright"
          >
            See the work
          </MagneticButton>
        </div>
      </div>

      <ClipMarquee />
    </section>
  );
}

function ClipMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const loop = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

  useEffect(() => {
    if (reducedMotion) return;
    const el = trackRef.current;
    if (!el) return;
    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 34,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div ref={trackRef} className="flex w-max gap-4">
        {loop.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="glass-panel h-28 w-44 shrink-0 overflow-hidden rounded-xl md:h-36 md:w-60"
            style={{ transform: `translateY(${i % 2 === 0 ? 0 : 10}px)` }}
          >
            <img src={item.poster} alt={item.title} className="h-full w-full object-cover opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
