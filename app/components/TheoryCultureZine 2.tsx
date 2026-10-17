"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./TheoryCultureZine.module.css";

const pages = ["publication.jpg", ...Array.from({ length: 16 }, (_, index) => `publication-${index + 1}.jpg`)];

export default function TheoryCultureZine() {
  const [page, setPage] = useState(0);
  const lastPage = pages.length - 1;
  const previous = () => setPage((current) => Math.max(0, current - 1));
  const next = () => setPage((current) => Math.min(lastPage, current + 1));

  const isCover = page === 0 || page === lastPage;
  return (
    <div className={styles.preview} aria-label={`Zine page ${page + 1} of ${pages.length}`}>
        <div className={`${styles.page} ${isCover ? styles.cover : ""}`}>
          <Image
            src={`/creative/theory-and-culture-zine/${pages[page]}`}
            alt={isCover ? "Theory and Culture Zine cover" : `Theory and Culture Zine spread ${page}`}
            width={isCover ? 250 : 498}
            height={isCover ? 352 : 176}
            priority={page === 0}
          />
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={previous} disabled={page === 0} aria-label="Previous zine page">←</button>
          <span>{String(page + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}</span>
          <button type="button" onClick={next} disabled={page === lastPage} aria-label="Next zine page">→</button>
        </div>
    </div>
  );
}
