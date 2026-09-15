import { useEffect, useRef, useState } from "react";
import { GALLERY_FILTERS, GALLERY_ITEMS, type GalleryCategory, type GalleryItem } from "@/data/content";
import { Reveal } from "@/hooks/useReveal";

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal
      direction={index % 2 === 0 ? "up" : "scale"}
      distance={30 + (index % 3) * 10}
      delay={(index % 4) * 0.05}
    >
      <div
        ref={wrapperRef}
        className="group glass-panel relative aspect-[4/5] overflow-hidden rounded-2xl"
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => videoRef.current?.pause()}
      >
        <img
          src={item.poster}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {inView && (
          <video
            ref={videoRef}
            src={item.video}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: `radial-gradient(circle at 30% 20%, ${item.accent}, transparent 60%)` }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent p-5">
          <p className="text-xs uppercase tracking-wide text-muted">{item.client}</p>
          <h3 className="font-display text-lg text-ink">{item.title}</h3>
        </div>
      </div>
    </Reveal>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const items = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter);

  return (
    <section id="gallery" className="relative px-6 py-28 md:px-12">
      <Reveal direction="left">
        <h2 className="font-display text-4xl text-ink md:text-5xl">Selected cuts</h2>
      </Reveal>
      <Reveal direction="right" delay={0.1}>
        <p className="mt-3 max-w-md text-muted">
          A mix of what's shipped recently — filter by format to see how the pacing changes.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap gap-2">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              filter === f.id
                ? "border-ember bg-ember/10 text-ember"
                : "border-brass/25 text-muted hover:border-brass/60 hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
