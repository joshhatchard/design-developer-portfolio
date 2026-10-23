"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECT_RETURN_SCROLL_KEY } from "./PageTransition";
import styles from "./SiteAudio.module.css";

const MUSIC_PREFERENCE_KEY = "portfolio:music-muted";

export default function SiteAudio() {
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);
  const splashMusicRef = useRef<HTMLAudioElement>(null);
  const mutedRef = useRef(false);
  const audioUnlockedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const backgroundMusic = backgroundMusicRef.current;
    const splashMusic = splashMusicRef.current;
    if (!backgroundMusic || !splashMusic) return;

    try {
      mutedRef.current = window.localStorage.getItem(MUSIC_PREFERENCE_KEY) === "true";
      setIsMuted(mutedRef.current);
    } catch {
      // Audio still works when browser storage is unavailable.
    }
    backgroundMusic.volume = 0.3;
    splashMusic.volume = 0.4;
    const unlockAudio = () => {
      audioUnlockedRef.current = true;
      if (!mutedRef.current && !document.hidden) backgroundMusic.play().catch(() => undefined);
      window.dispatchEvent(new Event("site-audio-enabled"));
    };
    const playSplashMusic = () => {
      const navigationMuteUntil = Number(window.sessionStorage.getItem("portfolio:mute-hero-splash-until") ?? 0);
      if (navigationMuteUntil <= Date.now()) window.sessionStorage.removeItem("portfolio:mute-hero-splash-until");
      if (!audioUnlockedRef.current || mutedRef.current || document.hidden || window.location.pathname !== "/"
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
      } else if (audioUnlockedRef.current && !mutedRef.current) {
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

  const toggleMusic = () => {
    const backgroundMusic = backgroundMusicRef.current;
    const splashMusic = splashMusicRef.current;
    const muted = !mutedRef.current;
    mutedRef.current = muted;
    setIsMuted(muted);
    try {
      window.localStorage.setItem(MUSIC_PREFERENCE_KEY, String(muted));
    } catch {
      // The toggle remains usable without persistence.
    }
    if (muted) {
      backgroundMusic?.pause();
      splashMusic?.pause();
    } else {
      audioUnlockedRef.current = true;
      if (!document.hidden) backgroundMusic?.play().catch(() => undefined);
    }
  };

  return (
    <>
      <audio ref={backgroundMusicRef} src="/audio/xtreme-freddy-bit-beats-4.mp3" preload="none" loop />
      <audio ref={splashMusicRef} src="/audio/water-splash-sound-effect.mp3" preload="none" />
      <button
        className={styles.toggle}
        type="button"
        aria-pressed={!isMuted}
        onClick={toggleMusic}
      >
        {isMuted ? "Sound off" : "Sound on"}
      </button>
    </>
  );
}
