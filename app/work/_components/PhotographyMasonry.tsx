"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./PhotographyMasonry.module.css";

type Photograph = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
};

export default function PhotographyMasonry({ images }: { images: Photograph[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const openPreview = (index: number) => {
    setIsClosing(false);
    setActiveIndex(index);
  };

  const closePreview = () => {
    if (activeIndex !== null) setIsClosing(true);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsClosing(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images.length]);

  return (
    <>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <button key={image.src} type="button" className={styles.tile} onClick={() => openPreview(index)} aria-label={`Open preview: ${image.title}`}>
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority={index < 2} sizes="(max-width: 700px) 50vw, 14rem" />
            <span className={styles.caption}><span>{String(index + 1).padStart(2, "0")}</span>{image.title}</span>
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${activeImage.title} preview`}>
          <button className={`${styles.backdrop} ${isClosing ? styles.backdropClosing : ""}`} type="button" onClick={closePreview} aria-label="Close image preview" />
          <button
            className={`${styles.preview} ${isClosing ? styles.previewClosing : ""}`}
            type="button"
            onClick={closePreview}
            onAnimationEnd={event => {
              if (isClosing && event.currentTarget === event.target) {
                setActiveIndex(null);
                setIsClosing(false);
              }
            }}
            aria-label="Close image preview"
          >
            <Image src={activeImage.src} alt={activeImage.alt} width={activeImage.width} height={activeImage.height} sizes="92vw" priority />
            <span className={styles.previewCaption}><span>{String(activeIndex + 1).padStart(2, "0")}</span>{activeImage.title}</span>
          </button>
        </div>
      )}
    </>
  );
}
