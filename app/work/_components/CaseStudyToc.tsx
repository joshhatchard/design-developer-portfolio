"use client";

import { useEffect, useState } from "react";
import ProjectBackButton from "./ProjectBackButton";
import styles from "./CaseStudyLayout.module.css";

type TocItem = { id: string; label: string };

export default function CaseStudyToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

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
    <aside className={styles.toc} aria-label="On this page">
      <ProjectBackButton />
      <p>On this page</p>
      {items.map(item => (
        <a key={item.id} href={`#${item.id}`} data-active={activeId === item.id} aria-current={activeId === item.id ? "location" : undefined}>
          {item.label}
        </a>
      ))}
    </aside>
  );
}
