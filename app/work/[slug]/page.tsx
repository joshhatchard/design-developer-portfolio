import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyLayout from "../_components/CaseStudyLayout";
import { getProject, projects } from "../_content/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "article",
    },
    twitter: { title: project.title, description: project.summary },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudyLayout project={project} />;
}
