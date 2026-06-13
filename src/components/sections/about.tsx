import Image from "next/image";
import { Download } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { metrics, profile } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <GlassCard className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
            {/* Left column — avatar + heading */}
            <div className="flex flex-col items-start gap-5">
              {/* Profile photo */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 opacity-60 blur-sm" />
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-cyan-400/40 sm:h-28 sm:w-28">
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
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
                  About
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  I care about what happens after the model responds.
                </h2>
              </div>
            </div>

            {/* Right column — bio + CV download */}
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
                <p>
                  I build AI systems around evidence, orchestration, and failure behavior.
                  A useful product is not just a model call; it is retrieval quality, state,
                  latency, observability, sync, and the discipline to refuse when facts are
                  missing.
                </p>
                <p>
                  My strongest work combines RAG, multi-agent workflows, backend systems,
                  and product surfaces that are designed for real users rather than polished
                  demos.
                </p>
              </div>

              {/* CV download */}
              <a
                href={profile.resume}
                download
                className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-400/8 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-400/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <Download size={15} className="transition group-hover:-translate-y-0.5" />
                Download CV
              </a>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div 
                key={metric.label} 
                className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur transition duration-200 hover:border-cyan-300/25 hover:bg-cyan-300/[0.02]"
              >
                <div className="font-display text-3xl font-semibold text-cyan-300">{metric.value}</div>
                <div className="mt-2 text-sm leading-5 text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

