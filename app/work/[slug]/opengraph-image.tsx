import { ImageResponse } from "next/og";
import ShareCard from "../../components/ShareCard";
import { getProject } from "../_content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? "Case study";
  const description = project?.summary ?? "A case study from Josh Hatchard’s design and development portfolio.";

  return new ImageResponse(
    <ShareCard eyebrow={project?.label ?? "Portfolio"} title={title} description={description} />,
    size,
  );
}
