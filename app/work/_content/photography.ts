import type { CaseStudy, CaseStudyGalleryImage } from "./types";

const images: CaseStudyGalleryImage[] = [
  { src: "/projects/photography/urban-graffiti.jpg", alt: "Graffiti-covered steel structure", title: "Urban graffiti", width: 1467, height: 2200 },
  { src: "/projects/photography/suburban-dusk.jpg", alt: "Hillside street at dusk", title: "Suburban dusk", width: 1760, height: 2200 },
  { src: "/projects/photography/corner-light.jpg", alt: "Corner shop window beneath an overpass", title: "Corner light", width: 1760, height: 2200 },
  { src: "/projects/photography/blue-tower.jpg", alt: "Curved glass tower against a violet sky", title: "Blue tower", width: 2200, height: 2200 },
  { src: "/projects/photography/night-alley.jpg", alt: "Neon-lit city alley at night", title: "After dark", width: 1760, height: 2200 },
  { src: "/projects/photography/damselfly.jpg", alt: "Damselfly perched on a branch", title: "Stillness", width: 2200, height: 2200 },
  { src: "/projects/photography/skyline-house.jpg", alt: "Sunlit hillside home under a blue sky", title: "High ground", width: 2200, height: 1650 },
  { src: "/projects/photography/golden-street.jpg", alt: "Golden-hour street between homes", title: "Golden street", width: 1760, height: 2200 },
  { src: "/projects/photography/temple-roof.jpg", alt: "Tiered temple roof framed by trees", title: "Temple roof", width: 1760, height: 2200 },
  { src: "/projects/photography/hillside-homes.jpg", alt: "Hillside homes beneath forest", title: "On the hillside", width: 2200, height: 1466 },
  { src: "/projects/photography/painted-houses.jpg", alt: "Colourful painted homes on a hillside", title: "Painted homes", width: 2200, height: 2200 },
  { src: "/projects/photography/forest-road.jpg", alt: "Motorcyclist travelling along a forest road", title: "Forest road", width: 1760, height: 2200 },
];

const photography: CaseStudy = {
  slug: "photography",
  title: "Photography",
  label: "Selected work",
  year: "2024—2026",
  date: "Ongoing archive",
  summary: "An ongoing record of atmosphere, architecture, and the small details that give a place its character.",
  blocks: [
    {
      type: "creative-intro",
      id: "overview",
      heading: "Photography",
      company: "Selected work",
      date: "Ongoing archive",
      overview: { heading: "Overview", body: "An ongoing record of atmosphere, architecture and the small details that give a place its character." },
    },
    {
      type: "creative-content",
      id: "field-notes",
      label: "Field notes",
      container: { type: "gallery", images },
    },
    { type: "next-project", id: "next-project", title: "StartUpLink Merch", href: "/work/startuplink-merch" },
  ],
};

export default photography;
