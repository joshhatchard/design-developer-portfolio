import type { CaseStudy, CaseStudyGalleryImage } from "./types";

const collection: CaseStudyGalleryImage[] = [
  { src: "/projects/merch/1%20wide.png", alt: "SUDATA merchandise collection overview", title: "Merchandise collection", width: 1996, height: 1331 },
  { src: "/projects/merch/2.png", alt: "SUDATA merchandise application 02", title: "Merchandise application", width: 980, height: 1331 },
  { src: "/projects/merch/3.png", alt: "SUDATA merchandise application 03", title: "Merchandise application", width: 888, height: 1332 },
  { src: "/projects/merch/4.png", alt: "SUDATA merchandise application 04", title: "Merchandise application", width: 1066, height: 1332 },
  { src: "/projects/merch/5.png", alt: "SUDATA merchandise application 05", title: "Merchandise application", width: 978, height: 1332 },
];

const sudataMerchandise: CaseStudy = {
  slug: "sudata-merchandise",
  title: "Merchandise",
  label: "SUDATA",
  year: "2026",
  date: "May 2026",
  summary: "A campus merchandise collection that brings a bold, neobrutalist identity to SUDATA apparel.",
  blocks: [
    {
      type: "creative-intro",
      id: "overview",
      heading: "SUDATA Merchandise",
      company: "SUDATA",
      date: "May 2026",
      overview: { heading: "Overview", body: "A hoodie and jacket range that puts SUDATA’s identity on the people who make the society. The team received the pieces, and the wider community can buy them." },
    },
    {
      type: "creative-content",
      id: "collection",
      label: "The collection",
      container: { type: "gallery", images: collection, fullWidth: true, featuredFirst: true, uniformTiles: true },
    },
    { type: "next-project", id: "next-project", title: "SUDATA Logo Redesign", href: "/work/sudata-logo-redesign" },
  ],
};

export default sudataMerchandise;
