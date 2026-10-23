"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "./TheoryCultureZine.module.css";

type ZinePage = {
  src: string;
  side: "single" | "left" | "right";
};

const pages: ZinePage[] = [
  { src: "publication.html", side: "single" },
  ...Array.from({ length: 15 }, (_, index) => {
    const src = `publication-${index + 1}.html`;
    return [{ src, side: "left" as const }, { src, side: "right" as const }];
  }).flat(),
  { src: "publication-16.html", side: "single" },
];

const sourceFiles = ["publication.html", ...Array.from({ length: 16 }, (_, index) => `publication-${index + 1}.html`)];
const readerPath = "/creative/theory-and-culture-zine/reader/publication-web-resources";
const mobilePageWidth = 336;
const mobilePageHeight = 473;
const pageAspectRatio = 420 / 298;

const ZineLeaf = forwardRef<HTMLDivElement, { page: ZinePage; markup: string }>(function ZineLeaf({ page, markup }, ref) {
  return (
    <div ref={ref} className={`${styles.page} ${styles[page.side]}`} data-density="soft">
      <div className={styles.exportedPage} dangerouslySetInnerHTML={{ __html: markup }} />
    </div>
  );
});

export default function TheoryCultureZine() {
  const reader = useRef<HTMLDivElement>(null);
  const book = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; getBoundsRect: () => { pageWidth: number } } | undefined }>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [compactViewport, setCompactViewport] = useState(false);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"forward" | "backward" | null>(null);
  const [pageMarkup, setPageMarkup] = useState<Record<string, string>>({});
  const isLeavingFront = isTurning && currentPage === 0 && turnDirection === "forward";
  const isArrivingFront = isTurning && currentPage === 1 && turnDirection === "backward";
  const isArrivingBack = isTurning && currentPage === pages.length - 3 && turnDirection === "forward";
  const isLeavingBack = isTurning && currentPage === pages.length - 1 && turnDirection === "backward";
  const bookPosition = !isLandscape
    ? ""
    : (currentPage === 0 && !isLeavingFront) || isArrivingFront
    ? styles.frontCover
    : (currentPage === pages.length - 1 && !isLeavingBack) || isArrivingBack
      ? styles.backCover
      : "";
  const desktopPageWidth = Math.max(220, Math.floor((availableWidth || 1040) / 2));
  const desktopPageHeight = Math.round(desktopPageWidth * pageAspectRatio);
  const pageWidth = compactViewport ? mobilePageWidth : desktopPageWidth;
  const pageHeight = compactViewport ? mobilePageHeight : desktopPageHeight;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const syncViewport = () => setCompactViewport(query.matches);
    syncViewport();
    query.addEventListener("change", syncViewport);
    return () => query.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    const element = reader.current;
    if (!element) return;

    const updateWidth = () => setAvailableWidth(Math.floor(element.getBoundingClientRect().width));
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, [pageMarkup]);

  const syncPageScale = (pageWidth?: number) => {
    const width = pageWidth ?? book.current?.pageFlip()?.getBoundsRect().pageWidth;
    if (!width || !reader.current) return;

    const scale = width / 298;
    reader.current.style.setProperty("--zine-page-scale", String(scale));
    reader.current.style.setProperty("--zine-page-width", `${width}px`);
    reader.current.style.setProperty("--zine-right-offset", `${-298 * scale}px`);
  };

  useEffect(() => {
    let animationFrame = 0;
    const handleResize = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = window.requestAnimationFrame(() => syncPageScale());
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setCoverDensity = (pageFlip: { getPage: (page: number) => { setDensity: (density: "hard" | "soft") => void } }, mode: "landscape" | "portrait") => {
    const density = mode === "landscape" ? "hard" : "soft";
    pageFlip.getPage(0).setDensity(density);
    pageFlip.getPage(pages.length - 1).setDensity(density);
  };

  useEffect(() => {
    const stylesheetId = "theory-culture-zine-export-styles";
    if (!document.getElementById(stylesheetId)) {
      const stylesheet = document.createElement("link");
      stylesheet.id = stylesheetId;
      stylesheet.rel = "stylesheet";
      stylesheet.href = `${readerPath}/css/idGeneratedStyles.css`;
      document.head.append(stylesheet);
    }

    let cancelled = false;
    Promise.all(sourceFiles.map(async file => {
      const response = await fetch(`${readerPath}/html/${file}`);
      const html = await response.text();
      const documentPage = new DOMParser().parseFromString(html, "text/html");
      return [file, documentPage.body.innerHTML.replaceAll("../image/", `${readerPath}/image/`)] as const;
    })).then(entries => {
      if (!cancelled) setPageMarkup(Object.fromEntries(entries));
    });

    return () => { cancelled = true; };
  }, []);

  if (Object.keys(pageMarkup).length !== sourceFiles.length) {
    return <div ref={reader} className={styles.reader}><p className={styles.loading}>Loading zine…</p></div>;
  }

  return (
    <div ref={reader} className={styles.reader}>
      <HTMLFlipBook
        key={compactViewport ? "portrait" : `landscape-${pageWidth}`}
        ref={book}
        className={`stf__parent ${styles.flipBook} ${compactViewport ? styles.portraitBook : ""} ${bookPosition}`}
        style={{}}
        width={pageWidth}
        height={pageHeight}
        size="stretch"
        minWidth={220}
        maxWidth={pageWidth}
        minHeight={310}
        maxHeight={pageHeight}
        startPage={currentPage}
        startZIndex={0}
        autoSize
        drawShadow
        maxShadowOpacity={0.45}
        flippingTime={900}
        usePortrait={compactViewport}
        showCover
        mobileScrollSupport
        swipeDistance={30}
        clickEventForward={false}
        useMouseEvents
        showPageCorners
        disableFlipByClick={false}
        renderOnlyPageLengthChange
        onInit={(event) => {
          setCurrentPage(event.data.page);
          setIsLandscape(event.data.mode === "landscape");
          setCoverDensity(event.object, event.data.mode);
          syncPageScale(event.object.getBoundsRect().pageWidth);
        }}
        onChangeOrientation={(event) => {
          setCurrentPage(event.object.getCurrentPageIndex());
          setIsLandscape(event.data === "landscape");
          setCoverDensity(event.object, event.data);
          window.requestAnimationFrame(() => syncPageScale(event.object.getBoundsRect().pageWidth));
        }}
        onFlip={(event) => {
          setCurrentPage(event.data);
          setIsTurning(false);
          setTurnDirection(null);
        }}
        onChangeState={(event) => {
          if (event.data !== "flipping") return;
          setIsTurning(true);
          const direction = event.object.getFlipController().getCalculation().getDirection() === 0 ? "forward" : "backward";
          setTurnDirection(direction);
        }}
      >
        {pages.map(page => <ZineLeaf key={`${page.src}-${page.side}`} page={page} markup={pageMarkup[page.src]} />)}
      </HTMLFlipBook>

      <div className={styles.controls}>
        <button type="button" onClick={() => {
          const pageFlip = book.current?.pageFlip();
          if (!pageFlip) return;
          setIsTurning(true);
          setTurnDirection("backward");
          pageFlip.flipPrev();
        }} disabled={currentPage === 0} aria-label="Previous zine page">←</button>
        <span aria-live="polite">{currentPage + 1} / {pages.length}</span>
        <button type="button" onClick={() => {
          const pageFlip = book.current?.pageFlip();
          if (!pageFlip) return;
          setIsTurning(true);
          setTurnDirection("forward");
          pageFlip.flipNext();
        }} disabled={currentPage >= pages.length - 1} aria-label="Next zine page">→</button>
      </div>
    </div>
  );
}
