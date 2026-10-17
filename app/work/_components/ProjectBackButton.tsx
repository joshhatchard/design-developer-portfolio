"use client";

import { usePageTransition } from "../../components/PageTransition";

export default function ProjectBackButton() {
  const { goBack } = usePageTransition();
  const handleBack = () => {
    window.sessionStorage.setItem("portfolio:skip-hero-splash-on-return", "true");
    goBack("/");
  };

  return <button className="projectBack" type="button" onClick={handleBack}>← Back</button>;
}
