"use client";

import { useEffect } from "react";
import { HOME_ANCHOR_KEY, PROJECT_RETURN_SCROLL_KEY } from "./PageTransition";
import { useScrollRuntime } from "./warp-grid/ScrollProvider";

export default function HomeScrollRestorer() {
  const { runtime } = useScrollRuntime();

  useEffect(() => {
    const anchor = window.sessionStorage.getItem(HOME_ANCHOR_KEY);
    if (anchor) {
      const restoreAnchor = () => {
        const target = document.getElementById(anchor);
        if (!target) return;
        const navigationHeight = document.querySelector(".navbar")?.getBoundingClientRect().height ?? 0;
        const transform = getComputedStyle(target).transform;
        // The case-study surface enters with a temporary translateY. Aim for
        // its resting position, matching the homepage's in-page Work link.
        const entryOffset = anchor === "case-studies" && transform !== "none"
          ? new DOMMatrixReadOnly(transform).m42
          : 0;
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - entryOffset - (anchor === "case-studies" ? 0 : navigationHeight));
        window.scrollTo({ top, left: 0, behavior: "instant" });
        runtime.current.lenis?.scrollTo(top, { immediate: true, force: true });
        runtime.current.refresh.forEach(callback => callback());
        // The WebGL diver measures the hero against the current viewport.
        // Prompt a measurement once the destination route is fully mounted.
        window.dispatchEvent(new Event("resize"));
      };
      let firstFrame = 0;
      let secondFrame = 0;
      let finalFrame = 0;
      firstFrame = window.requestAnimationFrame(() => {
        restoreAnchor();
        secondFrame = window.requestAnimationFrame(() => {
          restoreAnchor();
          finalFrame = window.requestAnimationFrame(() => {
            restoreAnchor();
            window.dispatchEvent(new Event("portfolio:home-anchor-restored"));
            window.sessionStorage.removeItem(HOME_ANCHOR_KEY);
          });
        });
      });
      return () => {
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
        window.cancelAnimationFrame(finalFrame);
      };
    }

    const savedPosition = window.sessionStorage.getItem(PROJECT_RETURN_SCROLL_KEY);
    if (!savedPosition) return;

    const top = Number(savedPosition);
    if (!Number.isFinite(top) || top < 0) {
      window.sessionStorage.removeItem(PROJECT_RETURN_SCROLL_KEY);
      return;
    }

    const restore = () => {
      window.scrollTo({ top, left: 0, behavior: "instant" });
      runtime.current.lenis?.scrollTo(top, { immediate: true, force: true });
      runtime.current.refresh.forEach(callback => callback());
    };
    let firstFrame = 0;
    let secondFrame = 0;
    firstFrame = window.requestAnimationFrame(() => {
      restore();
      secondFrame = window.requestAnimationFrame(() => {
        restore();
        window.sessionStorage.removeItem(PROJECT_RETURN_SCROLL_KEY);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [runtime]);

  return null;
}
