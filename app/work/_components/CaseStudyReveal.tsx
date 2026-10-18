"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { PAGE_TRANSITION_CONTENT_REVEAL_EVENT } from "../../components/PageTransition";
import styles from "./CaseStudyReveal.module.css";

export default function CaseStudyReveal({ children, className, projectSlug }: { children: ReactNode; className?: string; projectSlug: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const canvasReflection = root.dataset.project === "canvas"
      ? root.querySelector<HTMLElement>("[id='reflection']")
      : null;
    const sections = Array.from(root.children).filter((child): child is HTMLElement => child instanceof HTMLElement && !child.hasAttribute("data-case-decision-list") && child !== canvasReflection);
    const decisionHeadings = Array.from(root.querySelectorAll<HTMLElement>("[data-case-decision-heading]"));
    const decisions = Array.from(root.querySelectorAll<HTMLElement>("[data-case-decision]"));
    const revealTargets = [...sections, ...decisionHeadings, ...decisions, ...(canvasReflection ? [canvasReflection] : [])];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sections.forEach(section => section.dataset.caseReveal = "");
    decisionHeadings.forEach(heading => heading.dataset.decisionHeadingReveal = "");
    decisions.forEach(decision => decision.dataset.decisionReveal = "");

    let observer: IntersectionObserver | undefined;
    const beginReveals = () => {
      if (reducedMotion) {
        revealTargets.forEach(target => target.dataset.revealState = "visible");
        return;
      }

      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealState = "visible";
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -8%" });

      revealTargets.forEach(target => observer?.observe(target));
      root.dataset.revealReady = "true";
    };

    const transitionIsRunning = document.documentElement.dataset.pageTransitionPhase && document.documentElement.dataset.pageTransitionPhase !== "idle";
    if (transitionIsRunning) window.addEventListener(PAGE_TRANSITION_CONTENT_REVEAL_EVENT, beginReveals, { once: true });
    else beginReveals();

    return () => {
      window.removeEventListener(PAGE_TRANSITION_CONTENT_REVEAL_EVENT, beginReveals);
      observer?.disconnect();
    };
  }, []);

  return <article ref={rootRef} className={`${styles.root} ${className ?? ""}`} data-project={projectSlug} data-reveal-ready="true">{children}</article>;
}
