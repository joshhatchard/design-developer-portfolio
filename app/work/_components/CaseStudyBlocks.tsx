import Image from "next/image";
import TheoryCultureZine from "../../components/TheoryCultureZine";
import type { CaseStudyBlock, CaseStudyMedia, CreativeContainer } from "../_content/types";
import PhotographyMasonry from "./PhotographyMasonry";
import NextProjectLink from "./NextProjectLink";
import styles from "./CaseStudyLayout.module.css";

const nextProjectPreviews: Record<string, { src: string; alt: string; ratio: string }> = {
  "/work/granic": { src: "/projects/previews/granic.png", alt: "Granic case study preview", ratio: "8 / 5" },
  "/work/canvas": { src: "/projects/previews/canvas.png", alt: "Designing for Country case study preview", ratio: "8 / 5" },
  "/work/sudata-merchandise": { src: "/projects/previews/SUDATA%20MERCH.png", alt: "SUDATA merchandise case study preview", ratio: "1 / 1" },
  "/work/sudata-logo-redesign": { src: "/projects/previews/SUDATA%20LOGO.png", alt: "SUDATA logo case study preview", ratio: "1 / 1" },
  "/work/interactive-boxes": { src: "/projects/previews/INTERACTIVE%20BOXES.png", alt: "Interactive Boxes case study preview", ratio: "1 / 1" },
  "/work/photography": { src: "/projects/previews/PHOTOGRAPHY.png", alt: "Photography case study preview", ratio: "1 / 1" },
  "/work/startuplink-merch": { src: "/projects/previews/SUL%20MERCH.png", alt: "StartUpLink merchandise case study preview", ratio: "1 / 1" },
  "/work/theory-and-culture-zine": { src: "/projects/previews/ZINE.png", alt: "Theory and Culture Zine case study preview", ratio: "1 / 1" },
};

function MediaFrame({ media }: { media: CaseStudyMedia }) {
  return (
    <figure className={styles.mediaSlotBlock}>
      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt ?? ""}
          width={media.width ?? 1600}
          height={media.height ?? 1000}
          loading={media.loading}
          sizes="(max-width: 700px) 100vw, 42rem"
        />
      ) : (
        <div className={styles.mediaSlot} style={{ aspectRatio: media.aspectRatio ?? "16 / 9" }} aria-label="Image placeholder">
          <span>Image placeholder</span>
        </div>
      )}
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}

function CreativeContainerFrame({ container }: { container: CreativeContainer }) {
  if (container.type === "gallery") return <PhotographyMasonry images={container.images} fullWidth={container.fullWidth} featuredFirst={container.featuredFirst} cropFeatured={container.cropFeatured} uniformTiles={container.uniformTiles} />;
  if (container.type === "zine") return <TheoryCultureZine />;
  return <iframe className={styles.interactiveFrame} src={`${container.src}?v=9`} title={container.title} />;
}

export function CaseStudyBlocks({ blocks, projectSlug }: { blocks: CaseStudyBlock[]; projectSlug: string }) {
  return blocks.map(block => {
    if (block.type === "intro") {
      return (
        <section id={block.id} key={block.id} className={styles.introBlock}>
          <p className={styles.introMeta}>{block.company} <span>·</span> {block.date}</p>
          <h1>{block.heading}</h1>
          <MediaFrame media={block.preview} />
          <dl className={styles.facts}>
            {block.facts.map(fact => <div key={fact.label} className={fact.wide ? styles.factWide : undefined}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
            <div className={styles.overviewFact}>
              <dt>{block.overview.heading}</dt>
              <dd>{block.overview.body}</dd>
            </div>
          </dl>
        </section>
      );
    }
    if (block.type === "heading-image") {
      return <section id={block.id} key={block.id} className={styles.headingImageBlock}><h2>{block.heading}</h2><p>{block.body}</p><MediaFrame media={block.media} /></section>;
    }
    if (block.type === "heading-image-pair") {
      return <section id={block.id} key={block.id} className={styles.headingImageBlock}><h2>{block.heading}</h2><p>{block.body}</p><div className={styles.mediaPair}>{block.media.map(media => <MediaFrame key={media.src ?? media.caption} media={media} />)}</div></section>;
    }
    if (block.type === "heading") {
      const isCanvasReflection = projectSlug === "canvas" && block.id === "reflection";
      return <section id={block.id} key={block.id} className={styles.headingBlock} data-canvas-reflection={isCanvasReflection ? "" : undefined}><h2>{block.heading}</h2><p>{block.body}</p></section>;
    }
    if (block.type === "heading-list") {
      return (
        <section id={block.id} key={block.id} className={styles.headingListBlock} data-case-decision-list>
          <h2 data-case-decision-heading>{block.heading}</h2>
          <div className={styles.headingListItems}>
            {block.items.map(item => <article key={item.heading} data-case-decision><h3>{item.heading}</h3><p>{item.body}</p><MediaFrame media={item.media} /></article>)}
          </div>
        </section>
      );
    }
    if (block.type === "creative-intro") {
      return (
        <section id={block.id} key={block.id} className={styles.creativeIntroBlock}>
          <p className={styles.introMeta}>{block.company} <span>·</span> {block.date}</p>
          <h1>{block.heading}</h1>
          <div className={styles.creativeOverview}>
            <h2>{block.overview.heading}</h2>
            <p>{block.overview.body}</p>
          </div>
        </section>
      );
    }
    if (block.type === "creative-content") {
      return (
        <section id={block.id} key={block.id} className={styles.creativeContentBlock}>
          <div className={`${styles.creativeContainer} ${block.container.type === "gallery" && block.container.fullWidth ? styles.creativeContainerFullWidth : ""}`}><CreativeContainerFrame container={block.container} /></div>
        </section>
      );
    }
    if (block.type === "next-project") {
      const preview = nextProjectPreviews[block.href];
      return <section id={block.id} key={block.id} className={styles.nextProjectBlock}><p>{block.label ?? "Next project"}</p><NextProjectLink href={block.href} title={block.title} previewSrc={preview?.src} previewAlt={preview?.alt} previewRatio={preview?.ratio} /></section>;
    }
    if (block.type === "media") {
      return (
        <figure id={block.id} key={block.id} className={styles.mediaBlock}>
          <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 700px) 100vw, 64rem" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    }
    if (block.type === "gallery") {
      return (
        <section id={block.id} key={block.id} className={styles.galleryBlock}>
          <h2>{block.heading}</h2>
          <PhotographyMasonry images={block.images} />
        </section>
      );
    }
    if (block.type === "quote") {
      return (
        <blockquote id={block.id} key={block.id} className={styles.quoteBlock}>
          <p>“{block.quote}”</p>
          {block.attribution && <cite>{block.attribution}</cite>}
        </blockquote>
      );
    }
    if (block.type === "zine") {
      return (
        <section id={block.id} key={block.id} className={styles.zineBlock}>
          <h2>{block.heading}</h2>
          <TheoryCultureZine />
        </section>
      );
    }
    if (block.type === "interactive") {
      return (
        <section id={block.id} key={block.id} className={styles.interactiveBlock}>
          <h2>{block.heading}</h2>
          <iframe className={styles.interactiveFrame} src={`${block.src}?v=13`} title={block.title} />
        </section>
      );
    }
    return (
      <section id={block.id} key={block.id} className={styles.copyBlock}>
        {block.eyebrow && <p className={styles.eyebrow}>{block.eyebrow}</p>}
        <h2>{block.heading}</h2>
        <p>{block.body}</p>
      </section>
    );
  });
}
