"use client";

import { Download, ExternalLink, GitBranch, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { navItems, profile } from "@/data/portfolio";

export function Navbar() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={false}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 bg-slate-950/72 px-3 py-2 shadow-2xl shadow-black/30 backdrop-blur-xl"
      >
        <a
          href="#top"
          className="flex min-h-11 items-center rounded-full px-3 text-sm font-semibold tracking-tight text-white transition hover:bg-white/7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          MH
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/7 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <a
            aria-label="Email Mehedi Hasan"
            href={`mailto:${profile.email}`}
            className="grid size-10 place-items-center rounded-full text-slate-300 transition hover:bg-white/7 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <Mail size={17} />
          </a>
          <a
            aria-label="LinkedIn profile"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="grid size-10 place-items-center rounded-full text-slate-300 transition hover:bg-white/7 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <ExternalLink size={17} />
          </a>
          <a
            aria-label="GitHub profile"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="grid size-10 place-items-center rounded-full text-slate-300 transition hover:bg-white/7 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <GitBranch size={17} />
          </a>
          <a
            href={profile.resume}
            download
            className="hidden min-h-10 items-center gap-2 rounded-full bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:inline-flex"
          >
            <Download size={16} />
            CV
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
