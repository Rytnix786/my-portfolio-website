"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, GitBranch, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { navItems, profile } from "@/data/portfolio";

export function Navbar() {
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Setup intersection observer to track active section
    const sections = ["projects", "stack", "journey", "contact", "about"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section is in the center view
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 1, y: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 px-4 select-none"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#020c06]/80 px-3 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
      >
        {/* Logo home link */}
        <a
          href="#top"
          className="flex min-h-11 items-center rounded-full px-3 text-sm font-semibold tracking-tight text-white transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10b981]"
        >
          MH
        </a>

        {/* Navigation list */}
        <div className="hidden items-center gap-1.5 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? "bg-[#10b981]/12 text-[#34d399] border-[#10b981]/20 shadow-[0_0_15px_rgba(16,185,129,0.08)]"
                    : "text-slate-300 border-transparent hover:bg-white/5 hover:text-white"
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10b981]`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Social & Resume Links */}
        <div className="flex items-center gap-1">
          <a
            aria-label="Email Mehedi Hasan"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
            target="_blank"
            rel="noreferrer"
            className="grid size-10 place-items-center rounded-full text-slate-300 transition hover:bg-white/5 hover:text-[#34d399] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10b981]"
          >
            <Mail size={16} />
          </a>
          <a
            aria-label="LinkedIn profile"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="grid size-10 place-items-center rounded-full text-slate-300 transition hover:bg-white/5 hover:text-[#34d399] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10b981]"
          >
            <ExternalLink size={16} />
          </a>
          <a
            aria-label="GitHub profile"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="grid size-10 place-items-center rounded-full text-slate-300 transition hover:bg-white/5 hover:text-[#34d399] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10b981]"
          >
            <GitBranch size={16} />
          </a>
          
          <a
            href={profile.resume}
            download
            className="hidden min-h-10 items-center gap-2 rounded-full bg-[#10b981] hover:bg-[#34d399] px-4 text-xs font-mono font-bold text-[#020804] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10b981] sm:inline-flex"
          >
            <Download size={14} />
            RESUME
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
