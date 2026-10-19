"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { PageTransitionLink } from "../../components/PageTransition";
import styles from "./CaseStudyLayout.module.css";

export default function NextProjectLink({ href, title, previewSrc, previewAlt, previewRatio = "1 / 1" }: { href: string; title: string; previewSrc?: string; previewAlt?: string; previewRatio?: string }) {
  const previewRef = useRef<HTMLSpanElement>(null);
  const holdTimer = useRef<number | null>(null);
  const heldPreview = useRef(false);
  const suppressClick = useRef(false);

  const hidePreview = () => previewRef.current?.removeAttribute("data-visible");
  const clearHold = () => {
    if (holdTimer.current !== null) window.clearTimeout(holdTimer.current);
    holdTimer.current = null;
  };

  useEffect(() => clearHold, []);

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
        if (event.pointerType !== "mouse") return;
        previewRef.current?.setAttribute("data-visible", "true");
        movePreview(event.clientX, event.clientY);
      }}
      onPointerMove={event => {
        if (event.pointerType === "mouse" || heldPreview.current) movePreview(event.clientX, event.clientY);
      }}
      onPointerLeave={() => hidePreview()}
      onPointerDown={event => {
        if (event.pointerType !== "touch" || !previewSrc) return;
        heldPreview.current = false;
        suppressClick.current = false;
        clearHold();
        holdTimer.current = window.setTimeout(() => {
          heldPreview.current = true;
          suppressClick.current = true;
          previewRef.current?.setAttribute("data-visible", "true");
          movePreview(event.clientX, event.clientY);
        }, 360);
      }}
      onPointerUp={() => {
        clearHold();
        if (!heldPreview.current) return;
        heldPreview.current = false;
        hidePreview();
      }}
      onPointerCancel={() => {
        clearHold();
        heldPreview.current = false;
        hidePreview();
      }}
      onClick={event => {
        if (!suppressClick.current) return;
        suppressClick.current = false;
        event.preventDefault();
      }}
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
