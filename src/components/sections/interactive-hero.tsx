"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-hero-bg animate-pulse" />,
});

const roles = [
  "AI Systems Engineer",
  "RAG Architect",
  "Backend Systems Builder",
  "Multi-Agent Orchestrator",
];

// Typewriter Roles component
function TypewriterRoles() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeRole = roles[currentRoleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, 30);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => activeRole.slice(0, prev.length + 1));
      }, 70);
    }

    if (!isDeleting && displayText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 2500); // pause at the end
    }

    if (isDeleting && displayText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }, 0);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <span className="text-primary font-mono inline-block font-semibold">
      {displayText}
      <span className="animate-pulse ml-1 inline-block w-1.5 h-4 bg-primary align-middle" />
    </span>
  );
}

// Magnetic Button component
function MagneticButton({
  children,
  className = "",
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    const factor = 0.22;
    setPosition({ x: x * factor, y: y * factor });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={`relative px-6 py-3 md:px-8 md:py-4 rounded-sm font-semibold text-sm transition-all overflow-hidden group pointer-events-auto cursor-pointer ${
        primary
          ? "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.97]"
          : "bg-white/5 border border-white/10 hover:bg-white/10 text-white active:scale-[0.97]"
      } ${className}`}
    >
      {/* Dynamic hover highlight ring */}
      <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <span className="flex items-center gap-2 justify-center relative z-10">
        {children}
      </span>
    </motion.button>
  );
}

export function InteractiveHero() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountTimer = globalThis.setTimeout(() => setMounted(true), 0);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => {
      globalThis.clearTimeout(mountTimer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const animationId = window.requestAnimationFrame(() => {
      timeoutId = globalThis.setTimeout(() => setShouldLoadSpline(true), 250);
    });

    return () => {
      window.cancelAnimationFrame(animationId);
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, [mounted, isMobile]);

  // Intercept scroll/wheel events in capture phase to prevent Spline scroll hijacking
  useEffect(() => {
    const container = splineContainerRef.current;
    if (!container || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent Spline from calling preventDefault() on wheel scroll
      e.stopPropagation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent Spline from calling preventDefault() on touch swiping
      e.stopPropagation();
    };

    container.addEventListener("wheel", handleWheel, { capture: true, passive: true });
    container.addEventListener("touchmove", handleTouchMove, { capture: true, passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
      container.removeEventListener("touchmove", handleTouchMove, { capture: true });
    };
  }, [mounted, isMobile]);

  const handleBookCall = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=nafismehedi37@gmail.com", "_blank");
  };

  const handleScrollToWork = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nameLetters = Array.from("Mehedi Hasan");
  const descriptionText = "Production-minded AI systems built in days. Multi-agent orchestration deployed with zero-trust architecture. Grounded RAG pipelines set up for your entire enterprise. All of it done right, not just fast.";
  const descriptionWords = descriptionText.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const nameLetterVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 200, damping: 14 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, filter: "blur(4px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" as const },
    },
  };

  return (
    <section id="top" className="relative min-h-screen flex items-end bg-hero-bg overflow-hidden">
      {/* Spline 3D Background */}
      <div ref={splineContainerRef} className="absolute inset-0 pointer-events-auto">
        {shouldLoadSpline && (
          <Spline
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            className="w-full h-full"
          />
        )}
        {(isMobile || !mounted || !shouldLoadSpline) && (
          <div className="absolute inset-0 bg-hero-bg">
            {/* A beautiful mobile fallback: dynamic pulsing green radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.14),transparent_60%)] animate-pulse" style={{ animationDuration: "8s" }} />
          </div>
        )}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />

      {/* Content container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-3xl px-6 md:px-10 pb-16 pt-32 text-left"
      >
        {/* Staggered Name Characters */}
        <h1 className="text-[clamp(2.5rem,7.5vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.05em] text-white mb-2 md:mb-4 uppercase select-none">
          {nameLetters.map((char, index) => (
            <motion.span
              key={index}
              variants={nameLetterVariants}
              className="inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        {/* Typewriter role cycler */}
        <motion.div
          variants={itemVariants}
          className="text-foreground/85 text-[clamp(1rem,2.2vw,1.6rem)] font-light mb-3 md:mb-6 min-h-[1.5em]"
        >
          I am a <TypewriterRoles />
        </motion.div>

        {/* Word-by-word reveal description */}
        <p className="text-slate-300/90 text-[clamp(0.85rem,1.4vw,1.15rem)] font-light mb-6 md:mb-8 max-w-2xl leading-relaxed select-none">
          {descriptionWords.map((word, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </p>

        {/* Tactile Magnetic Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 pt-2"
        >
          <MagneticButton primary onClick={handleBookCall}>
            Book a Call
          </MagneticButton>
          <MagneticButton onClick={handleScrollToWork}>
            My Work
          </MagneticButton>
        </motion.div>

        {/* System metrics tagline */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground/60 text-xs font-light mt-8 font-mono"
        >
          AI Systems Engineer · Dhaka, Bangladesh · 122+ backend tests maintained
        </motion.p>
      </motion.div>
    </section>
  );
}
