import type { CaseStudy, CaseStudyGalleryImage } from "./types";

const applications: CaseStudyGalleryImage[] = [
  { src: "/projects/logo/variations.png", alt: "SUDATA logo variations", title: "Logo variations", width: 1080, height: 1350 },
  { src: "/projects/logo/colours.png", alt: "SUDATA colour exploration", title: "Colour exploration", width: 1080, height: 1350 },
  { src: "/projects/logo/screens.png", alt: "SUDATA screen applications", title: "Screen applications", width: 1080, height: 1350 },
  { src: "/projects/logo/laptop.png", alt: "SUDATA laptop application", title: "Laptop application", width: 1080, height: 1350 },
];

const sudataLogoRedesign: CaseStudy = {
  slug: "sudata-logo-redesign",
  title: "Logo redesign",
  label: "SUDATA",
  year: "2026",
  date: "April 2026",
  summary: "A refreshed identity for one of the University of Sydney’s largest student communities.",
  blocks: [
    {
      type: "creative-intro",
      id: "overview",
      heading: "SUDATA Logo Redesign",
      company: "SUDATA",
      date: "April 2026",
      overview: { heading: "Overview", body: "With more than 800 members, SUDATA had grown into a major student community, but its identity had not kept pace. The new logo brings together the precision of data science, the confidence of a professional organisation and the energy of community." },
    },
    {
      type: "creative-content",
      id: "applications",
      label: "Identity applications",
      container: { type: "gallery", images: applications, fullWidth: true },
    },
    { type: "next-project", id: "next-project", title: "Interactive Boxes", href: "/work/interactive-boxes" },
  ],
};

export default sudataLogoRedesign;
