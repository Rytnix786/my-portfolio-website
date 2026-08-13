"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { projects } from "@/data/portfolio";

interface ArchitectureGraphProps {
  project: (typeof projects)[number];
}

interface NodeCoords {
  x: number;
  y: number;
}

const PROJECT_COORDS: Record<string, Record<string, NodeCoords>> = {
  "nexus-researcher": {
    planner: { x: 140, y: 90 },
    query_gen: { x: 500, y: 90 },
    hitl: { x: 860, y: 90 },
    scraper: { x: 860, y: 250 },
    extractor: { x: 500, y: 250 },
    refusal: { x: 140, y: 250 },
    synthesizer: { x: 500, y: 410 },
  },
  mindstack: {
    query: { x: 120, y: 170 },
    dense: { x: 420, y: 80 },
    sparse: { x: 420, y: 260 },
    rrf: { x: 680, y: 170 },
    filter: { x: 880, y: 170 },
    generator: { x: 880, y: 370 },
  },
  offboarder: {
    client: { x: 140, y: 130 },
    middleware: { x: 500, y: 130 },
    db_rls: { x: 860, y: 130 },
    revoker: { x: 500, y: 330 },
    audit: { x: 860, y: 330 },
  },
  "masheba-ai": {
    mobile_ui: { x: 140, y: 130 },
    sqlite: { x: 500, y: 130 },
    queue: { x: 860, y: 130 },
    sync_engine: { x: 500, y: 330 },
    gateway: { x: 860, y: 330 },
  },
  ares: {
    ci: { x: 140, y: 90 },
    cli: { x: 500, y: 90 },
    golden: { x: 860, y: 90 },
    eval: { x: 140, y: 250 },
    gate: { x: 500, y: 250 },
    db: { x: 860, y: 250 },
    api: { x: 500, y: 410 },
    dash: { x: 860, y: 410 },
  },
};

export function InteractiveArchitectureGraph({ project }: ArchitectureGraphProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  if (!project.architecture) return null;

  const coords = PROJECT_COORDS[project.slug] || {};
  const nodes = project.architecture.nodes;
  const connections = project.architecture.connections;
  const activeNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : nodes[0];

  return (
    <div className="bg-[#020c06]/95 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-[#34d399] text-[10px] font-mono tracking-widest uppercase">
            <Radio size={13} className="animate-pulse" />
            <span>Full-Width System Architecture Canvas</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interactive Target Node Diagram & Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-3xl">
            Prominent enlarged node targets with 60 FPS glowing green packet streams. Click or hover any node target to inspect subsystem specifications.
          </p>
        </div>

        {selectedNodeId && (
          <button
            onClick={() => setSelectedNodeId(null)}
            className="text-xs font-mono text-[#34d399] hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Clear Selection</span>
          </button>
        )}
      </div>

      <div className="space-y-8">
        {/* 100% FULL-WIDTH SCALED SVG CANVAS */}
        <div className="w-full relative border border-white/10 bg-[#020704]/90 rounded-2xl p-6 shadow-inner overflow-hidden select-none">
          <span className="absolute top-4 right-5 text-[10px] font-mono text-slate-500 uppercase tracking-widest z-20 pointer-events-none">
            100% Scaled SVG Canvas (1000 × 480)
          </span>

          <div className="w-full relative py-2">
            <svg
              viewBox="0 0 1000 480"
              className="w-full h-auto overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <marker
                  id="green-arrow-head"
                  viewBox="0 0 10 10"
                  refX="32"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
              </defs>

              {/* Render Animated Connections */}
              {connections.map((rawConn, idx) => {
                const conn = rawConn as { from: string; to: string; label?: string };
                const fromNode = coords[conn.from];
                const toNode = coords[conn.to];

                if (!fromNode || !toNode) return null;

                const isConnected =
                  selectedNodeId === conn.from || selectedNodeId === conn.to;

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
                    {/* Background Connection Curve */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isConnected ? "#34d399" : "#10b981"}
                      strokeWidth={isConnected ? "4.5" : "3"}
                      className="transition-all duration-300 opacity-45"
                      markerEnd="url(#green-arrow-head)"
                    />

                    {/* 60 FPS GPU Compositor Animated Packet Flow */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="4.5"
                      className="animate-flow-dash opacity-95"
                    />

                    {/* Edge Label Badge */}
                    {"label" in conn && conn.label && (
                      <g transform={`translate(${(fromNode.x + toNode.x) / 2}, ${(fromNode.y + toNode.y) / 2 - 14})`}>
                        <rect
                          x="-65"
                          y="-13"
                          width="130"
                          height="26"
                          rx="6"
                          fill="#020804"
                          stroke="#10b981"
                          strokeWidth="1.5"
                          className="opacity-95 shadow-lg"
                        />
                        <text
                          textAnchor="middle"
                          y="4"
                          fill="#6ee7b7"
                          fontSize="13"
                          className="font-mono font-bold select-none"
                        >
                          {conn.label}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Render Enlarged Node Target Circles & High-Contrast Titles */}
              {nodes.map((node) => {
                const pos = coords[node.id];
                if (!pos) return null;

                const isSelected = selectedNodeId === node.id || (!selectedNodeId && node.id === activeNode?.id);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setSelectedNodeId(node.id)}
                  >
                    {/* Outer Active Pulse Ring */}
                    {isSelected && (
                      <circle
                        r="34"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="2.5"
                        className="animate-ping opacity-60"
                      />
                    )}

                    {/* Outer Target Circle */}
                    <circle
                      r="22"
                      fill="#020804"
                      stroke={isSelected ? "#34d399" : "#10b981"}
                      strokeWidth={isSelected ? "4.5" : "3.5"}
                      className="transition-all duration-300 group-hover:stroke-[#34d399]"
                    />

                    {/* Inner Core Dot */}
                    <circle
                      r="7.5"
                      fill={isSelected ? "#6ee7b7" : "#10b981"}
                      className="transition-colors duration-200"
                    />

                    {/* Background Text Pill for High Contrast */}
                    <rect
                      x="-90"
                      y="26"
                      width="180"
                      height="24"
                      rx="6"
                      fill="#020804"
                      className="opacity-85"
                    />

                    {/* Node Title Text Below Target Circle */}
                    <text
                      y="43"
                      textAnchor="middle"
                      fill={isSelected ? "#ffffff" : "#f1f5f9"}
                      fontSize="16"
                      className="font-mono font-extrabold select-none tracking-tight transition-colors duration-200"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Subsystem Detail Specification Card (Sleek Horizontal Bottom Inspector) */}
        <div className="rounded-2xl border border-[#34d399]/30 bg-[#03190e] p-6 shadow-2xl font-mono text-xs">
          {activeNode ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="space-y-2 sm:border-r sm:border-white/10 sm:pr-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-[#34d399]" />
                  <span className="font-extrabold text-white text-lg font-sans">{activeNode.label}</span>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#10b981]/40 bg-[#10b981]/15 text-[#34d399] uppercase tracking-wider">
                  ACTIVE SUBSYSTEM
                </span>
              </div>

              <div className="space-y-1 sm:border-r sm:border-white/10 sm:pr-6">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold font-sans">
                  Subsystem Identifier
                </span>
                <span className="text-base font-bold text-[#34d399] block font-mono">
                  {activeNode.id}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold font-sans">
                  Specification & Logic
                </span>
                <p className="text-xs text-slate-200 font-sans font-light leading-relaxed">
                  {activeNode.desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-[#34d399] font-sans">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>Verified Integration State</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
