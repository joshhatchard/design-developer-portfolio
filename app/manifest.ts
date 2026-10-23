import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Josh Hatchard — Designer & Developer",
    short_name: "Josh Hatchard",
    description: "Design and development portfolio of Josh Hatchard.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#C4F13A",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
