import WarpGrid, { type CreativeWork } from "./warp-grid/WarpGrid";
import styles from "./Creative.module.css";

// Add more entries here; the grid creates new rows automatically.
const creativeWork: CreativeWork[] = [
  { title: "SUDATA logo revamp", year: "2026", tag: "BRANDING", href: "/work/sudata-logo-redesign", src: "/projects/previews/sudata-logo.webp", alt: "SUDATA logo redesign preview" },
  { title: "StartUpLink shirts", year: "2026", tag: "MERCHANDISE", href: "/work/startuplink-merch", src: "/projects/previews/startuplink-shirts.webp", alt: "StartUpLink t-shirt with the graphic back print" },
  { title: "Interactive boxes", year: "2025", tag: "CREATIVE CODING", href: "/work/interactive-boxes", src: "/projects/previews/interactive-boxes.webp", alt: "Interactive Boxes geometric tile composition" },
  { title: "SUDATA hoodies", year: "2026", tag: "MERCHANDISE", href: "/work/sudata-merchandise", src: "/projects/previews/sudata-merch.webp", alt: "SUDATA hoodie with the graphic back print" },
  { title: "Theory & Culture Zine", year: "2025", tag: "PUBLICATION", href: "/work/theory-and-culture-zine", src: "/projects/previews/zine.webp", alt: "Theory and Culture Zine cover" },
  { title: "Photography", year: "2026", tag: "CREATIVE", href: "/work/photography", src: "/projects/previews/photography.webp", alt: "Motorcyclist travelling along a forest road" },
];

export default function Creative() {
  return (
    <section id="creative" className={styles.section} aria-label="Creative work">
      <div className={styles.gallery}>
        <WarpGrid items={creativeWork} />
      </div>
    </section>
  );
}
