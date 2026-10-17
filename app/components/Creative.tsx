import WarpGrid, { type CreativeWork } from "./warp-grid/WarpGrid";
import styles from "./Creative.module.css";

// Add more entries here; the grid creates new rows automatically.
const creativeWork: CreativeWork[] = [
  { title: "SUDATA logo redesign", year: "2026", tag: "Branding", href: "/work/sudata-logo-redesign", src: "/projects/previews/SUDATA%20LOGO.png", alt: "SUDATA logo redesign preview" },
  { title: "StartUpLink merch", year: "2025", tag: "Apparel design", href: "/work/startuplink-merch", src: "/projects/previews/SUL%20MERCH.png", alt: "StartUpLink t-shirt with the graphic back print" },
  { title: "Interactive boxes", year: "2025", tag: "Creative coding", href: "/work/interactive-boxes", src: "/projects/previews/INTERACTIVE%20BOXES.png", alt: "Interactive Boxes geometric tile composition" },
  { title: "SUDATA merchandise", year: "2026", tag: "Graphic + product design", href: "/work/sudata-merchandise", src: "/projects/previews/SUDATA%20MERCH.png", alt: "SUDATA hoodie with the graphic back print" },
  { title: "Theory & Culture Zine", year: "2024", tag: "Publication", href: "/work/theory-and-culture-zine", src: "/projects/previews/ZINE.png", alt: "Theory and Culture Zine cover" },
  { title: "Photography", year: "2024–2026", tag: "Selected work", href: "/work/photography", src: "/projects/previews/PHOTOGRAPHY.png", alt: "Motorcyclist travelling along a forest road" },
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
