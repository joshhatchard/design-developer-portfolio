import type { CaseStudy, CaseStudyGalleryImage } from "./types";

const collection: CaseStudyGalleryImage[] = [
  { src: "/projects/merch/shirtfront.jpg", alt: "SUDATA shirt front", title: "Shirt front", width: 2503, height: 2503 },
  { src: "/projects/merch/shirtback.jpg", alt: "SUDATA shirt back", title: "Shirt back", width: 2503, height: 2503 },
  { src: "/projects/merch/hoodiefront.jpg", alt: "SUDATA hoodie front", title: "Hoodie front", width: 2503, height: 2503 },
  { src: "/projects/merch/hoodieback.jpg", alt: "SUDATA hoodie back", title: "Hoodie back", width: 2503, height: 2503 },
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
      overview: { heading: "Overview", body: "Designed to be worn with intent, the SUDATA collection puts the mascot front and centre. A sharp blue and white palette creates pieces that feel bold, unified and unmistakably SUDATA." },
    },
    {
      type: "creative-content",
      id: "collection",
      label: "The collection",
      container: { type: "gallery", images: collection },
    },
    { type: "next-project", id: "next-project", title: "SUDATA Logo Redesign", href: "/work/sudata-logo-redesign" },
  ],
};

export default sudataMerchandise;
