"use client";

import { useEffect } from "react";
import { PROJECT_RETURN_SCROLL_KEY } from "./PageTransition";
import { useScrollRuntime } from "./warp-grid/ScrollProvider";

export default function HomeScrollRestorer() {
  const { runtime } = useScrollRuntime();

  useEffect(() => {
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
