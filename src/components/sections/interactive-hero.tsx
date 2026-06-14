"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Hero from "@/components/ui/animated-shader-hero";
import { profile, metrics } from "@/data/portfolio";

// Animated Counter component
function AnimatedCounter({ valueText }: { valueText: string }) {
  const numVal = parseFloat(valueText);
  const suffix = valueText.replace(/^[0-9.]+/, "");
  const hasDecimals = valueText.includes(".");
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (hasDecimals) {
      return latest.toFixed(2) + suffix;
    }
    return Math.floor(latest).toString() + suffix;
  });

  useEffect(() => {
    const controls = animate(count, numVal, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [count, numVal, hasDecimals]);

  return <motion.span>{rounded}</motion.span>;
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
    // Factor determines the magnetic pull strength
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
      className={`relative px-8 py-4 rounded-full font-semibold text-lg transition-colors overflow-hidden group ${
        primary
          ? "bg-[#10b981] hover:bg-[#34d399] text-[#020804] shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:shadow-[0_0_36px_rgba(16,185,129,0.55)]"
          : "bg-[#020804]/60 hover:bg-[#10b981]/10 border border-[#10b981]/30 hover:border-[#10b981]/60 text-white backdrop-blur-sm"
      } ${className}`}
    >
      {/* Glow highlight effect */}
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <span className="flex items-center gap-2 justify-center relative z-10">
        {children}
      </span>
    </motion.button>
  );
}

// Typewriter Roles component
function TypewriterRoles() {
  const roles = [
    "AI Systems Engineer",
    "RAG Architect",
    "Backend Systems Builder",
    "Multi-Agent Orchestrator"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeRole = roles[currentRoleIndex];

    if (isDeleting) {
      // Deleting speed
      setTypingSpeed(40);
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, typingSpeed);
    } else {
      // Typing speed
      setTypingSpeed(80);
      timer = setTimeout(() => {
        setDisplayText((prev) => activeRole.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Finished typing full word
    if (!isDeleting && displayText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 2500); // pause at the end
    }

    // Finished deleting word
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#6ee7b7] font-mono min-h-[1.5em] inline-block">
      {displayText}
      <span className="animate-pulse ml-1 inline-block w-1.5 h-6 bg-[#10b981] align-middle" />
    </span>
  );
}

export function InteractiveHero() {
  const handleViewBuilds = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactMe = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`, "_blank");
  };

  // Split name for staggered entrance
  const nameLetters = Array.from(profile.name);
  
  // Split headline for blur-to-clear reveal
  const headlineWords = profile.headline.split(" ");

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const nameLetterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 12 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, filter: "blur(8px)", y: 15 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <Hero className="relative">
      {/* Background grain texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.03]" />
      
      {/* Gradient border glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#10b981]/25 to-transparent" />
      
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 pointer-events-auto"
        >
          {/* Top trust badge */}
          <motion.div
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full border border-[#10b981]/20 bg-[#020804]/50 backdrop-blur-md text-xs font-mono text-[#34d399] tracking-wider flex items-center gap-2 select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            {profile.role.toUpperCase()} · {profile.location.toUpperCase()}
          </motion.div>

          {/* Name Reveal */}
          <div className="overflow-hidden">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-white select-none">
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
          </div>

          {/* Role Cycler */}
          <motion.div variants={itemVariants} className="text-xl sm:text-3xl font-medium min-h-[2.5rem]">
            <TypewriterRoles />
          </motion.div>

          {/* Headline (Blur-to-Clear staggered word-by-word) */}
          <motion.p
            variants={containerVariants}
            className="text-lg sm:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed select-none"
          >
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center pt-4"
          >
            <MagneticButton primary onClick={handleViewBuilds}>
              View Case Studies
              <ArrowDown size={18} />
            </MagneticButton>
            
            <MagneticButton onClick={handleContactMe}>
              Let's Build
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </motion.div>

          {/* Metrics bar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 pt-12 mt-4 w-full max-w-4xl border-t border-white/5 select-none"
          >
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
                <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#10b981]">
                  <AnimatedCounter valueText={metric.value} />
                </span>
                <span className="text-xs sm:text-sm text-slate-400 font-light tracking-wide uppercase font-mono">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Animated Scroll Indicator at the bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 select-none pointer-events-auto cursor-pointer"
          onClick={handleViewBuilds}
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#10b981]/60">Explore</span>
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#10b981]/25 bg-[#020804]/80 backdrop-blur-md">
            <span className="absolute inset-0 rounded-full border border-[#10b981]/40 animate-ping opacity-25" style={{ animationDuration: "3s" }} />
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <ArrowDown size={14} className="text-[#10b981]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Hero>
  );
}
