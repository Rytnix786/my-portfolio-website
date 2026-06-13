"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const HorizonHeroSection = dynamic(
  () => import("@/components/ui/horizon-hero-section").then((mod) => mod.Component),
  { ssr: false }
);

export default function HorizonDemoPage() {
  return (
    /* overflow-x-hidden but NOT overflow-y-hidden — scroll must propagate to window */
    <div className="relative bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Floating header — stays above the WebGL canvas via z-50 */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 bg-gradient-to-b from-slate-950/80 to-transparent backdrop-blur-sm pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-slate-900/60 text-sm font-semibold text-slate-300 hover:text-white hover:border-cyan-500/40 hover:bg-slate-900/80 transition"
          >
            <ArrowLeft size={16} className="text-cyan-400" />
            Back to Portfolio
          </Link>
          <div className="text-right">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block">
              Feature Demo
            </span>
            <span className="text-sm font-bold text-white tracking-tight">
              3D Horizon Project Showcase
            </span>
          </div>
        </div>
      </header>

      {/*
       * The HorizonHeroSection component itself creates its own 300vh scroll space.
       * No extra sections needed — they would desync the container-based scroll.
       */}
      <main>
        <HorizonHeroSection />
      </main>
    </div>
  );
}
