"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configure smooth spring movement for the background glow dot
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only track mouse if window is available
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      // Center the 400px radial glow circle at the mouse cursor
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      {/* Dynamic Cursor Glow (Only on desktop/hoverable screens) */}
      <motion.div
        className="absolute pointer-events-none rounded-full w-[400px] h-[400px] bg-cyan-500/[0.08] blur-[90px] hidden md:block mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
        }}
      />

      {/* Static Ambient Base Gradients (Providing rich background depth and mobile fallback) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_26%),radial-gradient(circle_at_50%_92%,rgba(20,184,166,0.11),transparent_34%)]" />
      
      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.12]" />
      
      {/* Analog Noise Texture Overlay */}
      <div className="noise-overlay absolute inset-0 opacity-[0.05]" />
      
      {/* Central Soft Blur Glow */}
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-3xl" />
    </div>
  );
}
