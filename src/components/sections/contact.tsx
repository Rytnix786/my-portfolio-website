import { Download, ExternalLink, GitBranch, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { GlassCard } from "@/components/ui/glass-card";
import { profile } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <GlassCard className="overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
                  Contact
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  Build the thing. Prove the thing. Ship the thing.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  I am open to AI engineering, backend systems, and full-stack product
                  roles where the work needs both taste and technical depth.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <ButtonLink href={`mailto:${profile.email}`} variant="primary" className="w-full">
                  Email me
                  <Mail size={17} />
                </ButtonLink>
                <ButtonLink href={profile.resume} download className="w-full">
                  Download CV
                  <Download size={17} />
                </ButtonLink>
                <div className="grid grid-cols-2 gap-3">
                  <ButtonLink href={profile.linkedin} className="w-full">
                    LinkedIn
                    <ExternalLink size={17} />
                  </ButtonLink>
                  <ButtonLink href={profile.github} className="w-full">
                    GitHub
                    <GitBranch size={17} />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
