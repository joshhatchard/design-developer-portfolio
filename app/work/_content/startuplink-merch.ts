import type { CaseStudy, CaseStudyGalleryImage } from "./types";

const collection: CaseStudyGalleryImage[] = [
  { src: "/projects/startuplink-merch/tee-pair.png", alt: "StartUpLink t-shirt shown from the front and back", title: "T-shirt system", width: 1914, height: 1237 },
  { src: "/projects/startuplink-merch/hoodie-front.png", alt: "Black StartUpLink hoodie with a small chest mark", title: "Hoodie front", width: 716, height: 716 },
  { src: "/projects/startuplink-merch/hoodie-back.png", alt: "Black StartUpLink hoodie with a graphic back print", title: "Hoodie back", width: 716, height: 716 },
];

const startuplinkMerch: CaseStudy = {
  slug: "startuplink-merch",
  title: "StartUpLink merch",
  label: "Apparel design",
  year: "2026",
  date: "Selected work",
  summary: "A compact apparel system for StartUpLink, pairing understated front marks with a graphic, high-energy back print.",
  blocks: [
    {
      type: "creative-intro",
      id: "overview",
      heading: "StartUpLink Merch",
      company: "Apparel design",
      date: "2026",
      overview: { heading: "Overview", body: "Branded t-shirts for StartupLink, the University of Sydney society connecting founders and startups. The graphic captures a founder’s mindset, aiming above the rest, humbly, the way stars do." },
    },
    {
      type: "creative-content",
      id: "collection",
      label: "The collection",
      container: { type: "gallery", images: collection, fullWidth: true, featuredFirst: true, cropFeatured: true },
    },
    { type: "next-project", id: "next-project", title: "SUDATA Merchandise", href: "/work/sudata-merchandise" },
  ],
};

export default startuplinkMerch;
