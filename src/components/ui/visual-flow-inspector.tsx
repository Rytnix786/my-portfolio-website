"use client";

import React, { useState, memo } from "react";
import { Cpu, ShieldCheck, Database, Zap, Sparkles, Terminal, Activity } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  shortLabel: string;
  badge: string;
  x: number;
  y: number;
  icon: React.ElementType;
  description: string;
  metrics: { label: string; value: string }[];
  codeSnippet: string;
}

const FLOW_NODES: NodeData[] = [
  {
    id: "input",
    name: "User Query Ingestion",
    shortLabel: "Input",
    badge: "API REST / SSE",
    x: 50,
    y: 80,
    icon: Terminal,
    description: "Ingests visitor system query, applies string normalization, and strips malicious payload vectors.",
    metrics: [
      { label: "Rate Limit Bucket", value: "20 req/min" },
      { label: "Payload Sanitizer", value: "Strict Regex" },
      { label: "Ingestion Latency", value: "0.2ms" },
    ],
    codeSnippet: `const query = sanitizeInput(req.body.message);\nconst stream = createSSEResponseChannel(query);`,
  },
  {
    id: "rrf",
    name: "Reciprocal Rank Fusion (RRF)",
    shortLabel: "RRF Search",
    badge: "ChromaDB + BM25",
    x: 160,
    y: 80,
    icon: Database,
    description: "Executes hybrid retrieval combining dense vector similarity (ChromaDB) with sparse keyword matching (BM25) using RRF k=60 rank fusion.",
    metrics: [
      { label: "Vector Index", value: "ChromaDB Cosine" },
      { label: "Sparse Index", value: "BM25 Tokenizer" },
      { label: "RRF Constant (k)", value: "60" },
      { label: "Top-K Retrieved", value: "5 Documents" },
    ],
    codeSnippet: `def rrf_merge(dense, sparse, k=60):\n  scores = {d.id: 1/(r+k) for r, d in enumerate(dense)}\n  for r, d in enumerate(sparse):\n    scores[d.id] += 1/(r+k)\n  return sorted(scores, reverse=True)[:5]`,
  },
  {
    id: "refusal",
    name: "Grounded Refusal Calibration",
    shortLabel: "Refusal Gate",
    badge: "NLI Entailment",
    x: 270,
    y: 80,
    icon: ShieldCheck,
    description: "Evaluates retrieved contexts against query premises using NLI entailment scoring to refuse generation if evidence is absent.",
    metrics: [
      { label: "Grounding Score", value: "0.94 (Pass >= 0.85)" },
      { label: "Refusal Accuracy", value: "91% Adversarial" },
      { label: "Hallucination Floor", value: "0.00%" },
    ],
    codeSnippet: `if entailment_score < 0.85:\n  raise RefusalException("Insufficient evidence in context.")`,
  },
  {
    id: "agent",
    name: "LangGraph State Agent",
    shortLabel: "Agent Loop",
    badge: "Postgres Checkpointer",
    x: 380,
    y: 80,
    icon: Cpu,
    description: "Coordinates an 8-node stateful workflow with parallel web scrapers, human approval checkpoints, and Postgres session persistence.",
    metrics: [
      { label: "Compiled Nodes", value: "8 Nodes / 9 Edges" },
      { label: "State Checkpointer", value: "PostgreSQL" },
      { label: "Sustained Load", value: "8.05 req/s" },
    ],
    codeSnippet: `workflow.addNode("planner", plan)\nworkflow.addNode("scraper", scrape)\nworkflow.addNode("eval", evaluate)`,
  },
  {
    id: "output",
    name: "SSE Dossier Streamer",
    shortLabel: "Output Stream",
    badge: "TTFB 8.68ms",
    x: 490,
    y: 80,
    icon: Zap,
    description: "Delivers chunked Markdown responses and inline academic citations over Server-Sent Events with sub-10ms time-to-first-byte.",
    metrics: [
      { label: "p95 TTFB Latency", value: "8.68ms" },
      { label: "Stream Format", value: "text/event-stream" },
      { label: "Citation Mapping", value: "Inline Factual" },
    ],
    codeSnippet: `for chunk in llm.stream(prompt):\n  yield f"data: {chunk}\\n\\n"`,
  },
];

interface VisualFlowInspectorProps {
  activeStep: number;
  onReturnToConsole?: () => void;
}

export const VisualFlowInspector = memo(function VisualFlowInspector({
  activeStep,
  onReturnToConsole,
}: VisualFlowInspectorProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("rrf");
  const selectedNode = FLOW_NODES.find((n) => n.id === selectedNodeId) || FLOW_NODES[1];

  return (
    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4 select-none font-mono text-xs">
      {/* Header Info */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#10b981]/25 bg-[#10b981]/10 text-[#34d399] text-[10px] tracking-wider uppercase">
          <Activity size={12} className="animate-pulse" />
          <span>GPU-Accelerated 60 FPS Pipeline Trace</span>
        </div>
        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
          System Dataflow & Factual Verification Architecture
        </h4>
      </div>

      {/* Hardware-Accelerated Interactive SVG Canvas */}
      <div className="relative rounded-2xl border border-white/10 bg-[#020704]/80 p-4 flex flex-col items-center justify-center min-h-[200px] shadow-2xl">
        <span className="absolute top-3 right-4 text-[9px] text-slate-500 uppercase tracking-widest">
          Click nodes to inspect specs
        </span>

        <svg width="100%" height="150" viewBox="0 0 540 150" className="max-w-2xl overflow-visible">
          {/* Background Connecting Lines */}
          <path d="M 50 75 L 160 75" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" fill="none" />
          <path d="M 160 75 L 270 75" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" fill="none" />
          <path d="M 270 75 L 380 75" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" fill="none" />
          <path d="M 380 75 L 490 75" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" fill="none" />

          {/* GPU Compositor Animated Packet Paths */}
          <path d="M 50 75 L 160 75" stroke="#10b981" strokeWidth="2.5" fill="none" className="animate-flow-dash opacity-80" />
          <path d="M 160 75 L 270 75" stroke="#10b981" strokeWidth="2.5" fill="none" className="animate-flow-dash opacity-80" />
          <path d="M 270 75 L 380 75" stroke="#10b981" strokeWidth="2.5" fill="none" className="animate-flow-dash opacity-80" />
          <path d="M 380 75 L 490 75" stroke="#10b981" strokeWidth="2.5" fill="none" className="animate-flow-dash opacity-80" />

          {/* SVG Nodes */}
          {FLOW_NODES.map((node, index) => {
            const isSelected = node.id === selectedNodeId;
            const isActive = activeStep === 0 || activeStep >= index + 1;
            const NodeIcon = node.icon;

            return (
              <g
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className="cursor-pointer group"
              >
                {/* Active glow ring */}
                <circle
                  cx={node.x}
                  cy={75}
                  r="28"
                  fill="none"
                  stroke={isSelected ? "#34d399" : isActive ? "rgba(16, 185, 129, 0.4)" : "transparent"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Main Node Circle */}
                <circle
                  cx={node.x}
                  cy={75}
                  r="22"
                  fill={isSelected ? "#042c17" : "#020c06"}
                  stroke={isSelected ? "#34d399" : isActive ? "#10b981" : "rgba(255,255,255,0.15)"}
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover:stroke-[#34d399]"
                />

                {/* Node Icon */}
                <foreignObject x={node.x - 10} y={65} width="20" height="20" className="pointer-events-none">
                  <div className="w-full h-full flex items-center justify-center">
                    <NodeIcon size={14} className={isSelected ? "text-[#34d399]" : isActive ? "text-emerald-400" : "text-slate-500"} />
                  </div>
                </foreignObject>

                {/* Node Labels */}
                <text
                  x={node.x}
                  y={112}
                  textAnchor="middle"
                  fill={isSelected ? "#ffffff" : "#cbd5e1"}
                  fontSize="10"
                  fontWeight={isSelected ? "bold" : "normal"}
                  className="font-mono transition-colors"
                >
                  {node.shortLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Node Specification Panel */}
      <div className="rounded-2xl border border-white/10 bg-[#020c06] p-4 space-y-3 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#34d399]" />
            <span className="font-bold text-white text-sm">{selectedNode.name}</span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-[10px] border border-[#10b981]/30 bg-[#10b981]/10 text-[#34d399]">
            {selectedNode.badge}
          </span>
        </div>

        <p className="text-slate-300 text-xs font-light font-sans leading-relaxed">
          {selectedNode.description}
        </p>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
          {selectedNode.metrics.map((m, idx) => (
            <div key={idx} className="bg-white/[0.02] p-2 rounded-xl border border-white/5 space-y-0.5">
              <span className="text-[9px] text-slate-500 block uppercase tracking-wider">{m.label}</span>
              <span className="text-xs font-bold text-[#34d399] block">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation bar */}
      <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
        <span>Status: <span className="text-[#34d399]">60 FPS Compositor Active</span></span>
        {onReturnToConsole && (
          <button
            onClick={onReturnToConsole}
            className="text-[#34d399] hover:underline cursor-pointer font-semibold"
          >
            Switch to Console View →
          </button>
        )}
      </div>
    </div>
  );
});
