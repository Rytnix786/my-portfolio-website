"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Cpu, Compass, Award } from "lucide-react";

interface StoryNode {
  id: string;
  label: string;
  description: string;
  typewriterText: string;
  x: number;
  y: number;
}

interface Milestone {
  id: string;
  date: string;
  title: string;
  org: string;
  summary: string;
  humanStory: string;
  telemetry: { label: string; value: string; percentage: number }[];
  nodes: StoryNode[];
  connections: { from: string; to: string; path: string }[];
}

export function InteractiveStory() {
  const milestones = React.useMemo<Milestone[]>(() => [
    {
      id: "brac",
      date: "2022 - 2026",
      title: "BSc in Computer Science",
      org: "BRAC University",
      summary: "Foundational CS core focusing on OS boundaries, database query optimization, and low-level networking constraints.",
      humanStory: "Learned that model inference is only 5% of a systems engineer's problem; the other 95% is piping data, handling network latency, and keeping state correct. Realized I wanted to build the engineering rails that make AI predictable.",
      telemetry: [
        { label: "Build Health", value: "99.2%", percentage: 99 },
        { label: "System Uptime", value: "99.85%", percentage: 99.8 },
        { label: "Kernel Clock Latency", value: "12ms", percentage: 88 }
      ],
      nodes: [
        {
          id: "brac-1",
          label: "Query Planner",
          description: "Optimizes cost-based SQL execution plans.",
          typewriterText: "mehedi@brac-systems:~$ cat /etc/systems/query_planner.log\n\n[QUERY PLANNER] Optimizing cost-based SQL execution plans...\n[QUERY PLANNER] Scan Type: Index Scan on 'student_id'\n[QUERY PLANNER] Optimization: Replaced nested loop with index lookup, saving 94% CPU cycles.\n\n\"The cheapest query is the one you never run. Execution planning is the art of pruning index tree branches before hitting physical disk sectors.\"\n\n* WHY IT MATTERS: Transitioning from academic SQL to real physical storage constraints taught me how database engines profile execution paths under load.",
          x: 60,
          y: 60
        },
        {
          id: "brac-2",
          label: "Buffer Manager",
          description: "Handles cache replacement policies.",
          typewriterText: "mehedi@brac-systems:~$ check-cache --warm-rate\n\n[BUFFER MANAGER] Cache Warm Rate: 86.4%\n[BUFFER MANAGER] Eviction Policy: LRU (Least Recently Used) with page pin safety\n[BUFFER MANAGER] Thread Lock Contention: 0.04ms (low)\n\n\"Memory caching is a lease on speed. Keep the critical paths warm, and evict the noise with deterministic rules.\"\n\n* WHY IT MATTERS: Keeping page tables warm in buffer pools is identical to the caching layers needed for low-latency LLM streaming outputs.",
          x: 240,
          y: 60
        },
        {
          id: "brac-3",
          label: "OS Scheduler",
          description: "Preemptive scheduler slicing cpu timing.",
          typewriterText: "mehedi@brac-systems:~$ get-cpu --scheduler\n\n[OS SCHEDULER] Active Workers: 12 threads\n[OS SCHEDULER] Algorithm: Round Robin with Priority Escalation\n[OS SCHEDULER] Thread Starvation Events: 0\n\n\"Concurrent scheduling is about fair distribution. Slicing thread slices efficiently prevents resource starvation at API boundaries.\"\n\n* WHY IT MATTERS: Handling CPU-bound threads in preemptive schedulers prepared me to handle asynchronous event loops and FastAPI worker boundaries under load.",
          x: 240,
          y: 180
        },
        {
          id: "brac-4",
          label: "Socket Listener",
          description: "Low-level TCP buffer handling.",
          typewriterText: "mehedi@brac-systems:~$ netstat --tcp-buffers\n\n[SOCKET LISTENER] TCP Buffer allocated: 1.2MB payload queue\n[SOCKET LISTENER] Handshake latency: 0.14ms\n[SOCKET LISTENER] Network packet dropout rate: 0.00%\n\n\"Packets are raw evidence. Listen to the network sockets, buffer the spikes, and stream tokens without dropping a single byte.\"\n\n* WHY IT MATTERS: Understanding TCP streams from raw sockets prepared me to structure high-performance Server-Sent Events (SSE) streaming connections.",
          x: 60,
          y: 180
        }
      ],
      connections: [
        { from: "brac-1", to: "brac-2", path: "M 60 60 L 240 60" },
        { from: "brac-2", to: "brac-3", path: "M 240 60 L 240 180" },
        { from: "brac-3", to: "brac-4", path: "M 240 180 L 60 180" },
        { from: "brac-4", to: "brac-1", path: "M 60 180 L 60 60" }
      ]
    },
    {
      id: "builder",
      date: "2025",
      title: "AI Systems Builder",
      org: "Independent Projects",
      summary: "Shipped flagship multi-agent frameworks, calibrated RAG pipelines, and automated MLOps regression gates.",
      humanStory: "Fully automated AI agents fail easily in the real world. Deployed state checkpointers, human-in-the-loop approvals, and factual grounding classifiers. Focus was moving beyond toy demos to code that handles API rate limits, outbox syncs, and adversarial prompts.",
      telemetry: [
        { label: "QA Groundedness", value: "95.0%", percentage: 95 },
        { label: "p95 TTFB Latency", value: "8.68ms", percentage: 94 },
        { label: "CI Test Coverage", value: "94.2% (122 tests)", percentage: 94 }
      ],
      nodes: [
        {
          id: "builder-1",
          label: "LangGraph Agent",
          description: "Stateful agentic flow coordinator.",
          typewriterText: "mehedi@systems:~$ cat /etc/langgraph/graph.json\n\n[AGENT] Nodes compiled: 8 | Edges compiled: 9\n[AGENT] Postgres Checkpointers: Active\n[AGENT] Human-in-the-loop Intercept: Node 'human_approval' pending validation\n\n\"Predictability is production reality. Stateful graphs with checkpointers ensure complex agent flows can fail, pause, and resume gracefully.\"\n\n* WHY IT MATTERS: Fully automated single-shot agents fail under exceptions. Multi-agent flows require persistent checkpointers so state can be restored.",
          x: 60,
          y: 60
        },
        {
          id: "builder-2",
          label: "RRF Search",
          description: "Reciprocal Rank Fusion hybrid search.",
          typewriterText: "mehedi@systems:~$ query --hybrid \"RRF k=60\"\n\n[RRF RETRIEVER] Dense vectors (ChromaDB): Cosine similarity calculated\n[RRF RETRIEVER] Sparse index (BM25): Token matched\n[RRF RETRIEVER] Fusion Output: 5 documents merged (ranking score: 0.89)\n\n\"Rank fusion balances recall and precision. Blending semantic vector distances with sparse keyword indices catches what embeddings miss.\"\n\n* WHY IT MATTERS: Semantic vector searches fail on exact keyword match queries. Hybrid RRF merges the best of keyword search and vector embeddings.",
          x: 240,
          y: 60
        },
        {
          id: "builder-3",
          label: "Grounding Gate",
          description: "NLI factual entailment checker.",
          typewriterText: "mehedi@systems:~$ inspect --eval-nli\n\n[GROUNDING GATE] Evaluating generator context...\n[GROUNDING GATE] Overlap Score: 0.94\n[GROUNDING GATE] Decision: Groundedness Threshold PASSED (score >= 0.85)\n\n\"Hallucinations are system design failures. A calibrated retrieval boundary refuses to answer when facts are absent. Deterministic refusal is better than confident speculation.\"\n\n* WHY IT MATTERS: Deployed evaluation boundaries using calibrated entailment scores so the LLM refuses to generate when retrieved data lacks evidence.",
          x: 240,
          y: 180
        },
        {
          id: "builder-4",
          label: "SSE Streamer",
          description: "Streams tokens sub-second.",
          typewriterText: "mehedi@systems:~$ listen --sse-streamer\n\n[SSE STREAMER] Stream channel active\n[SSE STREAMER] TTFB: 8.68ms (p95 on sustained load)\n[SSE STREAMER] SSE Status: Streaming dossier payload...\n\n\"Streaming is latency empathy. Delivering partial tokens instantly over Server-Sent Events keeps user interactions fluid while pipelines compute.\"\n\n* WHY IT MATTERS: Large dossier synthesis takes seconds. SSE streaming delivers token chunks instantly to prevent HTTP timeouts and keep UI fast.",
          x: 60,
          y: 180
        }
      ],
      connections: [
        { from: "builder-1", to: "builder-2", path: "M 60 60 L 240 60" },
        { from: "builder-2", to: "builder-3", path: "M 240 60 L 240 180" },
        { from: "builder-3", to: "builder-4", path: "M 240 180 L 60 180" },
        { from: "builder-4", to: "builder-1", path: "M 60 180 L 60 60" }
      ]
    },
    {
      id: "now",
      date: "Now",
      title: "AI Systems Engineer",
      org: "Remote / Open Roles",
      summary: "Ready to deploy secure application boundaries, multi-tenant databases, and resilient offline sync layers.",
      humanStory: "Focused on bridging the gap between database models and API consumers. Designing segregation-of-duties access gateways, offline buffers for low-reception surface areas, and immutable cryptographically-chained logs to trace security operations.",
      telemetry: [
        { label: "Sync Confidence", value: "100.0%", percentage: 100 },
        { label: "Uptime Target", value: "99.99%", percentage: 99.9 },
        { label: "Build Quality Check", value: "PASS", percentage: 95 }
      ],
      nodes: [
        {
          id: "now-1",
          label: "Prisma SoD Guard",
          description: "Application-level role gate.",
          typewriterText: "mehedi@systems:~$ check-access --user mehedi --role admin\n\n[SOD GUARD] Checking task execution policy...\n[SOD GUARD] Creator: 'admin' | Approver: 'sec_officer' (Segregation of Duties match)\n[SOD GUARD] Result: Task Execution AUTHORIZED\n\n\"Access control must be programmatic. Enforcing role checks directly at the database boundaries ensures strict segregation-of-duties.\"\n\n* WHY IT MATTERS: Application security isn't just network rules; it is checking permissions programmatically to ensure admins cannot act unilaterally.",
          x: 60,
          y: 80
        },
        {
          id: "now-2",
          label: "SQLite Queue",
          description: "Offline buffer outbox queue.",
          typewriterText: "mehedi@systems:~$ check-sync --offline-buffer\n\n[OFFLINE SYNC] connection status: OFFLINE\n[OFFLINE SYNC] Buffered write actions: 14 mutations\n[OFFLINE SYNC] Conflict Resolution: Logical microsecond clocks ready\n\n\"Offline resilience is user empathy. Buffering mutations in local SQLite outboxes handles poor network conditions without losing record integrity.\"\n\n* WHY IT MATTERS: Community workers lose cellular signal in remote villages. SQLite buffering queues writes, flushing them transactionally on reconnection.",
          x: 240,
          y: 80
        },
        {
          id: "now-3",
          label: "Crypto Ledger",
          description: "SHA-256 chained audit logs.",
          typewriterText: "mehedi@systems:~$ verify-ledger --hash-chain\n\n[CRYPTO LEDGER] Appending action block #34...\n[CRYPTO LEDGER] Parent Hash: 8b2f...a10c\n[CRYPTO LEDGER] Chain integrity: VALID (verified tamper-proof logs)\n\n\"Audit logs are security anchors. Chaining event hashes cryptographically prevents database tampering, creating an immutable timeline of access.\"\n\n* WHY IT MATTERS: Database audit logs are easy to alter. Append-only ledger hashing ensures access events are permanent, auditable, and traceable.",
          x: 150,
          y: 190
        }
      ],
      connections: [
        { from: "now-1", to: "now-2", path: "M 60 80 L 240 80" },
        { from: "now-2", to: "now-3", path: "M 240 80 L 150 190" },
        { from: "now-3", to: "now-1", path: "M 150 190 L 60 80" }
      ]
    }
  ], []);

  const [activeTab, setActiveTab] = useState<string>("builder");
  const activeMilestone = milestones.find((m) => m.id === activeTab) || milestones[1];
  const defaultNodeId = activeMilestone.nodes[0].id;

  const [selectedNodeId, setSelectedNodeId] = useState<string>(defaultNodeId);
  const activeNode = activeMilestone.nodes.find((n) => n.id === selectedNodeId) || activeMilestone.nodes[0];

  const [terminalText, setTerminalText] = useState<string>("");

  // Update selected node when active tab changes
  useEffect(() => {
    const timer = globalThis.setTimeout(() => setSelectedNodeId(defaultNodeId), 0);
    return () => globalThis.clearTimeout(timer);
  }, [defaultNodeId]);

  // Clean typewriter log effect (using slice() to prevent garbled accumulation)
  useEffect(() => {
    let active = true;
    const targetText = activeNode.typewriterText;
    let i = 0;

    const interval = setInterval(() => {
      if (!active) return;
      if (i <= targetText.length) {
        setTerminalText(targetText.slice(0, i));
        i += 2;
      } else {
        setTerminalText(targetText);
        clearInterval(interval);
      }
    }, 10);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [selectedNodeId, activeNode.typewriterText]);

  // Setup Intersection Observer for vertical scrolling detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when milestone card reaches center 10% viewport window
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const milestoneId = entry.target.id.replace("card-", "");
          setActiveTab(milestoneId);
        }
      });
    }, observerOptions);

    milestones.forEach((m) => {
      const el = document.getElementById(`card-${m.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [milestones]);

  const getMilestoneIcon = (id: string) => {
    switch (id) {
      case "brac":
        return <Compass size={18} className="text-[#34d399]" />;
      case "builder":
        return <Cpu size={18} className="text-[#34d399]" />;
      default:
        return <Award size={18} className="text-[#34d399]" />;
    }
  };

  return (
    <section id="journey" className="bg-[#020804] py-32 px-4 sm:px-6 lg:px-8 relative select-none">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#10b981]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#10b981]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-20">
          <span className="text-sm font-mono text-[#34d399] uppercase tracking-widest block mb-3">
            02 . SYSTEMS TIMELINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            A conciser path, engineered for depth.
          </h2>
          <p className="mt-4 text-slate-400 font-light max-w-2xl text-sm sm:text-base">
            Scroll down vertically. As you read through each milestone card, the visual system architecture map and typewriter terminal update in real-time.
          </p>
        </div>

        {/* Responsive Dual Column Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative mt-16">
          
          {/* LEFT SIDE: Scrolling Milestone Cards (Lg Spans 5 cols) */}
          <div className="lg:col-span-5 relative pl-6 border-l border-white/5 space-y-24 md:space-y-32">
            
            {/* Dynamic visual green timeline path */}
            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-white/5">
              {/* Highlight active card segment */}
              <div 
                className="absolute left-0 w-full bg-[#10b981] shadow-[0_0_8px_#10b981] transition-all duration-500 rounded-full"
                style={{
                  top: activeTab === "brac" ? "0%" : activeTab === "builder" ? "33%" : "66%",
                  height: "34%"
                }}
              />
            </div>

            {milestones.map((m) => {
              const isActive = m.id === activeTab;
              return (
                <div
                  id={`card-${m.id}`}
                  key={m.id}
                  className={`scroll-mt-48 transition-all duration-300 relative ${
                    isActive ? "opacity-100 scale-100" : "opacity-40 scale-[0.97]"
                  }`}
                >
                  {/* Floating timeline dot */}
                  <div 
                    className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full border bg-[#020804] flex items-center justify-center transition-all duration-300 z-10 ${
                      isActive 
                        ? "border-[#34d399] shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                        : "border-white/10"
                    }`}
                  >
                    {getMilestoneIcon(m.id)}
                  </div>

                  {/* Card Content */}
                  <div className="space-y-4">
                    <span className="inline-block font-mono text-[10px] font-semibold text-[#34d399] px-2.5 py-1 rounded border border-[#10b981]/15 bg-[#10b981]/5 uppercase tracking-wider">
                      {m.date}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight leading-none mt-2">
                      {m.title}
                    </h3>
                    <span className="text-sm font-mono text-slate-400 block font-medium">
                      {m.org}
                    </span>
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      {m.summary}
                    </p>

                    {/* Human story box */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mt-2">
                      <span className="text-[10px] font-mono text-[#34d399] uppercase tracking-wider block mb-1">
                        Core Wording & Learnings
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed italic font-light">
                        &quot;{m.humanStory}&quot;
                      </p>
                    </div>

                    {/* Milestone Telemetry */}
                    <div className="space-y-2.5 pt-4 border-t border-white/5">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                        System telemetry specs
                      </span>
                      <div className="space-y-2">
                        {m.telemetry.map((t, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex justify-between text-[11px] font-mono">
                              <span className="text-slate-400">{t.label}</span>
                              <span className="text-[#34d399]">{t.value}</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#10b981] transition-all duration-1000"
                                style={{ width: isActive ? `${t.percentage}%` : "0%" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* MOBILE EXTRA: Stack SVG/Terminal inline on mobile devices */}
                    <div className="block lg:hidden pt-6 space-y-4">
                      <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 flex flex-col items-center justify-center min-h-[220px]">
                        <svg width="100%" height="180" viewBox="0 0 320 240" className="max-w-[240px]">
                          {m.connections.map((c, idx) => (
                            <g key={idx}>
                              <path d={c.path} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                              <path d={c.path} fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4, 12">
                                <animate attributeName="stroke-dashoffset" values="32;0" dur="2.5s" repeatCount="indefinite" />
                              </path>
                            </g>
                          ))}
                          {m.nodes.map((node) => (
                            <g key={node.id} className="select-none">
                              <circle cx={node.x} cy={node.y} r="28" fill="#020c06" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                              <text x={node.x} y={node.y - 4} textAnchor="middle" fill="#cbd5e1" fontSize="9" className="font-mono">{node.label.split(" ")[0]}</text>
                              <text x={node.x} y={node.y + 7} textAnchor="middle" fill="#64748b" fontSize="7" className="font-mono">{node.label.split(" ")[1] || "Core"}</text>
                            </g>
                          ))}
                        </svg>
                      </div>
                      
                      <div className="rounded-xl border border-white/10 bg-[#020c06] p-4 font-mono text-[10px] h-[120px] overflow-y-auto">
                        <div className="text-emerald-100 leading-relaxed">
                          {m.nodes[0].typewriterText}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: Pinned Visual Console Deck (Lg Spans 7 cols) */}
          <div className="hidden lg:block lg:col-span-7 sticky top-28 self-start">
            
            <div className="rounded-[2.2rem] border border-white/10 bg-[#020c06]/35 p-6 backdrop-blur-xl shadow-2xl flex flex-col gap-6">
              
              {/* Interactive SVG Diagram */}
              <div className="relative rounded-2xl border border-white/5 bg-white/[0.01] p-4 flex flex-col items-center justify-center min-h-[260px]">
                <span className="absolute top-3 right-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest select-none">
                  Click Nodes to Inspect
                </span>

                <svg width="100%" height="240" viewBox="0 0 320 240" className="max-w-[320px]">
                  {/* SVG Path Connections with moving particles */}
                  {activeMilestone.connections.map((c, idx) => (
                    <g key={idx}>
                      <path
                        d={c.path}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="2"
                      />
                      <path
                        d={c.path}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="4, 12"
                        className="opacity-70"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="32;0"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  ))}

                  {/* SVG Nodes */}
                  {activeMilestone.nodes.map((node) => {
                    const isSelected = node.id === selectedNodeId;
                    return (
                      <g
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className="cursor-pointer group select-none"
                      >
                        {/* Glow outline circle */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="34"
                          fill="transparent"
                          stroke={isSelected ? "#10b981" : "transparent"}
                          strokeWidth="1.5"
                          className="transition-all duration-300"
                          style={{
                            filter: isSelected ? "drop-shadow(0 0 4px #10b981)" : "none",
                          }}
                        />
                        
                        {/* Node circle background */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="28"
                          fill={isSelected ? "#031c0e" : "#020c06"}
                          stroke={isSelected ? "#34d399" : "rgba(255,255,255,0.1)"}
                          strokeWidth="1.5"
                          className="transition-all duration-300 group-hover:stroke-[#34d399]/60"
                        />
                        
                        {/* Node Labels */}
                        <text
                          x={node.x}
                          y={node.y - 4}
                          textAnchor="middle"
                          fill={isSelected ? "#ffffff" : "#cbd5e1"}
                          fontSize="9"
                          fontWeight={isSelected ? "bold" : "normal"}
                          className="transition-colors font-mono select-none"
                        >
                          {node.label.split(" ")[0]}
                        </text>
                        <text
                          x={node.x}
                          y={node.y + 7}
                          textAnchor="middle"
                          fill={isSelected ? "#34d399" : "#64748b"}
                          fontSize="7"
                          className="transition-colors font-mono select-none"
                        >
                          {node.label.split(" ")[1] || "Core"}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Selected Node info display */}
                <div className="w-full text-center border-t border-white/5 pt-3 select-none">
                  <span className="text-[10px] font-mono text-[#34d399] uppercase tracking-wider block">
                    Selected Module
                  </span>
                  <span className="text-xs text-white font-mono font-semibold">
                    {activeNode.label} — <span className="text-slate-400 font-light font-sans">{activeNode.description}</span>
                  </span>
                </div>
              </div>

              {/* Typewriter System Terminal */}
              <div className="rounded-2xl border border-white/10 bg-[#020c06]/85 overflow-hidden shadow-2xl flex flex-col font-mono text-xs h-[160px]">
                {/* Terminal Title Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#03150a]/90 border-b border-white/5 shrink-0 select-none">
                  <div className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-[#34d399]" />
                    <span className="text-[10px] font-semibold text-slate-300">dossier-packet-streamer.sh</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]/30" />
                  </div>
                </div>

                {/* Terminal Log Screen */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1 select-text scrollbar-thin">
                  <div className="text-emerald-100 whitespace-pre-wrap leading-relaxed">
                    {terminalText}
                    <span className="animate-pulse ml-1 inline-block w-1.5 h-3.5 bg-[#10b981] align-middle" />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
