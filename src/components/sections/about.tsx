"use client";

import Image from "next/image";
import { Download, CheckCircle, XCircle, Award, Target, Terminal } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/portfolio";

export function About() {
  const careAbout = [
    "Grounded evidence loops",
    "Strict schema validation",
    "Deterministic error paths",
    "Extensive integration tests"
  ];

  const avoidList = [
    "Uncalibrated hallucinations",
    "Over-engineered prompts",
    "Brittle loops without memory",
    "Toy demos with zero test coverage"
  ];

  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#020804] relative">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#10b981]/5 rounded-full filter blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-sm font-mono text-[#34d399] uppercase tracking-widest block mb-3">
            01 . BACKGROUND
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            I care about what happens after the model responds.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          
          {/* Panel 1: Profile and Bio (Spans 2 cols on lg) */}
          <Reveal className="lg:col-span-2">
            <div className="rounded-[2.2rem] border border-white/10 bg-[#020c06]/35 p-8 sm:p-10 backdrop-blur-xl h-full flex flex-col justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#10b981] via-[#34d399] to-emerald-800 opacity-60 blur-sm" />
                  <div className="relative h-24 w-24 overflow-hidden rounded-3xl ring-2 ring-[#10b981]/40 sm:h-28 sm:w-28">
                    <Image
                      src={profile.portrait}
                      alt={`${profile.name} — profile photo`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 96px, 112px"
                      priority
                    />
                  </div>
                </div>
                
                {/* Bio text */}
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#34d399] uppercase tracking-wider block">
                    systems_engineer_instance
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Mehedi Hasan
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base">
                    I build AI systems around evidence, orchestration, and failure behavior. 
                    A useful product is not just a model call; it is retrieval quality, state, 
                    latency, observability, sync, and the discipline to fail honestly when facts 
                    are missing.
                  </p>
                  <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base">
                    My strongest work spans RAG, multi-agent workflows, backend systems, and 
                    production mobile apps — designed for real users in the field, not polished 
                    demo environments. I also build MLOps tooling to enforce model promotion evidence 
                    before anything touches production.
                  </p>
                </div>
              </div>

              {/* CV Download CTA */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5 items-center justify-between">
                <p className="text-xs font-mono text-slate-500">
                  {"// currently open to internships & engineering roles"}
                </p>
                <a
                  href={profile.resume}
                  download
                  className="group inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/8 px-5 py-2.5 text-xs font-semibold text-[#34d399] transition hover:border-[#10b981] hover:bg-[#10b981]/15 hover:text-white"
                >
                  <Download size={14} className="transition group-hover:-translate-y-0.5" />
                  Download Resume
                </a>
              </div>
            </div>
          </Reveal>

          {/* Panel 2: Pragmatic Engineering Philosophy (1 col) */}
          <Reveal delay={0.1}>
            <div className="rounded-[2.2rem] border border-white/10 bg-[#020c06]/35 p-8 backdrop-blur-xl h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#34d399] uppercase tracking-wider block mb-2">
                    engineering_philosophy
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Grounded Values
                  </h3>
                </div>

                {/* Comparative List */}
                <div className="space-y-4">
                  {/* Care About */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      Things I Care About
                    </span>
                    {careAbout.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-light">
                        <CheckCircle size={14} className="text-[#34d399] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Avoid */}
                  <div className="space-y-2.5 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      Things I Avoid
                    </span>
                    {avoidList.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-light">
                        <XCircle size={14} className="text-red-500/70 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 pt-6">
                💡 Real proof is in the system tests.
              </div>
            </div>
          </Reveal>

          {/* Panel 3: Stats / System Focus (1 col) */}
          <Reveal delay={0.15}>
            <div className="rounded-[2.2rem] border border-white/10 bg-[#020c06]/35 p-8 backdrop-blur-xl h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#34d399] uppercase tracking-wider block mb-2">
                    systems_profile
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Focus Parameters
                  </h3>
                </div>

                <div className="space-y-4 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <Target className="text-[#34d399] shrink-0" size={16} />
                    <div>
                      <span className="text-slate-500 block text-[10px]">VERIFICATION</span>
                      <span className="text-white">Refusal Calibration</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <Award className="text-[#34d399] shrink-0" size={16} />
                    <div>
                      <span className="text-slate-500 block text-[10px]">ROUTING</span>
                      <span className="text-white">Stateful Graph Loops</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <Terminal className="text-[#34d399] shrink-0" size={16} />
                    <div>
                      <span className="text-slate-500 block text-[10px]">DATABASE</span>
                      <span className="text-white">Offline-First Queues</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 pt-6">
                {"// optimized for low-latency streaming runtimes"}
              </div>
            </div>
          </Reveal>

          {/* Panel 4: Academic focus (Spans 2 cols on lg) */}
          <Reveal delay={0.2} className="lg:col-span-2">
            <div className="rounded-[2.2rem] border border-white/10 bg-[#020c06]/35 p-8 backdrop-blur-xl h-full flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#34d399] uppercase tracking-wider block">
                  academic_profile
                </span>
                <h3 className="text-xl font-bold text-white">
                  CS Undergraduate @ BRAC University
                </h3>
                <p className="text-slate-300 leading-relaxed font-light text-sm">
                  Coursework focused on high-performance algorithm designs, database index tuning, 
                  operating systems scheduling boundaries, web application architectures, and security-first 
                  software development principles. 
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                <span className="px-3 py-1 bg-[#10b981]/5 border border-[#10b981]/15 text-[#34d399] font-mono text-xs rounded-lg select-none">
                  Algorithms & Structures
                </span>
                <span className="px-3 py-1 bg-[#10b981]/5 border border-[#10b981]/15 text-[#34d399] font-mono text-xs rounded-lg select-none">
                  Database Indexing
                </span>
                <span className="px-3 py-1 bg-[#10b981]/5 border border-[#10b981]/15 text-[#34d399] font-mono text-xs rounded-lg select-none">
                  OS Schemas
                </span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
