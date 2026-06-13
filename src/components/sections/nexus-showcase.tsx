"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { ArrowUpRight, Cpu, Database, CheckCircle, Terminal } from "lucide-react";
import { projects } from "@/data/portfolio";

export function NexusShowcase() {
  // Find Nexus Researcher in projects array
  const nexusProject = projects.find(p => p.name === "Nexus Researcher") || projects[0];

  const features = [
    {
      title: "8-Node LangGraph Flow",
      description: "Stateful orchestration mapping planning, Web scraping, synthesis, and revision phases.",
      icon: Cpu,
    },
    {
      title: "4-Stage Retrieval",
      description: "Hybrid vector search, BM25 keyword matching, re-ranking, and factual refuting checks.",
      icon: Database,
    },
    {
      title: "Resumable Streaming",
      description: "Server-Sent Events (SSE) streaming state changes and partial text token outputs dynamically.",
      icon: Terminal,
    },
    {
      title: "Human Review Step",
      description: "Interrupt nodes requiring explicit human approval before proceeding to cost-intensive tasks.",
      icon: CheckCircle,
    }
  ];

  return (
    <div className="w-full bg-slate-950 relative border-y border-white/5">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1974&auto=format&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop"
        title="Nexus Researcher"
        date="Flagship Multi-Agent System"
        scrollToExpand="Scroll to Uncover Architecture"
        textBlend
      >
        <div className="max-w-5xl mx-auto px-4 py-8 text-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
                Flagship Project Overview
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white mt-2">
                Nexus Researcher
              </h2>
            </div>
            <a
              href={nexusProject.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cyan-400 bg-cyan-400 text-slate-950 px-6 font-semibold text-sm transition hover:bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              Explore Repository
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] mb-12">
            <div>
              <p className="text-lg leading-relaxed text-slate-300 mb-6">
                {nexusProject.description}
              </p>
              <p className="text-base leading-relaxed text-cyan-200 border-l-2 border-cyan-500 pl-4 py-1">
                <strong>Sustained Load Impact</strong>: {nexusProject.impact}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Architecture Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {nexusProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.065] px-3.5 py-1 text-xs font-semibold text-cyan-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Node features list */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group rounded-2xl border border-white/5 bg-white/[0.015] p-5 transition hover:border-cyan-500/25 hover:bg-cyan-500/[0.02]"
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-cyan-950/50 border border-cyan-800/30 text-cyan-400 mb-4 transition-transform group-hover:scale-105">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-md font-bold text-white font-display mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
