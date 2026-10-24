"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const PixelTrail = dynamic(() => import("./PixelTrail"), { ssr: false });
const query = "(min-width: 701px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export default function DesktopPixelTrail() {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const [colour, setColour] = useState("#C4F13A");

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const isLime = (value: string) => {
      const channels = value.match(/[\d.]+/g)?.map(Number);
      return Boolean(channels && Math.abs(channels[0] - 196) < 2 && Math.abs(channels[1] - 241) < 2 && Math.abs(channels[2] - 58) < 2);
    };
    const coversViewport = (element: HTMLElement) => {
      const bounds = element.getBoundingClientRect();
      return bounds.top <= window.innerHeight / 2 && bounds.bottom >= window.innerHeight / 2;
    };
    const update = () => {
      frame = 0;
      const surfaces = [
        document.querySelector<HTMLElement>("[data-hero-fill]"),
        document.querySelector<HTMLElement>("[data-cta-colour]"),
      ];
      const limeBackground = surfaces.some((element) => element
        && coversViewport(element)
        && Number(getComputedStyle(element).opacity) > 0.5
        && isLime(getComputedStyle(element).backgroundColor));
      setColour(limeBackground ? "#11120D" : "#C4F13A");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new MutationObserver(schedule);
    document.querySelectorAll<HTMLElement>("[data-hero-fill], [data-cta-colour]").forEach((element) => {
      observer.observe(element, { attributes: true, attributeFilter: ["style"] });
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: "none" }}>
      <PixelTrail
        gridSize={120}
        trailSize={0.018}
        maxAge={140}
        interpolate={3}
        color={colour}
        shape="circle"
        decay="dither"
        flow={0}
        shine={0.3}
        glow={0}
        clickBurst
        gooeyFilter={false}
        dpr={1}
      />
    </div>
  );
}
