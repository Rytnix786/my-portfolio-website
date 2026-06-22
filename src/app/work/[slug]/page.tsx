"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Cpu, BookOpen, Layers, Terminal, Sparkles } from "lucide-react";
import { projects } from "@/data/portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const nodeCoordinates: Record<string, Record<string, { x: number; y: number }>> = {
  "nexus-researcher": {
    planner: { x: 100, y: 60 },
    query_gen: { x: 320, y: 60 },
    hitl: { x: 540, y: 60 },
    scraper: { x: 540, y: 180 },
    extractor: { x: 320, y: 180 },
    refusal: { x: 100, y: 180 },
    synthesizer: { x: 100, y: 300 },
  },
  mindstack: {
    query: { x: 80, y: 120 },
    dense: { x: 280, y: 60 },
    sparse: { x: 280, y: 180 },
    rrf: { x: 480, y: 120 },
    filter: { x: 680, y: 120 },
    generator: { x: 880, y: 120 },
  },
  offboarder: {
    client: { x: 100, y: 80 },
    middleware: { x: 320, y: 80 },
    db_rls: { x: 540, y: 80 },
    revoker: { x: 760, y: 80 },
    audit: { x: 760, y: 220 },
  },
  "masheba-ai": {
    mobile_ui: { x: 100, y: 80 },
    sqlite: { x: 320, y: 80 },
    queue: { x: 540, y: 80 },
    sync_engine: { x: 760, y: 80 },
    gateway: { x: 760, y: 220 },
  },
  // ARES — 8-node layout:
  // Row 1 (y=80):  CI  →  CLI  →  Golden
  // Row 2 (y=220): Evaluators  →  Gate  →  DB
  // Row 3 (y=360): API  →  Dashboard
  "ares": {
    ci:     { x: 80,  y: 80  },
    cli:    { x: 300, y: 80  },
    golden: { x: 520, y: 80  },
    eval:   { x: 80,  y: 220 },
    gate:   { x: 300, y: 220 },
    db:     { x: 520, y: 220 },
    api:    { x: 300, y: 360 },
    dash:   { x: 520, y: 360 },
  }
};


export default function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) {
    notFound();
  }

  const coords = nodeCoordinates[slug] || {};
  const maxCoords = Object.values(coords).reduce(
    (acc, val) => ({
      x: Math.max(acc.x, val.x + 150),
      y: Math.max(acc.y, val.y + 100),
    }),
    { x: 800, y: 400 }
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020804] text-slate-100 font-sans pb-24 relative overflow-hidden">
      {/* Background abstract ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#34d399]/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.02]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 relative z-10">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[#34d399] hover:text-[#6ee7b7] mb-8 group transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Featured Builds
        </Link>

        {/* Header Section */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <span className="text-sm font-mono text-[#34d399] uppercase tracking-widest block mb-3">
            {project.eyebrow}
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
            {project.name}
          </h1>
          
          <p className="text-xl text-slate-300 font-light leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Tech Badges */}
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-3">
                Core Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-mono border border-[#10b981]/20 bg-[#10b981]/5 text-[#34d399]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Impact Metric */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 block mb-2">
                Proven Impact & Scale
              </span>
              <p className="text-[#34d399] font-mono text-sm leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>
        </div>

        {/* Grid: Challenge & Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Cpu className="text-[#34d399] w-6 h-6" />
              The Core Challenge
            </h2>
            <p className="text-slate-300 leading-relaxed font-light">
              {project.challenge}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-[#34d399] w-6 h-6" />
              Technical Approach
            </h2>
            <p className="text-slate-300 leading-relaxed font-light">
              {project.approach}
            </p>
          </div>
        </div>

        {/* Architecture Section */}
        {project.architecture && (
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Layers className="text-[#34d399] w-6 h-6" />
                  System Architecture
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Interactive data-flow layout. Hover/tap a node for subsystem specifications.
                </p>
              </div>
              
              {/* Reset detail view indicator */}
              {selectedNode && (
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-xs font-mono text-[#34d399] hover:underline"
                >
                  Clear Selection
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Interactive SVG Board */}
              <div className="lg:col-span-2 overflow-x-auto border border-white/5 bg-[#020c06]/60 rounded-xl p-4 flex justify-center">
                <div style={{ width: maxCoords.x, height: maxCoords.y }} className="relative">
                  <svg width={maxCoords.x} height={maxCoords.y} className="overflow-visible">
                    <defs>
                      <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="22"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                      </marker>
                    </defs>

                    {/* Draw connections */}
                    {project.architecture.connections.map((rawConn, idx) => {
                      const conn = rawConn as { from: string; to: string; label?: string };
                      const fromNode = coords[conn.from];
                      const toNode = coords[conn.to];
                      if (!fromNode || !toNode) return null;

                      // Draw cubic bezier curve for connection
                      const dx = toNode.x - fromNode.x;
                      const dy = toNode.y - fromNode.y;
                      let pathD = "";
                      
                      if (Math.abs(dy) < 5) {
                        pathD = `M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`;
                      } else {
                        const cx1 = fromNode.x + dx * 0.5;
                        const cy1 = fromNode.y;
                        const cx2 = fromNode.x + dx * 0.5;
                        const cy2 = toNode.y;
                        pathD = `M ${fromNode.x} ${fromNode.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${toNode.x} ${toNode.y}`;
                      }

                      return (
                        <g key={idx}>
                          <path
                            d={pathD}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="1.5"
                            strokeDasharray={selectedNode === conn.from ? "4 4" : "none"}
                            className="transition-all duration-300"
                            style={{ opacity: selectedNode && selectedNode !== conn.from && selectedNode !== conn.to ? 0.25 : 0.6 }}
                            markerEnd="url(#arrow)"
                          />
                          {conn.label && (
                            <text
                              x={(fromNode.x + toNode.x) / 2}
                              y={(fromNode.y + toNode.y) / 2 - 8}
                              textAnchor="middle"
                              fill="#6ee7b7"
                              fontSize="9"
                              className="font-mono bg-[#020804] px-1 select-none opacity-80"
                            >
                              {conn.label}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Draw node circles */}
                    {project.architecture.nodes.map((node) => {
                      const pos = coords[node.id];
                      if (!pos) return null;
                      const isHovered = selectedNode === node.id;

                      return (
                        <g
                          key={node.id}
                          transform={`translate(${pos.x}, ${pos.y})`}
                          className="cursor-pointer"
                          onClick={() => setSelectedNode(node.id)}
                          onMouseEnter={() => setSelectedNode(node.id)}
                        >
                          {/* Pulse Ring */}
                          {isHovered && (
                            <circle
                              r="18"
                              fill="none"
                              stroke="#34d399"
                              strokeWidth="1.5"
                              className="animate-ping opacity-40"
                            />
                          )}
                          <circle
                            r="12"
                            fill="#020804"
                            stroke={isHovered ? "#34d399" : "#10b981"}
                            strokeWidth="2.5"
                            className="transition-all duration-200"
                          />
                          <circle
                            r="4"
                            fill={isHovered ? "#6ee7b7" : "#042f1a"}
                            className="transition-colors duration-200"
                          />
                          {/* Node text label */}
                          <text
                            y="28"
                            textAnchor="middle"
                            fill={isHovered ? "#ffffff" : "#cbd5e1"}
                            fontSize="10"
                            className="font-mono font-semibold select-none"
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Specification Detail Panel */}
              <div className="flex flex-col h-full justify-between">
                <div className="bg-[#020c06]/40 border border-white/5 rounded-xl p-5 min-h-[190px]">
                  {selectedNode ? (
                    (() => {
                      const nodeData = project.architecture.nodes.find((n) => n.id === selectedNode);
                      return (
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono uppercase text-[#34d399] tracking-widest block">
                            Subsystem Detail
                          </span>
                          <h3 className="text-lg font-bold text-white">
                            {nodeData?.label}
                          </h3>
                          <p className="text-xs text-[#34d399] font-mono font-light bg-[#10b981]/5 px-2.5 py-1.5 rounded border border-[#10b981]/15">
                            ID: <span className="text-[#6ee7b7]">{selectedNode}</span>
                          </p>
                          <p className="text-sm text-slate-300 leading-relaxed font-light">
                            {nodeData?.desc}
                          </p>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="h-full flex flex-col justify-center items-center text-center py-6 text-slate-500">
                      <Cpu size={28} className="mb-2 text-slate-600 animate-pulse" />
                      <p className="text-xs font-mono">
                        Hover or tap on nodes in the workflow diagram to audit system operations.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-[11px] font-mono text-slate-500 bg-white/[0.01] rounded-lg p-3 border border-white/5 leading-relaxed">
                  💡 This system represents a stateful data-flow execution loop designed by Mehedi Hasan. Click on nodes to review details.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Snippet Display */}
        <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden mb-16">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-white/5">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <Terminal size={14} className="text-[#34d399]" />
              core_implementation_excerpt
            </span>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 rounded border border-white/10 hover:border-white/20 transition-colors"
            >
              {copiedCode ? "copied!" : "copy code"}
            </button>
          </div>
          <div className="p-6 overflow-x-auto font-mono text-xs text-slate-300 bg-slate-950/80 leading-relaxed max-h-[500px]">
            <pre className="whitespace-pre">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="bg-[#0b0c0f]/10 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-12">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
            <BookOpen className="text-[#34d399] w-6 h-6" />
            Engineering Tradeoffs & Decisions
          </h2>
          <div className="space-y-6">
            {project.lessons.map((lesson, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full bg-[#10b981]/10 text-[#34d399] border border-[#10b981]/20 flex items-center justify-center font-mono text-xs font-semibold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base">
                  {lesson}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
