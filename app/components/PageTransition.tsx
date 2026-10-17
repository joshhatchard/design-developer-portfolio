"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import styles from "./PageTransition.module.css";

type TransitionContextValue = {
  navigate: (href: string, resetScroll?: boolean, rememberPosition?: boolean) => void;
  goBack: (fallback: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);
const COVER_DURATION = 700;
const REVEAL_DURATION = 700;
export const PROJECT_RETURN_SCROLL_KEY = "portfolio:project-return-scroll";

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const phaseRef = useRef(phase);
  const coverTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);

  const setTransitionPhase = useCallback((next: typeof phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);
  const begin = (action: () => void, beforeReveal?: () => void) => {
    if (phaseRef.current !== "idle") return;
    setTransitionPhase("covering");
    coverTimer.current = window.setTimeout(() => {
      action();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          beforeReveal?.();
          setTransitionPhase("revealing");
          revealTimer.current = window.setTimeout(() => setTransitionPhase("idle"), REVEAL_DURATION);
        });
      });
    }, COVER_DURATION);
  };
  const navigate = (href: string, resetScroll = true, rememberPosition = false) => {
    if (window.location.pathname.startsWith("/work/") && !href.startsWith("/work/")) {
      window.sessionStorage.setItem("portfolio:skip-hero-splash-on-return", "true");
    }
    if (rememberPosition) window.sessionStorage.setItem(PROJECT_RETURN_SCROLL_KEY, String(window.scrollY));
    begin(
      () => router.push(href),
      resetScroll ? () => window.scrollTo({ top: 0, left: 0, behavior: "instant" }) : undefined,
    );
  };
  const goBack = (fallback: string) => {
    if (window.location.pathname.startsWith("/work/")) {
      window.sessionStorage.setItem("portfolio:skip-hero-splash-on-return", "true");
    }
    // A deterministic push lets the homepage restore its own saved position
    // after its scroll runtime has mounted. Browser history restoration races
    // with that runtime and was intermittently landing at the hero instead.
    begin(() => router.push(fallback, { scroll: false }));
  };

  useEffect(() => () => {
    if (coverTimer.current) window.clearTimeout(coverTimer.current);
    if (revealTimer.current) window.clearTimeout(revealTimer.current);
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate, goBack }}>
      {children}
      <div className={styles.wipe} data-phase={phase} aria-hidden="true" />
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("Page transitions require PageTransitionProvider");
  return context;
}

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; resetScroll?: boolean; rememberPosition?: boolean };

export function PageTransitionLink({ href, onClick, resetScroll = true, rememberPosition = false, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(href, resetScroll, rememberPosition);
      }}
    />
  );
}
