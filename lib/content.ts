/**
 * Single source of truth for every word and number shown in the museum.
 * Edit here to update the whole site — the components are purely presentational.
 */

export type SectionId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "resume"
  | "contact";

export const siteConfig = {
  name: "Piyush Gupta",
  firstName: "Piyush",
  monogram: "PG",
  role: "Software Engineer",
  discipline: "Big Data · AI",
  title: "Software Engineer · Big Data & AI",
  email: "piyushgupta2914@gmail.com",
  phone: "+91 9352360322",
  location: "Dehradun, India",
  resumeUrl: "/Piyush-Gupta-Resume.pdf",
  resumeFileName: "Piyush-Gupta-Resume.pdf",
  /** Optional: drop a photo into /public and set e.g. "/piyush.jpg" to replace the monogram. */
  photo: "",
  socials: {
    github: "https://github.com/pg-2004",
    linkedin: "https://www.linkedin.com/in/piyush-gupta-aab999237/",
    leetcode: "https://leetcode.com/u/pg_29/",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Exhibits — framed works hung on the gallery wall (the navigation)   */
/* ------------------------------------------------------------------ */

export interface ExhibitDef {
  id: SectionId;
  label: string;
  index: string;
  /** tiny museum-placard caption shown beneath the frame */
  caption: string;
}

export const EXHIBITS: ExhibitDef[] = [
  { id: "about", label: "About", index: "01", caption: "The maker" },
  { id: "experience", label: "Experience", index: "02", caption: "Where I've built" },
  { id: "projects", label: "Projects", index: "03", caption: "Selected works" },
  { id: "skills", label: "Skills", index: "04", caption: "The toolkit" },
  { id: "resume", label: "Resume", index: "05", caption: "On one page" },
  { id: "contact", label: "Contact", index: "06", caption: "Say hello" },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  intro: [
    "I'm Piyush — a final-year Computer Science engineer specialising in Big Data at UPES, Dehradun. I like turning ambiguous ideas into clean, fast, well-considered software.",
    "Lately I build AI-driven products and data-heavy web apps end to end — currently shipping Prometrix.ai, an AI-agent marketplace, at EYAS Ventures.",
  ],
  timeline: [
    { year: "2026", title: "AI & Software Developer Intern", place: "EYAS Ventures" },
    { year: "2025", title: "Full-Stack & Web Internships", place: "Groove · Auratech" },
    { year: "2022", title: "B.Tech CSE — Big Data", place: "UPES, Dehradun · CGPA 8.13" },
    { year: "2021", title: "Senior Secondary — 96.8%", place: "ROYAL ACA, Jaipur" },
  ],
  funFacts: [
    { icon: "map", text: "Based in Dehradun, India" },
    { icon: "cap", text: "B.Tech CSE · Big Data @ UPES" },
    { icon: "award", text: "Azure Data Scientist Associate (DP-100)" },
    { icon: "leetcode", text: "Competitive coder · LeetCode @pg_29" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  initials: string;
  highlights: string[];
  tech: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "EYAS Ventures",
    role: "AI & Software Developer Intern",
    location: "Delhi, India",
    period: "Feb 2026 — Present",
    initials: "EV",
    highlights: [
      "Developed and deployed Prometrix.ai — a live SaaS marketplace of AI agents for marketing automation across SEO, Ads, Content, Social and Analytics workflows.",
      "Integrated analytics-driven dashboards and automation flows supporting KPI tracking and campaign optimisation.",
      "Built modular AI-agent discovery interfaces that let businesses activate specialised marketing agents on demand.",
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "Zustand", "Framer Motion", "Python", "FastAPI", "Pydantic", "JWT", "Supabase", "PostgreSQL"],
  },
  {
    company: "Groove Innovations",
    role: "Full-Stack Developer Intern",
    location: "Hyderabad, India · Remote",
    period: "Jun 2025 — Jul 2025",
    initials: "GI",
    highlights: [
      "Architected dashboard components for a form-builder platform, improving day-to-day user interaction.",
      "Engineered a file & folder management system supporting structured storage and sharing of 100+ files.",
      "Introduced organised navigation and file-linking to make the workspace easier to use.",
    ],
    tech: ["React", "TypeScript", "Node.js", "REST APIs"],
  },
  {
    company: "Auratech Services",
    role: "Web Development Intern",
    location: "Jaipur, India · Remote",
    period: "Mar 2025 — Apr 2025",
    initials: "AS",
    highlights: [
      "Built a Python–Django dashboard that processed and displayed 500+ records for real-time monitoring.",
      "Optimised backend data-retrieval pipelines, cutting dashboard load time by ~25%.",
      "Delivered a centralised monitoring interface integrating multiple data sources.",
    ],
    tech: ["Python", "Django", "SQL", "REST APIs"],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface ProjectItem {
  title: string;
  period: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  /** monogram shown on the placeholder artwork */
  mark: string;
  /** CSS gradient for the placeholder artwork (kept neutral, per palette) */
  art: string;
}

export const projects: ProjectItem[] = [
  {
    title: "AI-Based Web Component Generator",
    period: "Jan 2025 — May 2025",
    tagline: "Natural language → production-ready UI",
    description:
      "An AI studio that turns plain-language prompts into production-ready UI components and previews them live in the browser via WebContainers. The Claude API translates instructions into semantic HTML, CSS and React — cutting UI build time by ~30%.",
    tech: ["React", "TypeScript", "TailwindCSS", "WebContainers", "Claude API"],
    github: siteConfig.socials.github,
    mark: "AI",
    art: "linear-gradient(135deg, #f3f3f0 0%, #deded9 55%, #c9c9c2 100%)",
  },
  {
    title: "University Feedback Analysis",
    period: "Aug 2024 — Nov 2024",
    tagline: "Sentiment at scale · 1,000+ responses",
    description:
      "A sentiment-analysis system that classifies 1,000+ student feedback responses into positive, negative and neutral. Text preprocessing and sentiment scoring surface actionable insight, powered by Apache Lucene and Stanford CoreNLP in Java.",
    tech: ["Java", "Apache Lucene", "Stanford CoreNLP", "NLP"],
    github: siteConfig.socials.github,
    mark: "UF",
    art: "linear-gradient(135deg, #eeeeea 0%, #d7d7d1 60%, #c2c2bb 100%)",
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { label: "Languages", items: ["C", "Java", "Python", "Scala", "Rust", "Kotlin", "JavaScript", "TypeScript"] },
  { label: "Big Data", items: ["Hadoop", "Spark", "Kafka"] },
  { label: "Web", items: ["React", "Node.js", "Express.js", "Django", "FastAPI", "HTML", "CSS", "TailwindCSS"] },
  { label: "Databases", items: ["SQL", "MongoDB"] },
  { label: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Linux", "REST APIs", "OpenGL", "Apache Lucene", "OpenCV"] },
  { label: "Foundations", items: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "AI / ML"] },
];

/* ------------------------------------------------------------------ */
/* Resume                                                              */
/* ------------------------------------------------------------------ */

export const education = [
  { school: "UPES, Dehradun", detail: "B.Tech CSE — Big Data · CGPA 8.13 / 10", period: "2022 — Present" },
  { school: "ROYAL ACA Sr. Sec. School, Jaipur", detail: "Senior Secondary (XII) · 96.80%", period: "2020 — 2021" },
];

export const certifications = [
  "Azure Data Scientist Associate (DP-100) — Microsoft, 2026",
  "Innovation Through Design — University of Sydney (Coursera), 2024",
  "BigQuery — Google Cloud (Coursera), 2024",
  "Hackathon 8.0 — CSI UPES, 2024",
  "Learning How to Learn — Coursera, 2022",
];
