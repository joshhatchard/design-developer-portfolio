import { ImageResponse } from "next/og";
import ShareCard from "./components/ShareCard";
import { siteDescription, siteName } from "./site";

export const alt = "Josh Hatchard — Designer & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <ShareCard eyebrow="Portfolio" title={siteName} description={siteDescription} />,
    size,
  );
}
