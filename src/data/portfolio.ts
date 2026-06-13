export const profile = {
  name: "Mehedi Hasan",
  role: "AI Systems Engineer",
  location: "Dhaka, Bangladesh",
  email: "nafismehedi37@gmail.com",
  github: "https://github.com/Rytnix786",
  linkedin: "https://www.linkedin.com/in/mehedi-hasan-llm",
  resume: "/assets/mehedi-hasan-cv.docx",
  portrait: "/assets/mehedi-hasan-profile.jpg",
  headline:
    "I build AI systems that stay useful when the demo ends and reality starts.",
  summary:
    "CS undergraduate at BRAC University focused on RAG, multi-agent orchestration, backend systems, and products that fail honestly when evidence is missing.",
} as const;

export const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export const metrics = [
  { value: "95%", label: "groundedness on factual QA" },
  { value: "122", label: "backend tests maintained" },
  { value: "8.68ms", label: "p95 TTFB on streamed runs" },
] as const;

export const focusAreas = [
  {
    title: "Grounded RAG",
    description:
      "Hybrid retrieval, evidence checks, refusal calibration, adversarial QA, and evaluation loops.",
  },
  {
    title: "Agentic Workflows",
    description:
      "Stateful LangGraph flows, tool use, memory, checkpoints, streamed execution, and human review.",
  },
  {
    title: "Backend Systems",
    description:
      "FastAPI, Node.js, PostgreSQL, Redis, Supabase, Docker, CI, and observable service boundaries.",
  },
  {
    title: "Product Delivery",
    description:
      "Mobile and web surfaces with offline-first sync, clean APIs, performance budgets, and deployable UX.",
  },
] as const;

export const skillGroups = [
  {
    title: "AI Systems",
    skills: ["LangGraph", "LangChain", "RAG", "LLM evals", "Promptfoo", "LangSmith"],
  },
  {
    title: "Models",
    skills: ["OpenAI", "Mistral", "Ollama", "Prompt engineering", "Refusal calibration"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "Node.js", "Express", "PostgreSQL", "Redis", "Supabase", "Docker"],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Expo"],
  },
] as const;

export const projects = [
  {
    name: "Nexus Researcher",
    eyebrow: "Stateful multi-agent research",
    description:
      "An 8-node LangGraph workflow with four-stage retrieval, human-in-the-loop approval, resumable SSE streaming, and PostgreSQL checkpointing.",
    impact:
      "8.05 req/s under sustained load, 91% refusal accuracy across adversarial cases, and 122 backend tests with zero failures.",
    tech: ["LangGraph", "FastAPI", "PostgreSQL", "SSE", "Redis", "Next.js"],
    href: "https://github.com/Rytnix786",
  },
  {
    name: "MindStack",
    eyebrow: "Production RAG system",
    description:
      "A hybrid BM25 plus ChromaDB retrieval system designed to answer only when supporting evidence is present.",
    impact:
      "Reached 95% groundedness and improved refusal accuracy from 26.67% to 66.67% with CI-backed adversarial tests.",
    tech: ["FastAPI", "React", "Docker", "ChromaDB", "BM25", "Mistral"],
    href: "https://github.com/Rytnix786",
  },
  {
    name: "OFFBoarder",
    eyebrow: "Security-first enterprise platform",
    description:
      "A multi-tenant offboarding platform with strict tenant isolation, RBAC, segregation-of-duties controls, and immutable audit packs.",
    impact:
      "Owned the product end to end: data model, API layer, auth flows, dashboard, workflow orchestration, and audit design.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "RBAC"],
    href: "https://github.com/Rytnix786",
  },
  {
    name: "MaSheba AI",
    eyebrow: "Offline-first healthcare assistant",
    description:
      "A Bangla maternal health platform for mothers and community health workers, built around local persistence and resilient sync.",
    impact:
      "Implemented SQLite sync, Supabase-backed storage, on-device vitals triage, and Bangla clinical chat workflows.",
    tech: ["React Native", "Expo Router", "SQLite", "Supabase", "FastAPI", "PostgreSQL"],
    href: "https://github.com/DigontaDas/MaSheba--AI",
    docs: "https://masheba-docs.vercel.app/docs",
  },
] as const;

export const journey = [
  {
    date: "2022 - 2026",
    title: "BSc in Computer Science",
    org: "BRAC University",
    description:
      "Built production-minded AI systems while completing coursework in algorithms, databases, AI, operating systems, software engineering, and networks.",
  },
  {
    date: "2025",
    title: "AI Systems Builder",
    org: "Independent projects",
    description:
      "Shipped multi-agent, RAG, and full-stack systems with load tests, CI checks, observability hooks, and documented architecture decisions.",
  },
  {
    date: "Now",
    title: "Open to engineering roles",
    org: "Remote-first, UTC+6",
    description:
      "Available for AI engineering, backend systems, full-stack product work, internships, part-time, or full-time roles.",
  },
] as const;
