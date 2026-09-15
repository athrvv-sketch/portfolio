import { useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/data/content";

const LinkOrnament = lazy(() =>
  import("@/three/LinkOrnament").then((m) => ({ default: m.LinkOrnament }))
);

const WORLD_EASE = [0.16, 1, 0.3, 1] as const;
const LINK_COLORS = ["#e8a33d", "#c79b5e", "#a3182a", "#e8a33d", "#c79b5e"];

export function Nav({ enable3D }: { enable3D: boolean }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 md:px-12">
        <a href="#hero" className="font-display text-lg tracking-tight text-ink">
          {SITE.name}
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-brass/30 text-ink transition-colors hover:border-brass/70"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <motion.span
              className="absolute left-0 top-0 h-[1.5px] w-5 bg-current"
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: WORLD_EASE }}
            />
            <motion.span
              className="absolute left-0 bottom-0 h-[1.5px] w-5 bg-current"
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: WORLD_EASE }}
            />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center bg-void/97 backdrop-blur-md"
            initial={{ clipPath: "circle(2% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(2% at 92% 6%)" }}
            transition={{ duration: 0.75, ease: WORLD_EASE }}
          >
            <nav className="flex flex-col items-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <div
                  key={link.href}
                  className="relative flex items-center gap-4"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {enable3D && (
                    <div className="hidden w-16 md:block">
                      {hovered === i && (
                        <Suspense fallback={null}>
                          <LinkOrnament index={i} color={LINK_COLORS[i]} />
                        </Suspense>
                      )}
                    </div>
                  )}
                  <motion.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-ink transition-colors hover:text-ember md:text-6xl"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 * i, ease: WORLD_EASE }}
                  >
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
