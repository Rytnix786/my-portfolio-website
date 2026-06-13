"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Hero from "@/components/ui/animated-shader-hero";

export default function ShaderHeroDemoPage() {
  const handlePrimaryClick = () => {
    alert("Primary Call to Action Clicked!");
  };

  const handleSecondaryClick = () => {
    alert("Secondary Call to Action Clicked!");
  };

  return (
    <div className="relative min-h-screen bg-black">
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

      <Hero
        trustBadge={{
          text: "Next-gen Interactive Portfolios",
          icons: ["✨", "🔥", "🚀"]
        }}
        headline={{
          line1: "Interactive WebGL",
          line2: "Shader Experiences"
        }}
        subtitle="High-performance, GPU-accelerated canvas backgrounds using custom GLSL fragment shaders."
        buttons={{
          primary: {
            text: "Get Started",
            onClick: handlePrimaryClick
          },
          secondary: {
            text: "Learn More",
            onClick: handleSecondaryClick
          }
        }}
      />
    </div>
  );
}
