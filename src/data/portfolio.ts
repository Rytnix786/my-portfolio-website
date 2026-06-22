export const profile = {
  name: "Mehedi Hasan",
  role: "AI Systems Engineer",
  location: "Dhaka, Bangladesh",
  email: "nafismehedi37@gmail.com",
  github: "https://github.com/Rytnix786",
  linkedin: "https://www.linkedin.com/in/mehedi-hasan-llm",
  resume: "/assets/Mehedi_Hasan_Resume_Main.docx",
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
    slug: "nexus-researcher",
    name: "Nexus Researcher",
    eyebrow: "Stateful multi-agent research",
    description:
      "An 8-node LangGraph workflow with four-stage retrieval, human-in-the-loop approval, resumable SSE streaming, and PostgreSQL checkpointing.",
    impact:
      "8.05 req/s under sustained load, 91% refusal accuracy across adversarial cases, and 122 backend tests with zero failures.",
    tech: ["LangGraph", "FastAPI", "PostgreSQL", "SSE", "Redis", "Next.js"],
    href: "https://github.com/Rytnix786/Nexus",
    challenge: 
      "Automated research systems often fail in production because they operate in a single shot. If the LLM enters a bad search query or encounters a broken link, the entire run fails. Furthermore, fully automated agents consume excessive tokens crawling irrelevant content and risk hallucinating synthesis summaries when web sources contain conflicting or sparse evidence.",
    approach: 
      "Designed an 8-node stateful agentic system using LangGraph. The workflow splits research into distinct stages: Planning, Query Formulation, Human Approval (to prune keywords and save costs), Parallel Web Scraping (with Redis-backed rate limiting), Extraction, Grounding Validation, Synthesis, and Refusal Calibration. State is persisted in PostgreSQL using custom checkpointers so interrupted runs can resume instantly from where they stopped. Streaming is achieved viaServer-Sent Events (SSE) for sub-second visual updates.",
    architecture: {
      nodes: [
        { id: "planner", label: "Research Planner", desc: "Deconstructs user prompt into factual sub-topics" },
        { id: "query_gen", label: "Query Generator", desc: "Generates multi-aspect search terms optimized for Google Search API" },
        { id: "hitl", label: "Human Loop Checkpoint", desc: "Interrupts execution for user validation/pruning of search terms" },
        { id: "scraper", label: "Parallel Scraper", desc: "Crawls HTML in parallel using Playwright, bypasses cookie walls" },
        { id: "extractor", label: "Context Extractor", desc: "Extracts key sentences matching sub-topics using dense embeddings" },
        { id: "refusal", label: "Refusal Evaluator", desc: "Verifies if sources have enough evidence; scores groundedness" },
        { id: "synthesizer", label: "Report Synthesizer", desc: "Generates markdown dossier with inline academic citations" },
      ],
      connections: [
        { from: "planner", to: "query_gen" },
        { from: "query_gen", to: "hitl" },
        { from: "hitl", to: "scraper", label: "Approved" },
        { from: "scraper", to: "extractor" },
        { from: "extractor", to: "refusal" },
        { from: "refusal", to: "synthesizer", label: "Groundedness > 0.85" },
        { from: "refusal", to: "planner", label: "Failed (Re-plan)" }
      ]
    },
    lessons: [
      "Initially used Redis for checkpointing but found it inadequate for recovering long-running sessions after server crashes. Migrating checkpointers to PostgreSQL schema-level isolation added 12ms latency, which we neutralized by layering an in-memory cache for warm runs.",
      "Parallel scraping caused rate-limit blocks. Implemented a token-bucket rate limiter in Redis to self-regulate outgoing request spikes."
    ],
    codeSnippet: `// LangGraph Workflow Definition
const workflow = new StateGraph(ResearchState)
  .addNode("planner", planResearch)
  .addNode("query_generator", generateQueries)
  .addNode("human_approval", hitlCheckpoint)
  .addNode("web_scraper", scrapeUrls)
  .addNode("refusal_check", verifyGroundedness)
  .addNode("synthesizer", compileDossier);

workflow.addEdge(START, "planner");
workflow.addEdge("planner", "query_generator");
workflow.addEdge("query_generator", "human_approval");
workflow.addConditionalEdges(
  "human_approval",
  (state) => state.isApproved ? "web_scraper" : "planner"
);
workflow.addEdge("web_scraper", "refusal_check");
workflow.addConditionalEdges(
  "refusal_check",
  (state) => state.score >= 0.85 ? "synthesizer" : "planner"
);
workflow.addEdge("synthesizer", END);

const app = workflow.compile({ checkpointer: postgresCheckpointer });`,
  },
  {
    slug: "mindstack",
    name: "MindStack",
    eyebrow: "Production RAG system",
    description:
      "A hybrid BM25 plus ChromaDB retrieval system designed to answer only when supporting evidence is present.",
    impact:
      "Reached 95% groundedness and improved refusal accuracy from 26.67% to 66.67% with CI-backed adversarial tests.",
    tech: ["FastAPI", "React", "Docker", "ChromaDB", "BM25", "Mistral"],
    href: "https://github.com/Rytnix786/MindStack",
    challenge:
      "Vector-only retrieval models often return irrelevant results for specific keywords or product codes because semantic searches lack word-level exact matches. In production, this causes the LLM generator to hallucinate answers using out-of-context documents rather than admitting it doesn't know.",
    approach:
      "Implemented a hybrid search pipeline. Combined dense vectors (ChromaDB + OpenAI text-embedding-3-small) with sparse indices (BM25) using Reciprocal Rank Fusion (RRF) with a parameter constant (k=60). Developed a Custom Refusal Classifier. Before passing contexts to the generator, a calibrated evaluation step calculates the overlap and entailment scores. If the context fails to support the query premises, the system refuses to answer, preventing hallucinations at the source.",
    architecture: {
      nodes: [
        { id: "query", label: "User Query", desc: "Incoming search query" },
        { id: "dense", label: "ChromaDB Dense", desc: "Retrieves semantic contexts using cosine distance" },
        { id: "sparse", label: "BM25 Sparse", desc: "Retrieves exact keyword matches from token index" },
        { id: "rrf", label: "RRF Merger", desc: "Combines dense & sparse rankings using Reciprocal Rank Fusion" },
        { id: "filter", label: "Evidence Filter", desc: "Evaluates factual grounding; drops unsupported claims" },
        { id: "generator", label: "LLM Generator", desc: "Formulates final, citation-linked markdown answer" }
      ],
      connections: [
        { from: "query", to: "dense" },
        { from: "query", to: "sparse" },
        { from: "dense", to: "rrf" },
        { from: "sparse", to: "rrf" },
        { from: "rrf", to: "filter" },
        { from: "filter", to: "generator", label: "Evidence Check Pass" },
        { from: "filter", to: "query", label: "Refusal Triggered" }
      ]
    },
    lessons: [
      "Found that simple cosine similarity thresholding was too sensitive to formatting changes in docs. Switching to RRF + NLI (Natural Language Inference) entailment classifier stabilized groundedness scores across unstructured documents.",
      "Chunk size optimization is a balancing act. Small chunks (128 tokens) maximized retrieval precision but deprived the generator of surrounding context. Standardized on parent-child chunking (retrieve small, serve large)."
    ],
    codeSnippet: `def reciprocal_rank_fusion(dense_results, sparse_results, k=60):
    fused_scores = {}
    for rank, doc in enumerate(dense_results):
        fused_scores[doc.id] = fused_scores.get(doc.id, 0.0) + 1.0 / (rank + k)
    for rank, doc in enumerate(sparse_results):
        fused_scores[doc.id] = fused_scores.get(doc.id, 0.0) + 1.0 / (rank + k)
    
    # Sort and return combined documents
    sorted_docs = sorted(fused_scores.items(), key=lambda x: x[1], reverse=True)
    return [doc_map[doc_id] for doc_id, _ in sorted_docs[:5]]

def check_groundedness(query, retrieved_chunks):
    entailment_score = nli_model.predict(query, retrieved_chunks)
    if entailment_score < 0.70:
        raise RefusalException("Insufficient supporting evidence in database.")
    return True`,
  },
  {
    slug: "offboarder",
    name: "OFFBoarder",
    eyebrow: "Security-first enterprise platform",
    description:
      "A multi-tenant offboarding platform with strict tenant isolation, RBAC, segregation-of-duties controls, and immutable audit packs.",
    impact:
      "Owned the product end to end: data model, API layer, auth flows, dashboard, workflow orchestration, and audit design.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "RBAC"],
    href: "https://github.com/Rytnix786/OFF-Boarder",
    challenge:
      "Employee offboarding in large companies creates massive security holes if access revocation is not verified or if admins can act unilaterally. Backdoor accounts are frequently left active, and standard SaaS tools do not provide immutable cryptographic auditing, making tampering easy and breach tracing impossible.",
    approach:
      "Built a secure multi-tenant dashboard. Implemented strict Row-Level Security (RLS) on PostgreSQL via Prisma. Enforced Segregation of Duties (SoD) via middleware: the creator of an offboarding task cannot be the approver. Created a cryptographic ledger using SHA-256 hashing where every access revocation action is appended into an immutable, chained audit table, forming a tamper-proof security log.",
    architecture: {
      nodes: [
        { id: "client", label: "Enterprise Admin UI", desc: "Next.js dashboard with strict RBAC views" },
        { id: "middleware", label: "SoD Middleware", desc: "Validates role and checks for creator/approver collisions" },
        { id: "db_rls", label: "Postgres RLS", desc: "Filters queries dynamically at database level based on Tenant ID" },
        { id: "revoker", label: "API Revoker Agent", desc: "Automates API calls to AD/Okta to terminate accounts" },
        { id: "audit", label: "Cryptographic Ledger", desc: "Hashes actions and links them sequentially in a blockchain-style log" }
      ],
      connections: [
        { from: "client", to: "middleware" },
        { from: "middleware", to: "db_rls", label: "Pass" },
        { from: "db_rls", to: "revoker" },
        { from: "revoker", to: "audit" }
      ]
    },
    lessons: [
      "Learned that multi-tenancy at the application layer is prone to leakage. We solved this by enforcing tenant contexts directly inside database connections using PostgreSQL session variables instead of simple WHERE clauses in Prisma.",
      "External API timeouts (e.g. Okta rate limits) caused audit logs to desync. Re-architected revocation to use transactional outbox patterns with dynamic retries."
    ],
    codeSnippet: `// Segregation of Duties Middleware
export async function enforceSegregationOfDuties(req: Request) {
  const user = req.user;
  const taskId = req.params.taskId;
  
  const task = await prisma.offboardingTask.findUnique({
    where: { id: taskId }
  });
  
  if (!task) throw new NotFoundException();
  
  // Creator of the task cannot approve or execute it
  if (task.creatorId === user.id) {
    throw new ForbiddenException(
      "Segregation of Duties Enforced: Creators cannot approve their own tasks."
    );
  }
  
  if (!user.roles.includes("SEC_OFFICER")) {
    throw new UnauthorizedException("Security approval credentials required.");
  }
  
  return true;
}`,
  },
  {
    slug: "masheba-ai",
    name: "MaSheba AI",
    eyebrow: "Offline-first healthcare assistant",
    description:
      "A Bangla maternal health platform for mothers and community health workers, built around local persistence and resilient sync.",
    impact:
      "Implemented SQLite sync, Supabase-backed storage, on-device vitals triage, and Bangla clinical chat workflows.",
    tech: ["React Native", "Expo Router", "SQLite", "Supabase", "FastAPI", "PostgreSQL"],
    href: "https://github.com/DigontaDas/MaSheba--AI",
    docs: "https://masheba-docs.vercel.app/docs",
    challenge:
      "Community healthcare workers in rural Bangladesh travel to remote villages with poor or non-existent cellular reception. When offline, medical worker applications often crash or lose vital patient records, while online-only systems prevent record inputs, leaving critical symptoms untriaged.",
    approach:
      "Developed a robust offline-first architecture for React Native using SQLite (via Expo SQLite) for local persistence. Designed a background sync queue that buffers write operations locally with auto-incrementing sequencing. Upon network detection, a sync engine flushes the queue via transactional payloads to Supabase, automatically resolving schema conflicts using last-write-wins and client-side merge policies.",
    architecture: {
      nodes: [
        { id: "mobile_ui", label: "React Native UI", desc: "Bengali interface displaying offline triage widgets" },
        { id: "sqlite", label: "Local SQLite DB", desc: "Instant local reads and writes with zero latency" },
        { id: "queue", label: "Outbox Sync Queue", desc: "Buffers serialized mutations while offline" },
        { id: "sync_engine", label: "Sync Coordinator", desc: "Listens for online states, coordinates batches" },
        { id: "gateway", label: "FastAPI Gateway", desc: "Validates payloads, inserts into centralized Supabase DB" }
      ],
      connections: [
        { from: "mobile_ui", to: "sqlite" },
        { from: "sqlite", to: "queue" },
        { from: "queue", to: "sync_engine" },
        { from: "sync_engine", to: "gateway", label: "Network Restored" }
      ]
    },
    lessons: [
      "UUID collisons and out-of-order execution were common in early sync cycles. We replaced sequential integers with client-side UUID v4s and tracked timestamps down to microseconds, establishing logical clocks to handle conflict resolution.",
      "Large media uploads (e.g. photos of prescriptions) choked cellular connections. Wrote background chunked upload queues that resume from the byte offset on reconnection."
    ],
    codeSnippet: `// SQLite Outbox Sync Queue Handler
export async function flushSyncQueue() {
  const pendingMutations = await db.all(
    "SELECT * FROM sync_queue ORDER BY timestamp ASC LIMIT 50"
  );
  
  if (pendingMutations.length === 0) return;
  
  try {
    const response = await fetch("https://api.masheba.ai/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mutations: pendingMutations })
    });
    
    if (response.ok) {
      const idsToDelete = pendingMutations.map(m => m.id);
      await db.run(
        \`DELETE FROM sync_queue WHERE id IN (\${idsToDelete.join(",")})\`
      );
    }
  } catch (error) {
    console.error("Sync batch failed. Will retry on network state change.", error);
  }
}`,
  },
  {
    slug: "ares",
    name: "ARES",
    eyebrow: "ML model evaluation & promotion gate",
    description:
      "A Python 3.11+ model regression detection system that evaluates candidates against a golden dataset, compares them to the live champion, applies configurable promotion gate rules, and records every decision trail.",
    impact:
      "92%+ pytest coverage enforced in CI, idempotent evaluations keyed by commit SHA, configurable F1/accuracy/latency/slice regression gates, full Prometheus observability, and a Streamlit operator dashboard.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Redis", "Streamlit", "Docker", "GitHub Actions", "DVC"],
    href: "https://github.com/Rytnix786/Ares",
    challenge:
      "ML teams promoting models without rigorous evidence create silent production regressions: a model with a higher aggregate accuracy score can still fail on critical demographic slices or underperform on latency. Most pipelines lack idempotent evaluation records, champion history, and configurable slice-specific gates — making repeatable and auditable promotion decisions impossible.",
    approach:
      "Built ARES as a full evaluation orchestration system. The core is a configurable `rules_engine` that checks candidate metrics against the active champion across F1, accuracy, precision, recall, critical slice performance, model size, and statistical significance. Evaluations are keyed by `commit_sha + golden_set_version + model_name` for idempotency. Results are persisted via async SQLAlchemy into PostgreSQL, exposed through a FastAPI API with API-key auth and rate limiting, and surfaced in a Streamlit dashboard with leaderboard, drill-down, drift monitor, and promotion workflow pages. GitHub Actions workflows gate every PR with quality and regression checks.",
    architecture: {
      nodes: [
        { id: "ci", label: "GitHub Actions", desc: "quality.yml / regression_gate.yml / drift_monitor.yml trigger evaluations on each PR" },
        { id: "cli", label: "Evaluation CLI", desc: "scripts/run_evaluation.py orchestrates the full evaluation run" },
        { id: "golden", label: "Golden Set Validator", desc: "Validates checksum, row counts, class balance, and slice distributions" },
        { id: "eval", label: "Evaluators", desc: "BaseEvaluator + concrete classification/regression/detection evaluators" },
        { id: "gate", label: "Promotion Gate", desc: "rules_engine applies F1, accuracy, latency, slice, and significance gates" },
        { id: "db", label: "PostgreSQL DB", desc: "SQLAlchemy models store runs, champions, drift reports, audit logs" },
        { id: "api", label: "FastAPI API", desc: "Authenticated endpoints with Prometheus instrumentation and webhooks" },
        { id: "dash", label: "Streamlit Dashboard", desc: "Leaderboard, drill-down, drift monitor, and promotion workflow UI" },
      ],
      connections: [
        { from: "ci", to: "cli" },
        { from: "cli", to: "golden" },
        { from: "golden", to: "eval" },
        { from: "eval", to: "gate" },
        { from: "gate", to: "db", label: "Persist Decision" },
        { from: "db", to: "api" },
        { from: "api", to: "dash" },
        { from: "gate", to: "api", label: "Promoted / Rejected" },
      ]
    },
    lessons: [
      "Aggregate metrics hide slice-level regressions. A model improving overall F1 by 2% can lose 15% on a specific demographic slice. Implementing mandatory critical-slice gates revealed real regressions that were previously invisible.",
      "Idempotent evaluations are non-negotiable in CI. Without commit-SHA + golden-set-version keying, re-running pipelines on the same commit produced duplicated records that corrupted the champion leaderboard."
    ],
    codeSnippet: `# ARES Promotion Gate — rules_engine.py
class RulesEngine:
    def __init__(self, config: GateConfig):
        self.config = config
    
    def evaluate(self, candidate: EvalResult, champion: EvalResult) -> GateDecision:
        failures = []
        
        # Core metric regression gates
        for metric, threshold in self.config.metric_gates.items():
            delta = candidate.metrics[metric] - champion.metrics[metric]
            if delta < -threshold:
                failures.append(
                    f"{metric} regressed {delta:.4f} (gate: {threshold})"
                )
        
        # Critical slice gates (e.g. specific demographics or edge cases)
        for slice_name, min_f1 in self.config.critical_slices.items():
            if candidate.slices[slice_name]["f1"] < min_f1:
                failures.append(
                    f"Critical slice '{slice_name}' failed (f1={candidate.slices[slice_name]['f1']:.3f} < {min_f1})"
                )
        
        # Latency gate
        if candidate.p95_latency_ms > self.config.max_latency_ms:
            failures.append(f"Latency {candidate.p95_latency_ms}ms exceeds gate {self.config.max_latency_ms}ms")
        
        return GateDecision(
            passed=len(failures) == 0,
            failures=failures,
            narrative=self._build_narrative(candidate, champion, failures)
        )`,
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
