"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./WorkShowcase.module.css";

const clampRange = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

export default function WorkShowcase({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const work = ref.current;
    const surface = work?.querySelector<HTMLElement>("[data-gallery-surface]");
    const canvas = surface?.querySelector<HTMLCanvasElement>("canvas");
    if (!work || !surface || !canvas) return;
    if (window.matchMedia("(max-width: 700px)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let previousKey = "";
    const draw = () => {
      frame = 0;
      const width = Math.round(surface.clientWidth);
      const height = Math.round(surface.clientHeight);
      const density = Math.min(window.devicePixelRatio || 1, 2);
      const background = "rgb(17, 18, 13)";
      const grid = "rgb(72, 73, 68)";
      const spacing = clampRange(width * 0.05, 40, 100);
      const key = `${width}:${height}:${density}:${background}:${grid}:${spacing}`;
      if (key === previousKey) return;
      previousKey = key;
      surface.style.backgroundColor = background;
      const pixelWidth = Math.max(1, Math.round(width * density));
      const pixelHeight = Math.max(1, Math.round(height * density));
      // Colour fades must not reallocate the full-screen canvas every frame.
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      context.setTransform(density, 0, 0, density, 0, 0);
      context.clearRect(0, 0, width, height);
      context.strokeStyle = grid;
      context.globalAlpha = 0.34;
      context.lineWidth = 1;
      context.beginPath();
      for (let y = 0; y <= height; y += spacing) {
        context.moveTo(0, y);
        context.lineTo(width, y);
      }
      for (let x = 0; x <= width; x += spacing) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }
      context.stroke();
      context.globalAlpha = 1;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const observer = new ResizeObserver(schedule);
    observer.observe(work);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div ref={ref} className={styles.work}>
    <div className={styles.surface} data-gallery-surface aria-hidden="true"><canvas /></div>
    {children}
  </div>;
}
