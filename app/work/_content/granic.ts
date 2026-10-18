import type { CaseStudy } from "./types";

const granic: CaseStudy = {
  slug: "granic",
  title: "Granic",
  label: "Product design & development",
  year: "2026—present",
  date: "December 2026—present",
  summary: "A deadline tracker that turns a Canvas or Moodle export into one clear list, designed and built solo.",
  blocks: [
    {
      type: "intro",
      id: "overview",
      heading: "Granic",
      company: "Granic",
      date: "December 2026—present",
      preview: { src: "/projects/granic/intro.png", alt: "Granic deadline tracker on a laptop", width: 1280, height: 705, caption: "The My Deadlines table." },
      facts: [
        { label: "Role", value: "Co-founder, UI/UX Designer & Developer" },
        { label: "Team", value: "Started with a co-founder, solo since ideation" },
        { label: "Timeline", value: "Dec 2026 to present" },
        { label: "Link", value: "granic.app (waitlist)" },
        { label: "Tools", value: "Figma, Next.js, React, Tailwind, Postgres (Neon), Vercel", wide: true },
      ],
      overview: { heading: "Overview", body: "Granic is a deadline tracker for university students. They import everything due from Canvas or Moodle and see what’s urgent. I designed the product, brand and landing page, and built it in code." },
    },
    {
      type: "heading",
      id: "context",
      heading: "Context",
      body: "University deadlines are scattered across course platforms. Granic pulls them into one customisable table so students can see what needs doing first. It began as a two-person project. My co-founder helped shape what Granic does during ideation, then stepped back, and I took on all the design and development.",
    },
    {
      type: "heading-list",
      id: "decisions",
      heading: "Decisions",
      items: [
        {
          heading: "1. Test demand before building the full app",
          body: "Before finishing the full app, I put a landing page and waitlist live at granic.app to test whether the idea was worth pursuing as a SaaS. People I’ve spoken to said they like it and would use it, and signups have come in naturally. Trade-off: it’s early signal only. About 12 signups, with no marketing yet, against a target of 1,000.",
          media: { src: "/projects/granic/demand.png", alt: "Granic landing page and waitlist sign-up", width: 1280, height: 633, caption: "The landing page hero and waitlist sign-up." },
        },
        {
          heading: "2. Lead with the product, not a feature grid",
          body: "A plain three-column feature grid looked boring, and it only described the product. I led the landing page with the product itself: an interactive version of the app shows each feature in use.",
          media: { src: "/projects/granic/product.png", alt: "Granic interactive product demonstration", width: 1280, height: 855, caption: "The live page: an interactive demo shows each feature in use." },
        },
        {
          heading: "3. Calendar import over manual entry",
          body: "I made calendar-file import the core feature. Students already live in Canvas and Moodle and export everything that’s due. Typing deadlines in by hand is a big task, and it’s easy to miss an event.",
          media: { src: "/projects/granic/calender%20import.png", alt: "Granic calendar import flow", width: 1280, height: 807, caption: "The problem: export from your LMS, review what was found, then track your semester." },
        },
      ],
    },
    {
      type: "heading-image",
      id: "build",
      heading: "Build",
      body: "I designed in Figma and built it in code with Next.js, React and Tailwind, with Postgres on Neon, hosted on Vercel. The landing page is live as a waitlist at granic.app. The full app is still in development.",
      media: { src: "/projects/granic/build.png", alt: "Granic landing page and waitlist built in code", width: 1280, height: 955, caption: "Building the landing page and waitlist in code." },
    },
    {
      type: "heading-image",
      id: "outcome",
      heading: "Outcome",
      body: "• Landing page and interactive product demo designed and built end to end.\n• Waitlist live at granic.app with about 12 signups before any marketing, against a target of 1,000. Early signal only.\n• People I’ve spoken to said they like the idea and would use it.",
      media: { src: "/projects/granic/outcome.png", alt: "Granic deadline tracker outcome", width: 1280, height: 885, caption: "The Granic deadline tracker." },
    },
    {
      type: "heading",
      id: "reflection",
      heading: "Reflection",
      body: "Building a simple design system before the landing page was my biggest lesson. Solving style and layout together meant the page needed edits, and lost a lot of time refining details I later scrapped. Next time I’d start with the system.",
    },
    { type: "next-project", id: "next-project", title: "First Nations Student Support", href: "/work/canvas" },
  ],
};

export default granic;
