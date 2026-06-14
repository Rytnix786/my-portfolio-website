"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Cpu, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, staggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/portfolio";

// Reusable 3D Tilt Card component
function ProjectCard({
  project,
  isFeatured = false,
}: {
  project: (typeof projects)[number];
  isFeatured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // Map to rotations (-7 to 7 degrees for subtle effect)
    const rx = -((y - height / 2) / (height / 2)) * 6;
    const ry = ((x - width / 2) / (width / 2)) * 6;
    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -6 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.2 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#020c06]/35 p-8 shadow-2xl transition-all duration-300 hover:border-[#10b981]/30 hover:bg-[#020f08]/50 ${
        isFeatured ? "col-span-1 lg:col-span-2" : "col-span-1"
      }`}
    >
      {/* Glow background highlight */}
      <div
        className="absolute -right-20 -top-20 size-48 rounded-full bg-[#10b981]/5 blur-3xl transition duration-500 group-hover:bg-[#10b981]/12"
        style={{ transform: "translateZ(-20px)" }}
      />

      <div className="relative flex flex-col h-full justify-between gap-6" style={{ transform: "translateZ(30px)" }}>
        <div className={isFeatured ? "grid grid-cols-1 lg:grid-cols-5 gap-8 items-center" : "space-y-4"}>
          
          {/* Card Content Details */}
          <div className={isFeatured ? "lg:col-span-3 space-y-4" : "space-y-3"}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-[#34d399] uppercase">
                {project.eyebrow}
              </span>
              {isFeatured && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono border border-[#10b981]/35 bg-[#10b981]/10 text-[#34d399] tracking-widest uppercase">
                  Featured Build
                </span>
              )}
            </div>
            
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-[#34d399] transition-colors">
              {project.name}
            </h3>
            
            <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-light">
              {project.description}
            </p>
            
            {/* Impact Metric Bar */}
            <div className="bg-[#020804]/50 border border-white/5 rounded-xl p-4 mt-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1">
                System Impact Metric
              </span>
              <p className="text-xs sm:text-sm text-[#34d399] font-mono leading-relaxed font-light">
                {project.impact}
              </p>
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#10b981]/10 bg-[#10b981]/5 px-2.5 py-0.5 text-[10px] font-mono text-[#6ee7b7]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Visual Pipeline Overlay */}
          {isFeatured && (
            <div className="lg:col-span-2 hidden lg:block border border-white/5 bg-[#020704]/40 rounded-2xl p-4 relative h-64 overflow-hidden select-none">
              <span className="absolute top-3 left-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                Agent flow_graph
              </span>
              
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 p-6 mt-2">
                <div className="flex items-center gap-2 w-full justify-between">
                  <div className="text-[10px] font-mono bg-[#10b981]/10 border border-[#10b981]/25 text-[#34d399] px-2 py-1 rounded">
                    User Prompt
                  </div>
                  <ArrowRight size={12} className="text-slate-600" />
                  <div className="text-[10px] font-mono bg-white/5 border border-white/10 text-white px-2 py-1 rounded">
                    Planner
                  </div>
                </div>

                <div className="h-6 w-px border-l border-dashed border-[#10b981]/30" />

                <div className="flex items-center gap-2 w-full justify-between">
                  <div className="text-[10px] font-mono bg-[#10b981]/10 border border-[#10b981]/25 text-[#34d399] px-2 py-1 rounded">
                    Parallel Scrapers
                  </div>
                  <ArrowRight size={12} className="text-[#10b981]" />
                  <div className="text-[10px] font-mono bg-[#10b981]/20 border border-[#10b981]/40 text-[#6ee7b7] px-2.5 py-1 rounded font-bold">
                    Refusal Evaluator
                  </div>
                </div>

                <div className="h-6 w-px border-l border-dashed border-[#10b981]/30" />

                <div className="flex items-center gap-2 w-full justify-between">
                  <div className="text-[10px] font-mono bg-white/5 border border-white/10 text-white px-2 py-1 rounded">
                    Grounded Dossier
                  </div>
                  <ArrowRight size={12} className="text-slate-600" />
                  <div className="text-[10px] font-mono bg-[#10b981]/10 border border-[#10b981]/25 text-[#34d399] px-2 py-1 rounded">
                    Output Stream
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5" style={{ transform: "translateZ(10px)" }}>
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#10b981] hover:bg-[#34d399] px-5 text-xs font-semibold text-[#020804] transition-colors"
          >
            Read Case Study
            <ArrowRight size={14} />
          </Link>
          
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-4 text-xs font-mono text-slate-300 transition-colors"
          >
            Repo
            <ArrowUpRight size={12} />
          </a>
          
          {"docs" in project && project.docs ? (
            <a
              href={project.docs}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 hover:border-white/20 px-4 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
            >
              Docs
              <BookOpen size={12} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  // We place the first project (Nexus Researcher) as featured, and render the rest in a grid.
  const featuredProject = projects[0];
  const gridProjects = projects.slice(1);

  return (
    <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#020804] relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#10b981]/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Proven Systems"
          title="Selected builds with real architectures under the hood."
          description="Click on any card to read its full case study covering problem constraints, architectural tradeoffs, rejected designs, and factual evaluation tests."
        />
        
        <div className="mt-12 space-y-6">
          {/* Featured Full Width */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <ProjectCard project={featuredProject} isFeatured={true} />
            
            {/* Remainder Grid */}
            {gridProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} isFeatured={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
