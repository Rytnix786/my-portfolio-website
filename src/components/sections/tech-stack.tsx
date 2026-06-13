"use client";

import { motion } from "framer-motion";
import { Stagger, staggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/portfolio";

export function TechStack() {
  return (
    <section id="stack" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="System stack"
          title="Tools I use when the prototype needs to become a system."
        />
        <Stagger className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group) => (
            <motion.article
              key={group.title}
              variants={staggerItem}
              className="rounded-[1.5rem] border border-white/10 bg-slate-900/45 p-6 backdrop-blur transition duration-200 hover:border-cyan-300/30"
            >
              <h3 className="font-display text-2xl font-semibold tracking-[-0.025em] text-white">
                {group.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-sm font-medium text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
