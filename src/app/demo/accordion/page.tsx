"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";

export default function AccordionDemoPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col justify-center py-12">
      {/* Absolute back button overlay */}
      <div className="absolute top-4 left-4 z-50">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-slate-900/80 border border-white/10 hover:border-white/30 text-white rounded-full backdrop-blur-md transition-all hover:scale-105"
        >
          <ArrowLeft size={16} />
          Demo Dashboard
        </Link>
      </div>

      <div className="w-full relative z-10">
        <LandingAccordionItem />
      </div>
    </div>
  );
}
