import Splash from "./hero-dive/Splash";
import WarpHoverMark from "./WarpHoverMark";
import WarpImage from "./warp-grid/WarpImage";
import WarpTag from "./warp-grid/WarpTag";
import { PageTransitionLink } from "./PageTransition";
import styles from "./CaseStudies.module.css";

const caseStudies = [
  { number: "01", title: "USYD - Designing for Country", year: "2025", label: "DESIGN & DEVELOPMENT", href: "/work/canvas", src: "/projects/previews/canvas.webp", alt: "University of Sydney First Nations support page preview", hoverDirection: 3 as const },
  { number: "02", title: "Granic - Validating a SaaS", year: "2026", label: "DESIGN & DEVELOPMENT", href: "/work/granic", src: "/projects/previews/granic.webp", alt: "Granic deadline tracker preview", hoverDirection: 2 as const },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className={styles.section} aria-label="Case studies">
      <Splash />
      <div className={styles.content}>
      <div className={styles.gallery} data-case-gallery>
        {caseStudies.map((project) => (
          <article key={project.number} className={styles.project} aria-labelledby={`project-${project.number}`}>
            <PageTransitionLink className={styles.projectLink} href={project.href} rememberPosition data-card-hover-target>
              <figure className={styles.figure}>
                <div className={styles.artwork} data-card-hover-layer>
                  <WarpImage src={project.src} alt={project.alt} width={1600} height={1000} className={styles.image} hoverOverlay hoverDirection={project.hoverDirection} />
                </div>
                <WarpHoverMark direction={project.hoverDirection} />
                <WarpTag className={styles.tag}>{project.label}</WarpTag>
                <figcaption className={styles.caption}>
                  <h3 id={`project-${project.number}`}>{project.title}</h3>
                  <span className={styles.year}>{project.year}</span>
                </figcaption>
              </figure>
            </PageTransitionLink>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
