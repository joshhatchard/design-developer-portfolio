import type { CaseStudy } from "./types";

const canvas: CaseStudy = {
  slug: "canvas",
  title: "First Nations support page",
  label: "University of Sydney",
  year: "2025",
  date: "November 2025 · 3 weeks",
  summary: "One Canvas hub for First Nations allied health students, designed, built and handed over in three weeks.",
  blocks: [
    { type: "intro", id: "overview", heading: "First Nations Student Support", company: "University of Sydney", date: "November 2025", preview: { caption: "The finished page on mobile.", aspectRatio: "16 / 7" }, facts: [{ label: "Role", value: "UX/UI Designer & Developer" }, { label: "Team", value: "Solo, working with a supervisor" }, { label: "Timeline", value: "3 weeks, Nov 2025" }, { label: "Tools", value: "Figma, HTML and CSS in Canvas" }], overview: { heading: "Overview", body: "As part of the University of Sydney’s One Sydney, Many People initiative, I designed and built the front page of a student support hub, from information architecture to the coded Canvas page and its handoff documentation." } },
    { type: "heading", id: "context", heading: "Context", body: "Earlier yarning sessions with First Nations health students found that their resources were scattered and the platform didn’t feel relevant to them. They asked for one tailored page. I worked from those findings to design the front door to a content hub that would keep growing." },
    { type: "heading-list", id: "decisions", heading: "Decisions", items: [{ heading: "1. Hub and spoke", body: "I chose a hub-and-spoke structure because it matched the amount of content a page like this needs to hold. Trade-off: it suits steady content better than a constantly growing library.", media: { caption: "The hub-and-spoke model and the first desktop wireframe." } }, { heading: "2. A personal ‘I need help with…’ section", body: "With information alone, the page felt disconnected from the student. This section brings it back to their own questions, and it can be tailored around common ones once it’s live.", media: { caption: "The tailored ‘I need help with…’ section." } }, { heading: "3. A Gadigal Centre block", body: "A support page with no in-person support felt like it was missing something. I added direct Gadigal Centre contact details so the page points to a real person.", media: { caption: "The Gadigal Centre support block." } }] },
    { type: "heading-image", id: "constraint", heading: "Constraint", body: "Canvas limits interaction and styling, so I reworked the grid I had designed and used a flexbox workaround to make it display correctly. The cost: fewer sections visible at once, and more scrolling.", media: { caption: "Editing the page’s HTML in Canvas and the built page preview." } },
    { type: "heading-image", id: "handoff", heading: "Handoff", body: "I built each section as a Figma component, then coded the page in Canvas. It is documented (the code, the problems I hit, and how to use it) so staff can adapt it as the initiative grows.", media: { caption: "The handoff documentation, explaining the code." } },
    { type: "heading-image", id: "outcome", heading: "Outcome", body: "• Designed, built and documented in three weeks, solo.\n• Structured to take new resources and tailored help topics without a redesign.\n• Handed over to my supervisor to carry forward.", media: { caption: "The completed Canvas page, ready for handoff." } },
    { type: "heading", id: "reflection", heading: "Reflection", body: "Canvas behaved differently from typical HTML, and it often altered my code. Next time I would work through its tutorials before building. The design process held up; the surprises only appeared in development." },
    { type: "next-project", id: "next-project", title: "Granic", href: "/work/granic" },
  ],
};

export default canvas;
