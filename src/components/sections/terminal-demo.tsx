"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, Play, SquareTerminal, RefreshCw, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

interface TerminalLine {
  text: string;
  type: "input" | "system" | "success" | "error" | "output";
  delay?: number;
}

export function TerminalDemo() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Mehedi Hasan AI Systems Engine v1.0.0 initialized.", type: "system" },
    { text: 'Type "help" to see available systems queries, or click a shortcut below.', type: "system" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-scroll to bottom of terminal container only (avoids scrolling window)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input only when section becomes visible (NOT on page load)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTyping) {
            // Only focus if user has scrolled there intentionally, not on page load
            // Use a small delay to ensure it doesn't fire before page settling
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isTyping]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const executeCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add input to history
    setHistory((prev) => [...prev, { text: `mehedi@systems:~$ ${cmd}`, type: "input" }]);
    setIsTyping(true);

    // Simulate system thinking delay
    await new Promise((resolve) => setTimeout(resolve, 300));

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
      return;
    } else if (trimmed === "query-rag" || trimmed === "query rag") {
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

        // Typewriter streaming simulation
        setHistory((prev) => [...prev, { text: "", type: "output" }]);
        
        let currentText = "";
        const words = fullText.split(" ");
        for (let w = 0; w < words.length; w++) {
          currentText += (w === 0 ? "" : " ") + words[w];
          setHistory((prev) => {
            const nextHistory = [...prev];
            if (nextHistory.length > 0) {
              nextHistory[nextHistory.length - 1] = { text: currentText, type: "output" };
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
      return;
    }

    // Append responses line by line to simulate real output streaming
    for (let i = 0; i < response.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setHistory((prev) => [...prev, response[i]]);
    }

    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input;
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
    <section ref={sectionRef} id="terminal" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#020804] relative">
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#10b981]/5 rounded-full filter blur-[90px] pointer-events-none" />
      
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Interactive Demo"
          title="Query the systems directly. Prove the architecture."
          description="Interactive, simulated terminal showing how Mehedi's systems compute RAG evaluations, process stateful graph routines, and calibrate agent output groundedness."
        />

        {/* Terminal Case Wrapper */}
        <div 
          onClick={focusInput}
          className="mt-12 rounded-2xl border border-white/10 bg-[#020c06]/85 overflow-hidden shadow-2xl shadow-black/80 flex flex-col font-mono text-sm h-[480px]"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#03150a]/90 border-b border-white/5 select-none shrink-0">
            <div className="flex items-center gap-2">
              <SquareTerminal size={16} className="text-[#34d399]" />
              <span className="text-xs font-semibold text-slate-300">mehedi@ai-systems: ~</span>
            </div>
            
            {/* Terminal Buttons */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 border border-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]/30 border border-[#10b981]/50" />
            </div>
          </div>

          {/* Terminal Output Display */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto p-6 space-y-2 select-text scrollbar-thin"
          >
            {history.map((line, idx) => (
              <div 
                key={idx} 
                className={`leading-relaxed whitespace-pre-wrap ${
                  line.type === "input" ? "text-white font-bold" :
                  line.type === "system" ? "text-slate-400" :
                  line.type === "success" ? "text-[#34d399]" :
                  line.type === "error" ? "text-red-400" : "text-emerald-100"
                }`}
              >
                {line.text}
              </div>
            ))}
            
            {/* Blinking loader when system types */}
            {isTyping && (
              <div className="text-slate-400 flex items-center gap-2 select-none">
                <RefreshCw size={14} className="animate-spin text-[#34d399]" />
                <span>Computing pipeline operations...</span>
              </div>
            )}
          </div>

          {/* Terminal Input Line */}
          <div className="px-6 py-4 bg-[#03150a]/60 border-t border-white/5 flex items-center gap-2 shrink-0 select-none">
            <span className="text-[#34d399] font-bold">mehedi@systems:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 bg-transparent text-white focus:outline-none caret-[#10b981]"
              placeholder={isTyping ? "Awaiting processing..." : "Type query or click shortcut below..."}
            />
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
