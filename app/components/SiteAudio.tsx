"use client";

import { useEffect, useRef } from "react";
import { PROJECT_RETURN_SCROLL_KEY } from "./PageTransition";

export default function SiteAudio() {
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);
  const splashMusicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const backgroundMusic = backgroundMusicRef.current;
    const splashMusic = splashMusicRef.current;
    if (!backgroundMusic || !splashMusic) return;

    backgroundMusic.volume = 0.3;
    splashMusic.volume = 0.4;
    let audioUnlocked = false;
    const unlockAudio = () => {
      audioUnlocked = true;
      if (!document.hidden) backgroundMusic.play().catch(() => undefined);
      window.dispatchEvent(new Event("site-audio-enabled"));
    };
    const playSplashMusic = () => {
      const navigationMuteUntil = Number(window.sessionStorage.getItem("portfolio:mute-hero-splash-until") ?? 0);
      if (navigationMuteUntil <= Date.now()) window.sessionStorage.removeItem("portfolio:mute-hero-splash-until");
      if (!audioUnlocked || document.hidden || window.location.pathname !== "/"
        || window.sessionStorage.getItem("portfolio:skip-hero-splash-on-return") === "true"
        || window.sessionStorage.getItem(PROJECT_RETURN_SCROLL_KEY) !== null
        || navigationMuteUntil > Date.now()) return;
      splashMusic.currentTime = 0;
      splashMusic.play().catch(() => undefined);
    };
    const syncTabAudio = () => {
      if (document.hidden) {
        backgroundMusic.pause();
        splashMusic.pause();
      } else if (audioUnlocked) {
        backgroundMusic.play().catch(() => undefined);
      }
    };

    document.addEventListener("pointerdown", unlockAudio, { once: true, capture: true, passive: true });
    document.addEventListener("keydown", unlockAudio, { once: true, capture: true });
    document.addEventListener("visibilitychange", syncTabAudio);
    window.addEventListener("hero-splash", playSplashMusic);
    return () => {
      document.removeEventListener("pointerdown", unlockAudio, true);
      document.removeEventListener("keydown", unlockAudio, true);
      document.removeEventListener("visibilitychange", syncTabAudio);
      window.removeEventListener("hero-splash", playSplashMusic);
      backgroundMusic.pause();
      splashMusic.pause();
    };
  }, []);

  return (
    <>
      <audio ref={backgroundMusicRef} src="/audio/xtreme-freddy-bit-beats-4.mp3" preload="auto" autoPlay loop />
      <audio ref={splashMusicRef} src="/audio/water-splash-sound-effect.mp3" preload="auto" />
    </>
  );
}
