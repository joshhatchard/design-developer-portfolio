import type { CaseStudy } from "./types";

const interactiveBoxes: CaseStudy = {
  slug: "interactive-boxes",
  title: "Interactive Boxes",
  label: "Creative coding",
  year: "2025",
  date: "2025",
  summary: "A playful p5.js sketch where a field of geometric tiles can be split, merged, rotated, and transformed in place.",
  blocks: [
    {
      type: "creative-intro",
      id: "overview",
      heading: "Interactive Boxes",
      company: "Creative coding",
      date: "2025",
      overview: { heading: "Overview", body: "A playful p5.js sketch where a field of geometric tiles can be split, merged, rotated and transformed in place." },
    },
    {
      type: "creative-content",
      id: "play",
      label: "Play with the boxes",
      container: { type: "interactive", src: "/creative/interactive-boxes/index.html", title: "Interactive Boxes creative coding experiment" },
    },
    { type: "next-project", id: "next-project", title: "Theory & Culture Zine", href: "/work/theory-and-culture-zine" },
  ],
};

export default interactiveBoxes;
