"use client";

import Image from "next/image";
import { useRef } from "react";
import { PageTransitionLink } from "../../components/PageTransition";
import styles from "./CaseStudyLayout.module.css";

export default function NextProjectLink({ href, title, previewSrc, previewAlt, previewRatio = "1 / 1" }: { href: string; title: string; previewSrc?: string; previewAlt?: string; previewRatio?: string }) {
  const previewRef = useRef<HTMLSpanElement>(null);

  const movePreview = (clientX: number, clientY: number) => {
    const preview = previewRef.current;
    if (preview) {
      const { width, height } = preview.getBoundingClientRect();
      preview.style.left = `${Math.min(clientX + 14, window.innerWidth - width - 14)}px`;
      preview.style.top = `${Math.max(14, clientY - height - 14)}px`;
    }
  };

  return (
    <PageTransitionLink
      href={href}
      onPointerEnter={event => {
        previewRef.current?.setAttribute("data-visible", "true");
        movePreview(event.clientX, event.clientY);
      }}
      onPointerMove={event => movePreview(event.clientX, event.clientY)}
      onPointerLeave={() => previewRef.current?.removeAttribute("data-visible")}
    >
      {title} <span aria-hidden="true">↗</span>
      {previewSrc && (
        <span ref={previewRef} className={styles.nextProjectPreview} style={{ aspectRatio: previewRatio }} aria-hidden="true">
          <span className={styles.nextProjectPreviewInner}>
            <Image src={previewSrc} alt={previewAlt ?? ""} fill sizes="18rem" />
          </span>
        </span>
      )}
    </PageTransitionLink>
  );
}
