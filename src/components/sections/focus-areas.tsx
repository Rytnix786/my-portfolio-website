"use client";

import { BrainCircuit, DatabaseZap, Network, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, staggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { focusAreas } from "@/data/portfolio";

const icons = [BrainCircuit, Network, DatabaseZap, Rocket];

export function FocusAreas() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Operating range"
          title="The work sits between AI capability and production discipline."
          description="A portfolio should show taste, but the engineering signal has to be just as strong."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={area.title}
                variants={staggerItem}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-300/[0.07]"
              >
                <div className="grid size-12 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-white">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{area.description}</p>
              </motion.article>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
