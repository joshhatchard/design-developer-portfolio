export type CaseStudyMedia = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption: string;
  aspectRatio?: string;
};

export type CaseStudyGalleryImage = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
};

export type CreativeContainer =
  | { type: "interactive"; src: string; title: string }
  | { type: "zine" }
  | { type: "gallery"; images: CaseStudyGalleryImage[] };

export type CaseStudyBlock =
  | {
    type: "intro";
    id: string;
    heading: string;
    company: string;
    date: string;
    preview: CaseStudyMedia;
    facts: Array<{ label: string; value: string; wide?: boolean }>;
    overview: { heading: string; body: string };
  }
  | { type: "heading-image"; id: string; heading: string; body: string; media: CaseStudyMedia }
  | { type: "heading"; id: string; heading: string; body: string }
  | {
    type: "heading-list";
    id: string;
    heading: string;
    items: Array<{ heading: string; body: string; media: CaseStudyMedia }>;
  }
  | { type: "next-project"; id: string; label?: string; title: string; href: string }
  | { type: "creative-intro"; id: string; heading: string; company: string; date: string; overview: { heading: string; body: string } }
  | { type: "creative-content"; id: string; label?: string; container: CreativeContainer }
  // Legacy blocks remain available while existing project content is migrated.
  | { type: "copy"; id: string; eyebrow?: string; heading: string; body: string }
  | { type: "media"; id: string; src: string; alt: string; width: number; height: number; caption?: string }
  | {
    type: "gallery";
    id: string;
    heading: string;
    images: CaseStudyGalleryImage[];
  }
  | { type: "quote"; id: string; quote: string; attribution?: string }
  | { type: "zine"; id: string; heading: string }
  | { type: "interactive"; id: string; heading: string; src: string; title: string };

export type CaseStudy = {
  slug: string;
  title: string;
  label: string;
  year: string;
  date: string;
  summary: string;
  blocks: CaseStudyBlock[];
};
