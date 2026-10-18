"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { PAGE_TRANSITION_CONTENT_REVEAL_EVENT } from "../../components/PageTransition";
import ProjectBackButton from "./ProjectBackButton";
import styles from "./CaseStudyLayout.module.css";

type TocItem = { id: string; label: string };

export default function CaseStudyToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [revealReady, setRevealReady] = useState(false);

  useEffect(() => {
    const beginReveal = () => setRevealReady(true);
    const transitionIsRunning = document.documentElement.dataset.pageTransitionPhase && document.documentElement.dataset.pageTransitionPhase !== "idle";
    if (transitionIsRunning) window.addEventListener(PAGE_TRANSITION_CONTENT_REVEAL_EVENT, beginReveal, { once: true });
    else beginReveal();

    return () => window.removeEventListener(PAGE_TRANSITION_CONTENT_REVEAL_EVENT, beginReveal);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const marker = window.innerHeight * 0.35;
      const visibleItems = items
        .map(item => ({ item, element: document.getElementById(item.id) }))
        .filter((entry): entry is { item: TocItem; element: HTMLElement } => entry.element !== null);

      const current = [...visibleItems].reverse().find(({ element }) => element.getBoundingClientRect().top <= marker)
        ?? visibleItems.find(({ element }) => element.getBoundingClientRect().bottom > marker)
        ?? visibleItems[0];

      if (current) setActiveId(current.item.id);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <aside className={styles.toc} data-reveal-ready={revealReady} aria-label="On this page">
      <ProjectBackButton />
      <p>On this page</p>
      {items.map((item, index) => (
        <a key={item.id} href={`#${item.id}`} style={{ "--toc-reveal-delay": `${140 + index * 60}ms` } as CSSProperties} data-active={activeId === item.id} aria-current={activeId === item.id ? "location" : undefined}>
          {item.label}
        </a>
      ))}
    </aside>
  );
}
