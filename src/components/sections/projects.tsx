"use client";

import { ArrowUpRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, staggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured builds"
          title="Selected systems with real architecture behind the surface."
          description="Concise proof over long resume blocks. Each project highlights the system behavior that matters."
        />
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <motion.article
              key={project.name}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.065]"
            >
              <div className="absolute -right-16 -top-16 size-40 rounded-full bg-cyan-300/10 blur-3xl transition group-hover:bg-cyan-300/18" />
              <div className="relative">
                <p className="text-sm font-semibold text-cyan-200">{project.eyebrow}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-white">
                  {project.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-300">{project.description}</p>
                <p className="mt-4 text-sm leading-6 text-slate-400">{project.impact}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.065] px-3 py-1 text-xs font-semibold text-cyan-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 text-sm font-semibold text-white transition hover:border-cyan-300/45 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    Repository
                    <ArrowUpRight size={16} />
                  </a>
                  {"docs" in project && project.docs ? (
                    <a
                      href={project.docs}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 px-4 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/45 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                    >
                      Docs
                      <BookOpen size={16} />
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
