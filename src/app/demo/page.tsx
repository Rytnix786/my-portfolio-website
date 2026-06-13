"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, MoveRight, Layers, Eye } from "lucide-react";

export default function DemoDashboard() {
  const demos = [
    {
      title: "Interactive WebGL Shader Hero",
      description: "GPU-accelerated fragment shader background reacting to cursor and touch events. Features animated headlines and dual call-to-actions.",
      path: "/demo/shader-hero",
      icon: Sparkles,
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Scroll Expansion Hero",
      description: "Apple-style scroll-driven media expansion with video/image toggling, responsive bounds, and elegant full-screen content transitions.",
      path: "/demo/scroll-expand",
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Interactive Image Accordion",
      description: "Fluid hover accordion showcasing multiple project categories or AI modules with dynamic vertical/horizontal title rotation.",
      path: "/demo/accordion",
      icon: Eye,
      color: "from-teal-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-white">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.1),transparent_50%)] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-3 py-1 rounded-full">
            Component Demos
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 flex flex-col justify-center relative z-10 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white">
            Interactive Components
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            A sandbox containing the exact isolated implementations of the React components requested in the prompts.
          </p>
        </div>

        <div className="grid gap-6">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <Link
                key={demo.path}
                href={demo.path}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.01] hover:shadow-xl hover:shadow-black/40"
              >
                {/* Accent glow on hover */}
                <div className="absolute -left-16 -top-16 size-40 rounded-full bg-cyan-400/5 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${demo.color} text-slate-950 font-bold shrink-0`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {demo.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {demo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 group-hover:text-white shrink-0">
                    Run Demo
                    <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-500 mt-auto">
        Mehedi Hasan Portfolio • Shipped with WebGL & Smooth Scroll Mechanics
      </footer>
    </div>
  );
}
