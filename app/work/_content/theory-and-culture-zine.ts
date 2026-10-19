import type { CaseStudy } from "./types";

const theoryAndCultureZine: CaseStudy = {
  slug: "theory-and-culture-zine",
  title: "Theory & Culture Zine",
  label: "Publication",
  year: "2025",
  date: "2025",
  summary: "An editorial exploration of the theories, cultures, and systems that shape design.",
  blocks: [
    {
      type: "creative-intro",
      id: "overview",
      heading: "Theory & Culture Zine",
      company: "Publication",
      date: "2025",
      overview: { heading: "Overview", body: "A 32-page zine exploring design theory and culture, designed for print and printed for a zine fair. The digital edition is here." },
    },
    {
      type: "creative-content",
      id: "preview",
      label: "Read the zine",
      container: { type: "zine" },
    },
    { type: "next-project", id: "next-project", title: "Photography", href: "/work/photography" },
  ],
};

export default theoryAndCultureZine;
