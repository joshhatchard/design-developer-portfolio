import type { CaseStudy } from "./types";

const theoryAndCultureZine: CaseStudy = {
  slug: "theory-and-culture-zine",
  title: "Theory & Culture Zine",
  label: "Publication",
  year: "2024",
  date: "2024",
  summary: "An editorial exploration of the theories, cultures, and systems that shape design.",
  blocks: [
    {
      type: "creative-intro",
      id: "overview",
      heading: "Theory & Culture Zine",
      company: "Publication",
      date: "2024",
      overview: { heading: "Overview", body: "An editorial exploration of the theories, cultures and systems that shape design." },
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
