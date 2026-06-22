import { Download, ExternalLink, GitBranch, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { GlassCard } from "@/components/ui/glass-card";
import { profile } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#020804] relative">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <GlassCard className="overflow-hidden p-8 sm:p-10 lg:p-12 relative border-[#10b981]/10">
            {/* Background blur inside contact card */}
            <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-[#10b981]/5 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end relative z-10">
              
              <div className="space-y-6">
                {/* Availability Badge */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#10b981]/20 bg-[#10b981]/5 text-xs font-mono text-[#34d399] tracking-wider w-fit select-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                  </span>
                  AVAILABLE FOR ROLES (UTC+6)
                </div>

                <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Let&apos;s build something grounded.
                </h2>
                
                <p className="max-w-2xl text-base leading-relaxed text-slate-300 font-light sm:text-lg">
                  I am open to AI engineering, backend systems, and full-stack product
                  roles where the work needs both taste and technical depth. Reach out directly.
                </p>

                {/* Role Chips */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                    Core Capacities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["AI Engineering", "Backend Systems", "Full-Stack AI", "Orchestration"].map((role) => (
                      <span key={role} className="px-3 py-1 rounded-lg border border-white/5 bg-[#020804]/50 text-xs font-mono text-slate-300 hover:text-white transition-colors select-none">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <ButtonLink href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`} variant="primary" className="w-full">
                  Email me
                  <Mail size={16} />
                </ButtonLink>
                
                <ButtonLink href={profile.resume} download className="w-full">
                  Download Resume
                  <Download size={16} />
                </ButtonLink>
                
                <div className="grid grid-cols-2 gap-3">
                  <ButtonLink href={profile.linkedin} className="w-full">
                    LinkedIn
                    <ExternalLink size={16} />
                  </ButtonLink>
                  <ButtonLink href={profile.github} className="w-full">
                    GitHub
                    <GitBranch size={16} />
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
