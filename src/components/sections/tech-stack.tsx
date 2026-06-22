"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/portfolio";

export function TechStack() {
  // Combine skills for marquees
  const track1Skills = [
    ...skillGroups[0].skills,
    ...skillGroups[2].skills,
  ]; // AI + Backend
  
  const track2Skills = [
    ...skillGroups[1].skills,
    ...skillGroups[3].skills,
  ]; // Models + Frontend

  // Duplicate arrays to make scrolling seamless
  const duplicatedTrack1 = [...track1Skills, ...track1Skills, ...track1Skills, ...track1Skills];
  const duplicatedTrack2 = [...track2Skills, ...track2Skills, ...track2Skills, ...track2Skills];

  return (
    <section id="stack" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#020804] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#10b981]/3 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading
          eyebrow="System Stack"
          title="Tools I use when prototype becomes production."
        />

        {/* Categorized Skill Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12 mb-16">
          {skillGroups.map((group, idx) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-[2rem] border border-white/5 bg-[#020c06]/35 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#10b981]/30 hover:bg-[#020f08]/50"
            >
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#34d399] mb-4">
                {"// "}
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/5 bg-[#020804]/50 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white hover:border-[#10b981]/25 hover:bg-[#10b981]/5 transition-all select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Infinite Marquee tracks */}
        <div className="relative space-y-4 py-4 mt-8 bg-[#020c06]/20 border-y border-white/5">
          {/* Side fade masks for professional cinematic look */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020804] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020804] to-transparent z-10 pointer-events-none" />

          {/* Track 1: Scrolls Left */}
          <div className="flex overflow-x-hidden w-full select-none">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
              className="flex gap-4 pr-4 whitespace-nowrap shrink-0"
            >
              {duplicatedTrack1.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block shrink-0 px-5 py-2.5 bg-[#020c06]/60 border border-white/5 rounded-2xl text-sm font-mono text-slate-200 hover:text-[#34d399] hover:border-[#10b981]/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Track 2: Scrolls Right */}
          <div className="flex overflow-x-hidden w-full select-none">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 28,
              }}
              className="flex gap-4 pr-4 whitespace-nowrap shrink-0"
            >
              {duplicatedTrack2.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block shrink-0 px-5 py-2.5 bg-[#020c06]/60 border border-white/5 rounded-2xl text-sm font-mono text-slate-200 hover:text-[#34d399] hover:border-[#10b981]/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
