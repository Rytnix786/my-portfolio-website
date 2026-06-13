import { Reveal } from "@/components/motion/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { metrics } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <GlassCard className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
                About
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                I care about what happens after the model responds.
              </h2>
            </div>
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

