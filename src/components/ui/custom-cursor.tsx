"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only run on client and non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHidden = true;
    let isRunning = true;
    let animationFrame = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      
      if (isHidden) {
        isHidden = false;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      isHidden = true;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const updateRing = () => {
      const ease = 0.15;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      if (isRunning) {
        animationFrame = requestAnimationFrame(updateRing);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a, button, [role='button'], input, select, textarea, .interactive-item")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    
    animationFrame = requestAnimationFrame(updateRing);

    return () => {
      isRunning = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor transition-all duration-200"
        style={{
          opacity: 0,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
          backgroundColor: isHovered ? "#34d399" : "#10b981",
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring transition-all duration-300"
        style={{
          opacity: 0,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
          borderColor: isHovered ? "#34d399" : "rgba(16, 185, 129, 0.4)",
          backgroundColor: isHovered ? "rgba(16, 185, 129, 0.15)" : "transparent",
        }}
      />
    </>
  );
}
