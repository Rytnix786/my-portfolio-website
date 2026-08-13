"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, GitBranch, ShieldCheck, Cpu, Database, CheckCircle2, Terminal, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";

import { InteractiveArchitectureGraph } from "@/components/ui/interactive-architecture-graph";

interface ProjectDrawerProps {
  project: (typeof projects)[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  // Prevent background body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#020804] border-l border-white/10 p-6 sm:p-8 overflow-y-auto shadow-2xl flex flex-col justify-between font-sans select-text scrollbar-thin"
          >
            <div className="space-y-8">
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono border border-[#10b981]/30 bg-[#10b981]/10 text-[#34d399] tracking-wider uppercase">
                    {project.eyebrow}
                  </span>
                  <Link
                    href={`/work/${project.slug}`}
                    onClick={onClose}
                    className="text-xs font-mono text-[#34d399] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Full Case Study Page</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Case Study"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {project.name}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* System Impact Badge */}
              <div className="rounded-2xl border border-[#10b981]/20 bg-[#10b981]/5 p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#34d399] uppercase tracking-wider">
                  <ShieldCheck size={16} />
                  <span>Verified System Impact Metric</span>
                </div>
                <p className="text-sm font-mono text-white font-medium">
                  {project.impact}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block">
                  Technologies & Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-[#10b981]/20 bg-[#10b981]/8 px-3 py-1 text-xs font-mono text-[#34d399]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem Challenge & Solution Approach */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cpu className="text-[#34d399]" size={18} />
                  Problem Constraints & Solution Approach
                </h3>

                <div className="space-y-3 font-light text-sm text-slate-300">
                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-semibold">
                      Problem & Challenge
                    </span>
                    <p className="leading-relaxed">{project.challenge}</p>
                  </div>

                  <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-[#34d399] uppercase tracking-wider block font-semibold">
                      Architectural Solution
                    </span>
                    <p className="leading-relaxed">{project.approach}</p>
                  </div>
                </div>
              </div>

              {/* Interactive Architecture Graph */}
              {project.architecture && (
                <div className="pt-2 border-t border-white/10">
                  <InteractiveArchitectureGraph project={project} />
                </div>
              )}

              {/* Lessons & Engineering Trade-offs */}
              {"lessons" in project && project.lessons ? (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest block">
                    Engineering Takeaways & Trade-offs
                  </h3>

                  <div className="space-y-3">
                    {project.lessons.map((lesson, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-300 font-light bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                        <CheckCircle2 size={16} className="text-[#34d399] shrink-0 mt-0.5" />
                        <span>{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Code Snippet Box */}
              {"codeSnippet" in project && project.codeSnippet ? (
                <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden space-y-0">
                  <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-white/5">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <Terminal size={14} className="text-[#34d399]" />
                      core_implementation_excerpt
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 rounded border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                    >
                      {copiedCode ? "copied!" : "copy code"}
                    </button>
                  </div>
                  <div className="p-4 overflow-x-auto font-mono text-xs text-slate-300 bg-slate-950/80 leading-relaxed max-h-[300px]">
                    <pre className="whitespace-pre">
                      <code>{project.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              ) : null}

              {/* System Execution Spec */}
              <div className="rounded-2xl border border-white/10 bg-[#020c06] p-5 font-mono text-xs space-y-3">
                <div className="flex items-center gap-2 text-slate-400 border-b border-white/5 pb-2">
                  <Database size={14} className="text-[#34d399]" />
                  <span className="font-semibold text-slate-200">Execution Boundary Specs</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Repository Status:</span>
                    <span className="text-[#34d399]">Public Open Source</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Validation Protocol:</span>
                    <span className="text-[#34d399]">Deterministic Integration Tests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Deployment Target:</span>
                    <span className="text-[#34d399]">Production Edge Container</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap gap-3 pt-8 mt-8 border-t border-white/10">
              <Link
                href={`/work/${project.slug}`}
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#10b981] hover:bg-[#34d399] py-3 px-5 text-xs font-semibold text-[#020804] transition-colors"
              >
                Open Full Interactive Case Study ↗
              </Link>

              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 py-3 px-5 text-xs font-mono text-slate-300 transition-colors"
              >
                GitHub Repo
                <GitBranch size={14} />
              </a>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
