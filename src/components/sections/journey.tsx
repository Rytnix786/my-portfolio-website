import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/data/portfolio";

export function Journey() {
  return (
    <section id="journey" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Journey" title="A concise path, not a resume dump." />
        <div className="relative">
          <div className="absolute bottom-6 left-3 top-6 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/35 to-cyan-300/0 sm:left-1/2" />
          <div className="space-y-5">
            {journey.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className={`relative grid gap-4 sm:grid-cols-2 ${index % 2 ? "" : "sm:text-right"}`}>
                  <div className={index % 2 ? "sm:col-start-2" : ""}>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                        {item.date}
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.025em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-300">{item.org}</p>
                      <p className="mt-4 text-sm leading-6 text-slate-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 top-6 grid size-6 place-items-center rounded-full border border-cyan-300/40 bg-slate-950 sm:left-1/2 sm:-translate-x-1/2">
                    <div className="size-2 rounded-full bg-cyan-300" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
