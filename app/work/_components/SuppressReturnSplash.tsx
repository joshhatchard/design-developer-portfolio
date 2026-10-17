"use client";

import { useEffect } from "react";

export default function SuppressReturnSplash() {
  useEffect(() => {
    const suppressSplash = () => {
      window.sessionStorage.setItem("portfolio:skip-hero-splash-on-return", "true");
    };

    // Set this before returning, including browser Back and direct project visits.
    suppressSplash();
    window.addEventListener("pagehide", suppressSplash);
    return () => {
      suppressSplash();
      window.removeEventListener("pagehide", suppressSplash);
    };
  }, []);

  return null;
}
