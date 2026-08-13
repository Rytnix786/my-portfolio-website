"use client";

import { useEffect, useRef, useState } from "react";
import {
  Terminal as TerminalIcon,
  Play,
  SquareTerminal,
  RefreshCw,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Shield,
  Network,
  Trash2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

import { VisualFlowInspector } from "@/components/ui/visual-flow-inspector";

interface TerminalLine {
  text: string;
  type: "input" | "system" | "success" | "error" | "output";
  delay?: number;
}

const COMMAND_SUGGESTIONS = [
  { cmd: "query-rag", desc: "Audit RAG evidence verification pipeline" },
  { cmd: "query-agent", desc: "Execute stateful 8-node LangGraph agent flow" },
  { cmd: "metrics", desc: "Print production reliability & TTFB metrics" },
  { cmd: "stack", desc: "Render full infrastructure tech stack" },
  { cmd: "about", desc: "Print engineer profile details" },
  { cmd: "clear", desc: "Clear console history buffer" },
];

export function TerminalDemo() {
  const [viewMode, setViewMode] = useState<"console" | "visual">("console");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeNodeStep, setActiveNodeStep] = useState(0);
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Mehedi Hasan AI Systems Engine v1.0.0 initialized.", type: "system" },
    { text: 'Type "help" to see available systems queries, or click a shortcut below.', type: "system" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const trimmedInput = input.trim().toLowerCase();
  const suggestions = (!trimmedInput || isTyping)
    ? []
    : COMMAND_SUGGESTIONS.filter((s) => s.cmd.startsWith(trimmedInput));

  // Auto-scroll to bottom of terminal container only
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = history.map((h) => h.text).join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory([]);
  };

  const executeCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { text: `mehedi@systems:~$ ${cmd}`, type: "input" }]);
    setIsTyping(true);
    setActiveNodeStep(1);

    await new Promise((resolve) => setTimeout(resolve, 250));

    let response: TerminalLine[] = [];

    if (trimmed === "help") {
      response = [
        { text: "Available Commands:", type: "system" },
        { text: "  query-rag     - Audit RAG evidence verification pipeline", type: "system" },
        { text: "  query-agent   - Execute simulated stateful 8-node LangGraph workflow", type: "system" },
        { text: "  metrics       - Print production system reliability metrics", type: "system" },
        { text: "  stack         - Render technical skills structure", type: "system" },
        { text: "  about         - Print engineer profile details", type: "system" },
        { text: "  clear         - Clear terminal display buffer", type: "system" },
      ];
    } else if (trimmed === "clear") {
      setHistory([]);
      setIsTyping(false);
      setActiveNodeStep(0);
      return;
    } else if (trimmed === "query-rag" || trimmed === "query rag") {
      setActiveNodeStep(2);
      response = [
        { text: "⟳ Connecting to ChromaDB & BM25 sparse index...", type: "system" },
        { text: "✓ Dense vector matches: 2 docs (ChromaDB)", type: "success" },
        { text: "✓ Sparse keyword matches: 1 doc (BM25 Index)", type: "success" },
        { text: "⟳ Executing Reciprocal Rank Fusion (RRF, k=60)...", type: "system" },
        { text: "⟳ Running Refusal Calibration / Entailment check...", type: "system" },
        { text: "✓ Calibration score: 0.94 (Groundedness Threshold: 0.85)", type: "success" },
        { text: "→ Context verified. Generation authorized.", type: "output" },
        { text: '→ Output: "MindStack resolves hallucinations at retrieval boundaries. By combining BM25 exact matches with dense embeddings and validating context compatibility via NLI model entailment, we refuse processing when factual evidence is absent, achieving 95% groundedness on QA benchmarks."', type: "output" },
      ];
    } else if (trimmed === "query-agent" || trimmed === "query agent") {
      setActiveNodeStep(3);
      response = [
        { text: "⟳ Compiling state graph (LangGraph) with PostgreSQL checkpointers...", type: "system" },
        { text: "✓ Nodes compiled: 8, Edges compiled: 9", type: "success" },
        { text: "▶ Executing node 'planner': Sub-topic planning completed.", type: "system" },
        { text: "▶ Executing node 'query_generator': Generated 6 query variants.", type: "system" },
        { text: "✓ Entering node 'human_approval': Triggered HITL. Search criteria pre-validated.", type: "success" },
        { text: "▶ Executing node 'web_scraper': Fetching pages in parallel (Okta/Google Search)", type: "system" },
        { text: "✓ scraped 4 endpoints (Redis rate limiter bucket: 16/20 remaining)", type: "success" },
        { text: "▶ Executing node 'refusal_check': Groundedness evaluated. Score: 0.89. Proceeding to compilation.", type: "system" },
        { text: "✓ Node 'synthesizer' completed. 1.4KB research dossier streamed via SSE.", type: "success" },
        { text: "→ Process completed in 1.48s. Checkpoint ID: 'chp_8f0a21'. Sustained load: 8.05 req/s.", type: "output" },
      ];
    } else if (trimmed === "metrics") {
      response = [
        { text: "SYSTEM OPERATIONAL METRICS:", type: "system" },
        { text: "  - Groundedness Score      : 95.0% (Factual QA target: >=92%)", type: "success" },
        { text: "  - Integration Tests       : 122 passed (0 failed, coverage: 94%)", type: "success" },
        { text: "  - Streamed Response latency: 8.68ms (p95 TTFB)", type: "success" },
        { text: "  - API Load Capacity       : 8.05 req/s (Nexus Researcher sustained)", type: "success" },
      ];
    } else if (trimmed === "stack") {
      response = [
        { text: "TECHNICAL INFRASTRUCTURE ARCHITECTURE:", type: "system" },
        { text: "  AI Systems   :: LangGraph, LangChain, RAG, Evals (Promptfoo), LangSmith", type: "success" },
        { text: "  MLOps        :: ARES Eval System, DVC, GitHub Actions, Prometheus, Regression Gates", type: "success" },
        { text: "  Models       :: OpenAI, Mistral, Ollama, Refusal Calibration", type: "success" },
        { text: "  Backend      :: FastAPI, Node.js, Express, PostgreSQL, Redis, Supabase, Docker", type: "success" },
        { text: "  Mobile       :: React Native, Expo Router, SQLite Offline-First, Background Sync", type: "success" },
        { text: "  Frontend     :: Next.js, React, TypeScript, Tailwind CSS", type: "success" },
      ];
    } else if (trimmed === "about") {
      response = [
        { text: "ENGINEER DATA PACKET:", type: "system" },
        { text: "  Name         : Mehedi Hasan", type: "output" },
        { text: "  Location     : Dhaka, Bangladesh (UTC+6)", type: "output" },
        { text: "  Credentials  : CS Undergraduate, BRAC University", type: "output" },
        { text: "  Role         : AI Systems Engineer (Backend + Agent Orchestration + MLOps)", type: "output" },
        { text: "  Strengths    : Grounded RAG · Multi-Agent Flows · Production Mobile Apps · Model Evals", type: "output" },
        { text: "  Design Voice : Factual, production-grade, and grounded.", type: "output" },
      ];
    } else {
      try {
        const res = await fetch("/api/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: cmd }),
        });

        if (!res.ok) {
          throw new Error("Failed to query API");
        }

        const data = await res.json();
        const fullText = data.text || "No response generated.";

        setHistory((prev) => [...prev, { text: "", type: "output" }]);

        const words = fullText.split(" ");
        for (let w = 0; w < words.length; w++) {
          const chunkText = words.slice(0, w + 1).join(" ");
          setHistory((prev) => {
            const nextHistory = [...prev];
            if (nextHistory.length > 0) {
              nextHistory[nextHistory.length - 1] = { text: chunkText, type: "output" };
            }
            return nextHistory;
          });
          await new Promise((resolve) => setTimeout(resolve, 45));
        }
      } catch {
        setHistory((prev) => [
          ...prev,
          { text: "Error: Unable to resolve AI systems query. Connection offline.", type: "error" },
        ]);
      }
      setIsTyping(false);
      setActiveNodeStep(4);
      return;
    }

    for (let i = 0; i < response.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setHistory((prev) => [...prev, response[i]]);
    }

    setIsTyping(false);
    setActiveNodeStep(4);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[selectedIndex].cmd);
      return;
    }

    if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      return;
    }

    if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      return;
    }

    if (e.key === "Enter") {
      const cmd = suggestions.length > 0 ? suggestions[selectedIndex].cmd : input;
      setInput("");
      executeCommand(cmd);
    }
  };

  const handleShortcutClick = (e: React.MouseEvent<HTMLButtonElement>, cmd: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (isTyping) return;
    setInput("");
    executeCommand(cmd);
  };

  return (
    <section ref={sectionRef} id="terminal" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#020804] relative select-none">
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#10b981]/5 rounded-full filter blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Interactive AI Assistant"
          title="Query the systems directly. Prove the architecture."
          description="Interactive terminal & visual flow inspector showing how Mehedi's systems compute RAG evaluations, process stateful graph routines, and calibrate agent output groundedness."
        />

        {/* Outer Container */}
        <div
          onClick={focusInput}
          className="mt-12 rounded-2xl border border-white/10 bg-[#020c06]/85 overflow-hidden shadow-2xl shadow-black/80 flex flex-col font-mono text-sm"
        >
          {/* Enhanced System Telemetry Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#03150a]/95 border-b border-white/5 shrink-0 select-none">
            
            {/* View Mode Toggle Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode("console");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "console"
                    ? "bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <SquareTerminal size={13} />
                <span>Console</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode("visual");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "visual"
                    ? "bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Network size={13} />
                <span>Visual Flow</span>
              </button>
            </div>

            {/* Live System Telemetry Status Badges */}
            <div className="hidden sm:flex items-center gap-4 text-[10px] text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                </span>
                <span className="text-[#34d399] font-medium">ONLINE</span>
              </div>

              <div className="flex items-center gap-1">
                <Zap size={11} className="text-[#34d399]" />
                <span>p95: 8.68ms</span>
              </div>

              <div className="flex items-center gap-1">
                <Shield size={11} className="text-[#34d399]" />
                <span>Evals: 95.0%</span>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                title="Copy Terminal Logs"
                className="p-1.5 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                {copied ? <Check size={14} className="text-[#34d399]" /> : <Copy size={14} />}
              </button>

              <button
                onClick={handleClear}
                title="Clear Output Buffer"
                className="p-1.5 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-red-400 hover:bg-white/10 transition cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* MODE 1: TERMINAL CONSOLE VIEW */}
          {viewMode === "console" && (
            <div className="h-[360px] overflow-y-auto p-6 space-y-2 select-text scrollbar-thin" ref={containerRef}>
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === "input"
                      ? "text-white font-bold"
                      : line.type === "system"
                      ? "text-slate-400"
                      : line.type === "success"
                      ? "text-[#34d399]"
                      : line.type === "error"
                      ? "text-red-400"
                      : "text-emerald-100"
                  }`}
                >
                  {line.text}
                </div>
              ))}

              {isTyping && (
                <div className="text-slate-400 flex items-center gap-2 select-none">
                  <RefreshCw size={14} className="animate-spin text-[#34d399]" />
                  <span>Computing pipeline operations...</span>
                </div>
              )}
            </div>
          )}

          {/* MODE 2: VISUAL FLOW INSPECTOR VIEW */}
          {viewMode === "visual" && (
            <VisualFlowInspector
              activeStep={activeNodeStep}
              onReturnToConsole={() => setViewMode("console")}
            />
          )}

          {/* PERSISTENT INPUT BAR & AUTOCOMPLETION (Visible in both Console & Visual Flow modes) */}
          <div className="relative px-6 py-4 bg-[#03150a]/80 border-t border-white/5 shrink-0">
            {/* Autocompletion Popup */}
            {suggestions.length > 0 && (
              <div className="absolute bottom-full left-6 mb-2 w-72 rounded-xl border border-[#10b981]/30 bg-[#020c06]/95 backdrop-blur-xl p-2 shadow-2xl z-20 space-y-1">
                <div className="text-[9px] font-mono text-slate-500 uppercase px-2.5 py-1 flex justify-between">
                  <span>Command Suggestions</span>
                  <span>Tab to complete</span>
                </div>
                {suggestions.map((s, idx) => (
                  <div
                    key={s.cmd}
                    onClick={(e) => {
                      e.stopPropagation();
                      setInput(s.cmd);
                      focusInput();
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono cursor-pointer flex flex-col transition-colors ${
                      idx === selectedIndex
                        ? "bg-[#10b981]/20 text-[#34d399]"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span className="font-semibold text-[#34d399]">{s.cmd}</span>
                    <span className="text-[10px] text-slate-400 font-sans">{s.desc}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-[#34d399] font-bold">mehedi@systems:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 bg-transparent text-white focus:outline-none caret-[#10b981]"
                placeholder={
                  isTyping ? "Awaiting processing..." : "Type command or custom query (Press Tab to autocomplete)..."
                }
              />
            </div>
          </div>
        </div>

        {/* Shortcuts / Quick queries */}
        <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
          <span className="text-xs text-slate-500 font-mono self-center mr-1.5 uppercase select-none">Quick queries:</span>
          <button
            onClick={(e) => handleShortcutClick(e, "query-rag")}
            disabled={isTyping}
            className="px-4 py-1.5 bg-white/5 border border-white/10 hover:border-[#10b981]/40 text-[#34d399] hover:text-white rounded-full font-mono text-xs transition duration-200 select-none flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            <Play size={10} />
            query-rag
          </button>

          <button
            onClick={(e) => handleShortcutClick(e, "query-agent")}
            disabled={isTyping}
            className="px-4 py-1.5 bg-white/5 border border-white/10 hover:border-[#10b981]/40 text-[#34d399] hover:text-white rounded-full font-mono text-xs transition duration-200 select-none flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            <Play size={10} />
            query-agent
          </button>

          <button
            onClick={(e) => handleShortcutClick(e, "metrics")}
            disabled={isTyping}
            className="px-4 py-1.5 bg-white/5 border border-white/10 hover:border-[#10b981]/40 text-[#34d399] hover:text-white rounded-full font-mono text-xs transition duration-200 select-none flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            <CheckCircle2 size={10} />
            sys-metrics
          </button>

          <button
            onClick={(e) => handleShortcutClick(e, "stack")}
            disabled={isTyping}
            className="px-4 py-1.5 bg-white/5 border border-white/10 hover:border-[#10b981]/40 text-[#34d399] hover:text-white rounded-full font-mono text-xs transition duration-200 select-none flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            <TerminalIcon size={10} />
            print-stack
          </button>
        </div>
      </div>
    </section>
  );
}
