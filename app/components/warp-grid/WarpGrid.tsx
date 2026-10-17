"use client";

import WarpImage from "./WarpImage";
import WarpTag from "./WarpTag";
import { PageTransitionLink } from "../PageTransition";
import WarpHoverMark from "../WarpHoverMark";
import styles from "./WarpGrid.module.css";

export type CreativeWork = { title: string; year: string; tag: string; href: string; src: string; alt: string };

function GridItem({ work, hoverDirection }: { work: CreativeWork; hoverDirection: 0 | 1 | 2 | 3 }) {
  return (
    <article className={styles.item}>
      <PageTransitionLink className={styles.link} href={work.href} rememberPosition data-card-hover-target>
        <div className={styles.card}>
          <figure className={styles.figure} data-card-hover-layer>
            <WarpImage src={work.src} alt={work.alt} width={800} height={800} className={styles.image} hoverOverlay hoverDirection={hoverDirection} />
            <figcaption className={styles.caption}>
              <h3>{work.title}</h3>
              <span className={styles.year}>{work.year}</span>
            </figcaption>
          </figure>
        </div>
        <WarpHoverMark direction={hoverDirection} />
        <WarpTag className={styles.tag}>{work.tag}</WarpTag>
      </PageTransitionLink>
    </article>
  );
}

export default function WarpGrid({ items }: { items: CreativeWork[] }) {
  return (
    <div className={styles.grid}>
      {items.map((work, index) => <GridItem key={work.src} work={work} hoverDirection={([2, 1, 3, 0, 2, 1] as const)[index % 6]} />)}
    </div>
  );
}
