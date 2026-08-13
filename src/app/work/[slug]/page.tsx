"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Cpu, Terminal, Sparkles, BookOpen } from "lucide-react";
import { InteractiveArchitectureGraph } from "@/components/ui/interactive-architecture-graph";
import { projects } from "@/data/portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) {
    notFound();
  }

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
          <div className="mb-16">
            <InteractiveArchitectureGraph project={project} />
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
