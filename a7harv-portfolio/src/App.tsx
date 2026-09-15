import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { WorldProvider, useWorld } from "@/lib/WorldContext";
import { useLenis } from "@/lib/useLenis";
import { useReducedMotion, useLowPower } from "@/hooks/useReducedMotion";
import { Preloader } from "@/components/Preloader";
import { Grain } from "@/components/Grain";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { FallbackBackdrop } from "@/components/FallbackBackdrop";
import { Nav } from "@/components/Nav";
import { Hero } from "@/sections/Hero";
import { Gallery } from "@/sections/Gallery";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";

const CanvasWorld = lazy(() =>
  import("@/three/CanvasWorld").then((m) => ({ default: m.CanvasWorld }))
);

function SiteBody({ use3D }: { use3D: boolean }) {
  const world = useWorld();

  const handleScroll = useCallback(
    (progress: number) => {
      world.progress.current = progress;
    },
    [world]
  );

  useLenis(use3D, handleScroll);

  useEffect(() => {
    if (use3D) return;
    // native scroll fallback keeps `progress` roughly current for anything
    // reading it, even though the 3D camera itself is not mounted
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      world.progress.current = max > 0 ? window.scrollY / max : 0;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [use3D, world]);

  return (
    <>
      {use3D ? (
        <Suspense fallback={<FallbackBackdrop />}>
          <CanvasWorld />
        </Suspense>
      ) : (
        <FallbackBackdrop />
      )}
      <CursorSpotlight enabled={use3D} />
      <Nav enable3D={use3D} />
      <main className="relative">
        <Hero />
        <Gallery />
        <About />
        <Services />
        <Testimonials />
        <Contact />
        <footer className="px-6 py-10 text-center text-xs text-muted md:px-12">
          a7harv.edits — built one edit at a time in Lucknow.
        </footer>
      </main>
    </>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const lowPower = useLowPower();
  const [loading, setLoading] = useState(true);
  const use3D = !reducedMotion && !lowPower;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <WorldProvider>
      <Preloader visible={loading} />
      <Grain />
      <SiteBody use3D={use3D} />
    </WorldProvider>
  );
}
