"use client";

import { useEffect, useState, type RefObject } from "react";
import type { ScrollRuntime } from "./warp-grid/ScrollProvider";
import styles from "./LoadingScreen.module.css";

const MINIMUM_VISIBLE_MS = 800;
const EXIT_DURATION_MS = 420;

type Props = { runtime: RefObject<ScrollRuntime> };

export default function LoadingScreen({ runtime }: Props) {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (phase !== "loading") return;
    const timer = window.setTimeout(() => {
      setReady(true);
      setPhase("leaving");
    }, MINIMUM_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => setPhase("done"), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    document.documentElement.dataset.portfolioReady = "true";
    window.dispatchEvent(new Event("portfolio-ready"));
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const resetToHero = () => {
      runtime.current.lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };
    const previousRestoration = history.scrollRestoration;
    const preventScroll = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    const preventScrollKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) preventScroll(event);
    };

    window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
    window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });
    window.addEventListener("keydown", preventScrollKey, true);
    history.scrollRestoration = "manual";
    resetToHero();
    const frame = requestAnimationFrame(resetToHero);
    const interval = window.setInterval(resetToHero, 50);
    window.addEventListener("scroll", resetToHero, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
      window.removeEventListener("scroll", resetToHero);
      window.removeEventListener("wheel", preventScroll, true);
      window.removeEventListener("touchmove", preventScroll, true);
      window.removeEventListener("keydown", preventScrollKey, true);
      history.scrollRestoration = previousRestoration;
    };
  }, [phase, runtime]);

  if (phase === "done") return null;
  return (
    <div className={styles.screen} data-leaving={phase === "leaving"} data-ready={ready} aria-busy="true" aria-label="Loading portfolio">
      <div className={styles.stack}>
        <div className={styles.mark} aria-hidden="true" />
        <div className={styles.progress} aria-hidden="true"><span /></div>
        <p className={styles.label}>Loading the good stuff</p>
      </div>
    </div>
  );
}
