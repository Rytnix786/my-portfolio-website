import { NextResponse } from "next/server";
import { focusAreas, profile, projects, skillGroups } from "@/data/portfolio";

type GeminiPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
  finishReason?: string;
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
};

const INCOMPLETE_ENDINGS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "because",
  "by",
  "for",
  "from",
  "in",
  "including",
  "into",
  "like",
  "of",
  "on",
  "or",
  "such",
  "that",
  "the",
  "through",
  "to",
  "with",
  "while",
  "achieving",
]);

function extractCandidate(data: GeminiResponse) {
  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.map((part) => part.text ?? "").join("").trim() ?? "";
  return {
    text,
    finishReason: candidate?.finishReason ?? "UNKNOWN",
  };
}

function isCompleteAnswer(text: string, finishReason: string) {
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (finishReason === "MAX_TOKENS") return false;
  if (!/[.!?]$/.test(trimmed)) return false;

  const lastWord = trimmed
    .replace(/[.!?]+$/, "")
    .split(/\s+/)
    .at(-1)
    ?.toLowerCase();

  return !lastWord || !INCOMPLETE_ENDINGS.has(lastWord);
}

const PROJECT_ALIASES: Record<string, string[]> = {
  "nexus-researcher": ["nexus", "nexus researcher", "research agent", "multi agent research"],
  mindstack: ["mindstack", "mind stack", "rag system", "production rag"],
  offboarder: ["offboarder", "off boarder", "off-boarder", "offboarding"],
  "masheba-ai": ["masheba", "ma sheba", "masheba ai", "healthcare", "maternal", "bangla"],
  ares: ["ares", "model evaluation", "promotion gate", "regression gate", "mlops"],
};

function normalizeQuery(message: string) {
  return message
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentenceList(items: readonly string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function findMentionedProjects(normalized: string) {
  return projects.filter((project) => {
    const candidates = [
      project.name.toLowerCase(),
      project.slug.replace(/-/g, " "),
      ...(PROJECT_ALIASES[project.slug] ?? []),
    ];
    return candidates.some((candidate) => normalized.includes(candidate));
  });
}

function projectAnswerFor(normalized: string) {
  const matchedProjects = findMentionedProjects(normalized);

  if (matchedProjects.length > 0) {
    return matchedProjects
      .map((project) => {
        const tech = project.tech.slice(0, 5).join(", ");
        return `${project.name}: ${project.description} Impact: ${project.impact} Core tech: ${tech}.`;
      })
      .join(" ");
  }

  if (/(project|projects|build|builds|portfolio|work|case stud)/i.test(normalized)) {
    const names = projects.map((project) => project.name);
    return `Mehedi Hasan's key projects are ${sentenceList(names)}. They cover multi-agent research, grounded RAG, enterprise security, offline-first healthcare, and ML model evaluation workflows.`;
  }

  return null;
}

function skillAnswerFor(normalized: string) {
  if (/(backend|api|server|database|postgres|redis|supabase|docker)/i.test(normalized)) {
    return "Mehedi Hasan's backend work centers on FastAPI, Node.js, Express, PostgreSQL, Redis, Supabase, Docker, and observable service boundaries, applied across Nexus Researcher, MindStack, OFFBoarder, MaSheba AI, and ARES.";
  }

  if (/(rag|retrieval|grounded|hallucination|refusal|evidence)/i.test(normalized)) {
    return "Mehedi Hasan builds grounded RAG systems with hybrid retrieval, evidence checks, refusal calibration, adversarial QA, and evaluation loops, most clearly shown in MindStack and Nexus Researcher.";
  }

  if (/(agent|langgraph|workflow|orchestration|checkpoint|sse)/i.test(normalized)) {
    return "Mehedi Hasan's agentic workflow work uses LangGraph, stateful checkpoints, human review, SSE streaming, and refusal checks to make multi-step AI systems recoverable and grounded.";
  }

  if (/(mobile|react native|expo|offline|sqlite|sync|health)/i.test(normalized)) {
    return "Mehedi Hasan's mobile strength is offline-first React Native delivery with Expo, SQLite, Supabase, sync queues, and resilient healthcare workflows, demonstrated through MaSheba AI.";
  }

  if (/(frontend|next|react|typescript|tailwind|ui|web)/i.test(normalized)) {
    return "Mehedi Hasan builds web interfaces with Next.js, React, TypeScript, and Tailwind CSS, pairing polished UI with backend and AI-system workflows.";
  }

  if (/(skill|stack|technology|technologies|tool|tools)/i.test(normalized)) {
    const groups = skillGroups.map((group) => `${group.title}: ${group.skills.join(", ")}`);
    return `Mehedi Hasan's stack includes ${groups.join("; ")}.`;
  }

  return null;
}

function profileAnswerFor(normalized: string) {
  if (/^(hi|hello|hey|who r u|who are you)\b/i.test(normalized)) {
    return "Hello! I am Mehedi Hasan's AI Systems Assistant. I can answer questions about his systems engineering profile, credentials, projects, skills, resume, and contact details.";
  }

  if (/(who is|about mehedi|about him|about you|profile|background|education|university|brac)/i.test(normalized)) {
    return `${profile.name} is an ${profile.role} in ${profile.location}. ${profile.summary}`;
  }

  if (/(focus|area|speciali|strength|do you do|does he do)/i.test(normalized)) {
    const areas = focusAreas.map((area) => `${area.title}: ${area.description}`);
    return `Mehedi Hasan focuses on ${areas.join(" ")}`;
  }

  if (/(how good|is he good|good\?|strong|capable|skill)/i.test(normalized)) {
    return "Mehedi Hasan is a strong AI Systems Engineer with grounded RAG experience, multi-agent workflow design, backend integration testing, and production mobile delivery across projects like Nexus Researcher, MindStack, MaSheba AI, and ARES.";
  }

  if (/(resume|cv)/i.test(normalized)) {
    return `Mehedi Hasan's updated resume is available at ${profile.resume}.`;
  }

  if (/(contact|email|hire|role|intern)/i.test(normalized)) {
    return `Mehedi Hasan is open to AI engineering, backend systems, and full-stack AI roles; he can be reached at ${profile.email}.`;
  }

  return null;
}

function localAnswerFor(message: string) {
  const normalized = normalizeQuery(message);

  return (
    projectAnswerFor(normalized) ??
    skillAnswerFor(normalized) ??
    profileAnswerFor(normalized)
  );
}

function fallbackAnswer(message: string) {
  return (
    localAnswerFor(message) ??
    "I can only answer questions related to Mehedi Hasan's systems engineering profile, credentials, projects, and contact details."
  );
}

export async function POST(request: Request) {
  let incomingMessage = "";

  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    incomingMessage = String(message);

    const localAnswer = localAnswerFor(incomingMessage);
    if (localAnswer) {
      return NextResponse.json({ text: localAnswer });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ text: fallbackAnswer(incomingMessage) });
    }

    const systemInstruction = `You are the AI Systems Assistant for Mehedi Hasan (AI Systems Engineer). You are running inside Mehedi's personal developer portfolio page in an interactive terminal shell.
Your goal is to answer visitor questions in a professional, grounded, and concise tone.

Mehedi Hasan's Profile:
- Name: Mehedi Hasan
- Role: AI Systems Engineer (CS undergraduate at BRAC University, Dhaka, Bangladesh, UTC+6)
- Contact Email: nafismehedi37@gmail.com
- GitHub: https://github.com/Rytnix786
- LinkedIn: https://www.linkedin.com/in/mehedi-hasan-llm
- Resume: /assets/Mehedi_Hasan_Resume_Main.docx
- Headline: "I build AI systems that stay useful when the demo ends and reality starts."
- Core philosophy: Grounded RAG, strict schema validation, refusal calibration, deterministic error paths, and extensive integration testing.
- Additional strength: Ships production mobile apps (React Native / Expo / SQLite) for offline-first use in low-connectivity environments.

Operational Metrics:
- 95.00% groundedness on factual QA benchmarks.
- 122 backend integration tests maintained with 0 failures.
- 8.68ms p95 TTFB on streamed runs.

Key Projects:
1. Nexus Researcher (Stateful multi-agent research)
   - Tech: LangGraph, FastAPI, PostgreSQL, SSE, Redis, Next.js.
   - Repo: https://github.com/Rytnix786/Nexus
   - Impact: Sustained 8.05 req/s under load, 91% refusal accuracy on adversarial queries, 122 tests.
   - Details: 8-node stateful workflow with parallel scraping, vector retrieval, refusal check, planner, and synthesizer.
2. MindStack (Production RAG system)
   - Tech: FastAPI, React, Docker, ChromaDB, BM25, Mistral.
   - Repo: https://github.com/Rytnix786/MindStack
   - Impact: 95% groundedness, refusal accuracy improved from 26.67% to 66.67%.
   - Details: Hybrid retrieval (dense ChromaDB + sparse BM25) with reciprocal rank fusion (RRF) and custom NLI validation.
3. OFFBoarder (Security-first enterprise platform)
   - Tech: Next.js, TypeScript, PostgreSQL, Prisma, Supabase.
   - Repo: https://github.com/Rytnix786/OFF-Boarder
   - Impact: Multi-tenant database RLS, auth flows, segregation-of-duties controls, and immutable audit logs.
4. MaSheba AI (Offline-first production mobile healthcare assistant)
   - Tech: React Native, Expo, SQLite, Supabase, FastAPI.
   - Repo: https://github.com/DigontaDas/MaSheba--AI (Collaborator)
   - Impact: Full production mobile app with offline SQLite outbox sync queue, vital-signs triage, Bangla clinical chat, and background chunked upload queues. Demonstrates Mehedi's ability to ship production mobile apps for real-world, low-connectivity environments.
5. ARES (ML Model Regression Detection & Promotion Gate System)
   - Tech: Python 3.11+, FastAPI, SQLAlchemy, PostgreSQL, Redis, Streamlit, Docker, GitHub Actions, DVC, Prometheus.
   - Repo: https://github.com/Rytnix786/Ares
   - Impact: 92%+ pytest coverage enforced in CI, idempotent evaluation records keyed by commit SHA + golden set version, configurable promotion gates for F1/accuracy/latency/critical-slices, full Prometheus observability at /metrics, Streamlit operator dashboard with leaderboard and drift monitor.
   - Details: Evaluates candidate ML models against a golden dataset and the active champion model. Applies configurable regression gate rules (metric deltas, critical slice F1 floors, latency budgets, statistical significance). Every evaluation is idempotent and auditable. GitHub Actions CI gates PRs with quality and regression checks. FastAPI exposes the results with API-key auth and webhooks.

Technical Skills:
- AI Systems: LangGraph, LangChain, RAG, LLM evals, Promptfoo, LangSmith.
- MLOps: ARES model evaluation, Prometheus, DVC, GitHub Actions, regression gates, champion tracking.
- Models: OpenAI, Mistral, Ollama, Refusal calibration.
- Backend: FastAPI, Node.js, Express, PostgreSQL, Redis, Supabase, Docker.
- Frontend: Next.js, React, TypeScript, Tailwind CSS, React Native, Expo.
- Mobile: React Native, Expo Router, SQLite offline-first sync, background upload queues.

Response Rules:
1. Speak in first-person plural or third-person, representing Mehedi's systems or Mehedi himself. Be concise and professional.
2. Ground your answers ONLY in the facts provided above. Do not hallucinate or make up facts.
3. If a visitor asks a question that cannot be answered using the profile details, or is completely unrelated to Mehedi Hasan's professional profile, politely state that you can only answer questions related to Mehedi's systems engineering credentials.
4. Keep answers short (1-3 sentences maximum) to fit the compact terminal console UI layout.
5. Always reply in complete, grammatically correct sentences. Do not truncate your responses or end them abruptly mid-sentence.
6. Handle spelling mistakes, typos, and shorthand queries (e.g., "what ares>?", "ares meaning", "who r u") gracefully by interpreting the user's intent and providing a complete response based on the profile data.
7. Greet visitors warmly and politely if they say hello, hi, hey, or introduce themselves, and invite them to ask questions about Mehedi's profile, credentials, and projects.
8. The final character of every answer must be sentence-ending punctuation: ".", "!", or "?".`;

    const generate = async (prompt: string) => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 512,
            },
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Gemini API error response:", errText);
        throw new Error("Failed to communicate with the Gemini service");
      }

      const data = (await response.json()) as GeminiResponse;
      return extractCandidate(data);
    };

    let result = await generate(incomingMessage);

    if (!isCompleteAnswer(result.text, result.finishReason)) {
      result = await generate(
        `Rewrite a complete answer to this visitor question in 1-2 short sentences. Do not continue a previous sentence; write a complete standalone answer ending with punctuation.\n\nVisitor question: ${incomingMessage}`
      );
    }

    if (!isCompleteAnswer(result.text, result.finishReason)) {
      result = {
        text: fallbackAnswer(incomingMessage),
        finishReason: "FALLBACK",
      };
    }

    return NextResponse.json({ text: result.text.trim() });
  } catch (error: unknown) {
    console.error("API route error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    if (message === "Failed to communicate with the Gemini service") {
      return NextResponse.json({ text: fallbackAnswer(incomingMessage) });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
