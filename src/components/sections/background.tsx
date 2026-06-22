"use client";

import { useEffect, useRef } from "react";

export function Background() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = 0;
    let running = true;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 200;
      targetY = e.clientY - 200;
    };

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (running) frameId = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameId = requestAnimationFrame(updateGlow);

    return () => {
      running = false;
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      {/* Dynamic Cursor Glow (Only on desktop/hoverable screens) */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none rounded-full w-[400px] h-[400px] bg-[#10b981]/[0.08] blur-[90px] hidden md:block mix-blend-screen"
      />

      {/* Static Ambient Base Gradients (Providing rich background depth and mobile fallback) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(52,211,153,0.12),transparent_26%),radial-gradient(circle_at_50%_92%,rgba(16,185,129,0.08),transparent_34%)]" />
      
      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.12]" />
      
      {/* Analog Noise Texture Overlay */}
      <div className="noise-overlay absolute inset-0 opacity-[0.05]" />
      
      {/* Central Soft Blur Glow */}
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-3xl" />
    </div>
  );
}
