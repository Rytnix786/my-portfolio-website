"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Award, Compass } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/data/portfolio";

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track vertical scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth out scroll progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Compass size={18} className="text-[#34d399]" />;
      case 1:
        return <Award size={18} className="text-[#34d399]" />;
      default:
        return <Calendar size={18} className="text-[#34d399]" />;
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="journey" 
      className="bg-[#020804] relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#10b981]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#34d399]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Milestones"
          title="A concise path, not a resume dump."
          description="A chronological timeline of academic milestones, system architecture focus areas, and readiness for production engineering roles."
        />

        <div className="relative mt-24">
          {/* Central Line (Desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/5 hidden md:block">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-[#10b981] via-[#34d399] to-transparent origin-top shadow-[0_0_8px_#10b981]"
            />
          </div>

          {/* Left Line (Mobile) */}
          <div className="absolute left-[20px] top-4 bottom-4 w-[2px] bg-white/5 md:hidden">
            <motion.div
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-[#10b981] via-[#34d399] to-transparent origin-top shadow-[0_0_8px_#10b981]"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-28">
            {journey.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Desktop Alternating Layout */}
                  <div className="hidden md:grid grid-cols-[1fr_80px_1fr] items-center">
                    {/* Left Column */}
                    <div className="flex justify-end">
                      {isEven ? (
                        // Card on the left for even indices (0, 2, ...)
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.65, ease: "easeOut" }}
                          className="w-full max-w-[420px] rounded-3xl border border-white/5 bg-[#020c06]/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#10b981]/25 hover:bg-[#020f08]/50 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                        >
                          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                            {item.title}
                          </h3>
                          <span className="text-sm font-mono text-[#34d399] block mt-1.5 font-medium">
                            {item.org}
                          </span>
                          <p className="text-slate-300 font-light mt-4 leading-relaxed text-sm">
                            {item.description}
                          </p>
                        </motion.div>
                      ) : (
                        // Date/Org aligned to right for odd indices (1, ...)
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="text-right pr-6"
                        >
                          <span className="font-mono text-sm font-semibold uppercase tracking-widest text-[#34d399] px-4 py-2 rounded-full border border-[#10b981]/15 bg-[#10b981]/5">
                            {item.date}
                          </span>
                          <span className="text-xs font-mono text-slate-500 block mt-3.5 uppercase tracking-wider">
                            {item.org}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Center Node Column */}
                    <div className="flex justify-center relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-12 h-12 rounded-full border border-[#10b981]/40 bg-[#020c06] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.25)] relative z-10 hover:border-[#34d399] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] transition-all duration-300"
                      >
                        {getIcon(index)}
                      </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="flex justify-start">
                      {!isEven ? (
                        // Card on the right for odd indices (1, ...)
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.65, ease: "easeOut" }}
                          className="w-full max-w-[420px] rounded-3xl border border-white/5 bg-[#020c06]/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#10b981]/25 hover:bg-[#020f08]/50 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                        >
                          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                            {item.title}
                          </h3>
                          <span className="text-sm font-mono text-[#34d399] block mt-1.5 font-medium">
                            {item.org}
                          </span>
                          <p className="text-slate-300 font-light mt-4 leading-relaxed text-sm">
                            {item.description}
                          </p>
                        </motion.div>
                      ) : (
                        // Date/Org aligned to left for even indices (0, 2, ...)
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="text-left pl-6"
                        >
                          <span className="font-mono text-sm font-semibold uppercase tracking-widest text-[#34d399] px-4 py-2 rounded-full border border-[#10b981]/15 bg-[#10b981]/5">
                            {item.date}
                          </span>
                          <span className="text-xs font-mono text-slate-500 block mt-3.5 uppercase tracking-wider">
                            {item.org}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout (Column 1: Node + line, Column 2: Card + date info) */}
                  <div className="md:hidden grid grid-cols-[40px_1fr] items-start gap-4">
                    {/* Node Column */}
                    <div className="flex justify-center pt-2 relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-10 h-10 rounded-full border border-[#10b981]/40 bg-[#020c06] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] relative z-10"
                      >
                        {getIcon(index)}
                      </motion.div>
                    </div>

                    {/* Card Column */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.55 }}
                      className="rounded-2xl border border-white/5 bg-[#020c06]/40 p-6 backdrop-blur-sm"
                    >
                      <span className="inline-block font-mono text-[10px] font-semibold text-[#34d399] px-2.5 py-1 rounded border border-[#10b981]/15 bg-[#10b981]/5 mb-3 uppercase tracking-wider">
                        {item.date}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-400 block mt-1">
                        {item.org}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 font-light mt-3 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
