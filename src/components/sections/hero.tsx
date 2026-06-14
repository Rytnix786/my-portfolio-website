"use client";

import Image from "next/image";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button-link";
import { metrics, profile } from "@/data/portfolio";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative isolate flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-4 py-2 text-sm font-medium text-cyan-100"
          >
            <Sparkles size={16} />
            {profile.role} based in {profile.location}
          </motion.div>
          <motion.h1
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="mt-7 max-w-4xl text-balance font-display text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl"
          >
            {profile.headline}
          </motion.h1>
          <motion.p
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl"
          >
            {profile.summary}
          </motion.p>
          <motion.div
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="#projects" variant="primary">
              View projects
              <ArrowDown size={17} />
            </ButtonLink>
            <ButtonLink href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}>
              Contact me
              <Mail size={17} />
            </ButtonLink>
            <ButtonLink href={profile.resume} download>
              Download CV
              <Download size={17} />
            </ButtonLink>
          </motion.div>
          <motion.div
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                <div className="font-display text-2xl font-semibold text-white">{metric.value}</div>
                <div className="mt-1 text-sm leading-5 text-slate-400">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="relative mx-auto w-full max-w-[29rem]"
        >
          <div className="absolute -inset-8 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-white/[0.05] p-3 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <Image
                src={profile.portrait}
                alt="Portrait of Mehedi Hasan"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 430px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/12 bg-slate-950/72 p-4 backdrop-blur-xl">
                <p className="text-sm font-semibold text-white">Production-minded AI systems</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Retrieval, agents, backend architecture, and product delivery.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
