import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import type { CaseStudy } from "../_content/types";
import { CaseStudyBlocks } from "./CaseStudyBlocks";
import CaseStudyToc from "./CaseStudyToc";
import CaseStudyReveal from "./CaseStudyReveal";
import SuppressReturnSplash from "./SuppressReturnSplash";
import styles from "./CaseStudyLayout.module.css";

export default function CaseStudyLayout({ project }: { project: CaseStudy }) {
  const hasIntroBlock = project.blocks.some(block => block.type === "intro" || block.type === "creative-intro");
  const sections = project.blocks.filter(block => block.type !== "media" && block.type !== "intro" && block.type !== "creative-intro" && block.type !== "next-project");
  const tocItems = [
    { id: "overview", label: "Overview" },
    ...sections.map(section => ({
      id: section.id,
      label: section.type === "copy"
        ? section.eyebrow ?? section.heading
        : section.type === "heading-image" || section.type === "heading-image-pair" || section.type === "heading" || section.type === "heading-list"
          ? section.heading
          : section.type === "creative-content"
            ? section.label ?? "Preview"
          : section.type === "zine" || section.type === "interactive" || section.type === "gallery"
            ? section.heading
            : "Quote",
    })),
  ];
  return (
    <main className={styles.page}>
      <SuppressReturnSplash />
      <Navbar page="case-study" />

      <div className={styles.layout}>
        <CaseStudyToc key={`toc-${project.slug}`} items={tocItems} />

        <CaseStudyReveal key={`content-${project.slug}`} className={styles.article} projectSlug={project.slug}>
          {!hasIntroBlock && <header id="overview" className={styles.intro}>
            <p className={styles.label}>{project.label}</p>
            <h1>{project.title}</h1>
            <p className={styles.date}>{project.date}</p>
            <div className={styles.rule} />
            <p className={styles.year}>{project.year}</p>
            <p className={styles.summary}>{project.summary}</p>
          </header>}
          <CaseStudyBlocks blocks={project.blocks} projectSlug={project.slug} />
        </CaseStudyReveal>
      </div>

      <Footer className={styles.footer} backHref="#overview" />
    </main>
  );
}
