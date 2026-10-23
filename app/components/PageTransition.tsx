"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./PageTransition.module.css";

type TransitionContextValue = {
  navigate: (href: string, resetScroll?: boolean, rememberPosition?: boolean) => void;
  goBack: (fallback: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);
const COVER_DURATION = 750;
const REVEAL_DURATION = 750;
const CONTENT_REVEAL_LEAD = 260;
const ROUTE_REVEAL_TIMEOUT = 1800;
export const PAGE_TRANSITION_CONTENT_REVEAL_EVENT = "portfolio:page-transition-content-reveal";
export const PROJECT_RETURN_SCROLL_KEY = "portfolio:project-return-scroll";
export const HOME_ANCHOR_KEY = "portfolio:home-anchor";

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const phaseRef = useRef(phase);
  const coverTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);
  const contentRevealTimer = useRef<number | null>(null);
  const routeTimer = useRef<number | null>(null);
  const pendingReveal = useRef<(() => void) | null>(null);

  const setTransitionPhase = useCallback((next: typeof phase) => {
    phaseRef.current = next;
    document.documentElement.dataset.pageTransitionPhase = next;
    setPhase(next);
  }, []);
  const reveal = useCallback(() => {
    const beforeReveal = pendingReveal.current;
    if (!beforeReveal || phaseRef.current !== "covering") return;
    pendingReveal.current = null;
    if (routeTimer.current) window.clearTimeout(routeTimer.current);
    requestAnimationFrame(() => {
      beforeReveal();
      setTransitionPhase("revealing");
      contentRevealTimer.current = window.setTimeout(
        () => window.dispatchEvent(new Event(PAGE_TRANSITION_CONTENT_REVEAL_EVENT)),
        REVEAL_DURATION - CONTENT_REVEAL_LEAD,
      );
      revealTimer.current = window.setTimeout(() => {
        setTransitionPhase("idle");
      }, REVEAL_DURATION);
    });
  }, [setTransitionPhase]);
  const begin = (action: () => void, beforeReveal?: () => void, waitForRoute = true) => {
    if (phaseRef.current !== "idle") return;
    setTransitionPhase("covering");
    coverTimer.current = window.setTimeout(() => {
      pendingReveal.current = beforeReveal ?? (() => undefined);
      action();
      if (waitForRoute) routeTimer.current = window.setTimeout(reveal, ROUTE_REVEAL_TIMEOUT);
      else reveal();
    }, COVER_DURATION);
  };
  const navigate = (href: string, resetScroll = true, rememberPosition = false) => {
    if (window.location.pathname.startsWith("/work/") && !href.startsWith("/work/")) {
      window.sessionStorage.setItem("portfolio:skip-hero-splash-on-return", "true");
    }
    if (rememberPosition) window.sessionStorage.setItem(PROJECT_RETURN_SCROLL_KEY, String(window.scrollY));
    const destinationPath = href.split("#")[0];
    begin(
      () => router.push(href),
      resetScroll ? () => window.scrollTo({ top: 0, left: 0, behavior: "instant" }) : undefined,
      destinationPath !== "" && destinationPath !== window.location.pathname,
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

  useEffect(() => {
    if (pendingReveal.current) reveal();
  }, [pathname, reveal]);

  useEffect(() => () => {
    if (coverTimer.current) window.clearTimeout(coverTimer.current);
    if (revealTimer.current) window.clearTimeout(revealTimer.current);
    if (contentRevealTimer.current) window.clearTimeout(contentRevealTimer.current);
    if (routeTimer.current) window.clearTimeout(routeTimer.current);
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate, goBack }}>
      {children}
      <div className={styles.wipe} data-phase={phase} aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => <span key={index} className={styles.curtain} />)}
      </div>
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
