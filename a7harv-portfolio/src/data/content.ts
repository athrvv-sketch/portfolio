export const SITE = {
  name: "a7harv.edits",
  legalName: "Atharv",
  tagline: "Frame by frame, on time.",
  whatsappNumber: "918957178266",
  whatsappMessage: "Hi! I found your portfolio and want to talk about an edit —",
  instagram: "a7harv.edits",
  instagramUrl: "https://instagram.com/a7harv.edits",
  formspreeAction: "https://formspree.io/f/your-form-id", // swap for the real endpoint
};

export type GalleryCategory =
  | "short-form"
  | "long-form"
  | "motion-graphics"
  | "brand"
  | "gaming";

export const GALLERY_FILTERS: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "short-form", label: "Short-form reels" },
  { id: "long-form", label: "Long-form" },
  { id: "motion-graphics", label: "Motion graphics" },
  { id: "brand", label: "Brand & commercial" },
  { id: "gaming", label: "Gaming edits" },
];

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  client: string;
  poster: string;
  video: string;
  accent: string;
};

// Placeholder clips — swap each `video`/`poster` pair for real client work,
// sorted the same way into these five categories.
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "reel-01",
    title: "Morning Routine, Cut Tight",
    category: "short-form",
    client: "Creator collab",
    poster: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=60",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    accent: "#e8a33d",
  },
  {
    id: "long-01",
    title: "The Slow Build — Ep. 04",
    category: "long-form",
    client: "YouTube channel",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=60",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    accent: "#c79b5e",
  },
  {
    id: "motion-01",
    title: "Type as Texture",
    category: "motion-graphics",
    client: "Personal study",
    poster: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=60",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    accent: "#7a1220",
  },
  {
    id: "brand-01",
    title: "Launch Film — Ember Coffee",
    category: "brand",
    client: "Local roastery",
    poster: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=60",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    accent: "#e8a33d",
  },
  {
    id: "gaming-01",
    title: "Clutch Compilation Vol. 3",
    category: "gaming",
    client: "Squad channel",
    poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=60",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    accent: "#7a1220",
  },
  {
    id: "reel-02",
    title: "Three Cuts, One Beat Drop",
    category: "short-form",
    client: "Fitness creator",
    poster: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=60",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    accent: "#c79b5e",
  },
];

export const SERVICES = [
  {
    tier: "Reel",
    price: "₹1,500+",
    unit: "per edit",
    description: "Short-form content — hooks, captions, sound design, delivered fast.",
    features: ["Up to 60 seconds", "2 revision rounds", "48-hour turnaround", "Caption + sound design"],
  },
  {
    tier: "Series",
    price: "₹6,000+",
    unit: "per month",
    description: "Ongoing long-form or multi-reel work for a channel or brand.",
    features: ["4–8 pieces / month", "Consistent visual language", "Priority turnaround", "Async feedback loop"],
    featured: true,
  },
  {
    tier: "Custom",
    price: "Quote",
    unit: "on request",
    description: "Brand films, motion graphics, or anything outside the usual shape.",
    features: ["Scoped to the brief", "Motion graphics available", "Full pre-pro conversation", "Flexible delivery"],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Handed over raw clips and got back something that actually felt like our channel, not a template.",
    name: "Creator, fitness channel",
  },
  {
    quote:
      "Fast turnaround without losing the small details — the pacing on the drops was exactly right.",
    name: "Local roastery, brand film",
  },
  {
    quote: "Sent notes once and the next cut nailed it. Easy to work with, no back-and-forth drama.",
    name: "Gaming squad, weekly edits",
  },
];

export const NAV_LINKS = [
  { label: "Reel", href: "#hero" },
  { label: "Work", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
