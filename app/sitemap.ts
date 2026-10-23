import type { MetadataRoute } from "next";
import { projects } from "./work/_content/projects";
import { absoluteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
