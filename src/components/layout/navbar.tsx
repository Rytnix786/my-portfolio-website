"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, User, Briefcase, Cpu, Compass, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navLinks = [
    { label: "About", href: "#about", icon: User },
    { label: "Projects", href: "#projects", icon: Briefcase },
    { label: "Stack", href: "#stack", icon: Cpu },
    { label: "Journey", href: "#journey", icon: Compass },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  useEffect(() => {
    const sections = ["about", "projects", "stack", "journey", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section is in the center view
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial check
    handleScroll();
    handleResize();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* 1. Classic Horizontal Top Header (Visible only at the top of the page) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 bg-transparent select-none pointer-events-auto"
          >
            {/* Left: Logo (Kept empty per user request) */}
            <a
              href="#top"
              className="text-foreground text-xl font-semibold tracking-tight hover:opacity-85 transition-opacity uppercase"
            >
            </a>

            {/* Center: Nav links */}
            <nav className="hidden md:flex gap-8 items-center" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm transition-colors uppercase tracking-widest ${isActive
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right: Resume button */}
            <div className="flex items-center">
              <Button
                asChild
                variant="navCta"
                size="lg"
                className="hidden md:inline-flex rounded-lg uppercase text-xs tracking-widest px-6"
              >
                <a href={profile.resume} download>
                  <Download size={14} className="mr-2" />
                  Resume
                </a>
              </Button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* 2. Adaptive Floating Dock & Mobile Pill (Visible when scrolled) */}
      <AnimatePresence>
        {isScrolled && (
          <>
            {/* A. Desktop Floating Side Dock (Floating Capsule on Right Side) */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 60, y: "-50%" }}
                animate={{ opacity: 1, x: 0, y: "-50%" }}
                exit={{ opacity: 0, x: 60, y: "-50%" }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 py-6 px-3 rounded-full bg-[#020c06]/65 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-auto"
              >
                {/* Visual accent accent dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_#10b981]" />

                {/* Vertical Links Column */}
                <div className="flex flex-col gap-6 my-2 relative">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className="relative group p-2.5 rounded-full transition-colors flex items-center justify-center"
                        aria-label={link.label}
                      >
                        {/* Smooth active backing capsule */}
                        {isActive && (
                          <motion.div
                            layoutId="activePillDesktop"
                            className="absolute inset-0 bg-[#10b981]/15 border border-[#10b981]/25 rounded-full"
                            transition={{ type: "spring", stiffness: 220, damping: 20 }}
                          />
                        )}

                        <Icon
                          size={18}
                          className={`relative z-10 transition-colors duration-350 ${isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                            }`}
                        />

                        {/* Premium Glassmorphism Tooltip sliding out left */}
                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg border border-white/10 bg-[#020c06]/90 backdrop-blur-md shadow-2xl opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 select-none">
                          <span className="text-[10px] font-mono text-white uppercase tracking-widest block font-medium">
                            {link.label}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Slim Divider */}
                <div className="w-4 h-[1px] bg-white/10 my-1" />

                {/* Floating Resume CTA Icon */}
                <a
                  href={profile.resume}
                  download
                  className="relative group p-2.5 rounded-full hover:bg-white/5 transition-colors flex items-center justify-center"
                  aria-label="Download Resume"
                >
                  <Download size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />

                  {/* Tooltip for Resume */}
                  <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg border border-white/10 bg-[#020c06]/90 backdrop-blur-md shadow-2xl opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 select-none w-max">
                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest block font-medium">
                      Download Resume
                    </span>
                  </div>
                </a>
              </motion.div>
            )}

            {/* B. Mobile Floating Bottom Pill */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 100, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 100, x: "-50%" }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-2 p-2 rounded-full bg-[#020c06]/85 border border-white/10 backdrop-blur-lg shadow-[0_10px_35px_rgba(0,0,0,0.8)] pointer-events-auto max-w-[90vw]"
              >
                {/* Horizontal Navigation Items */}
                <div className="flex items-center gap-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className="relative p-3 rounded-full flex items-center justify-center"
                        aria-label={link.label}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activePillMobile"
                            className="absolute inset-0 bg-[#10b981]/15 border border-[#10b981]/25 rounded-full"
                            transition={{ type: "spring", stiffness: 220, damping: 20 }}
                          />
                        )}

                        <Icon
                          size={16}
                          className={`relative z-10 transition-colors duration-300 ${isActive ? "text-primary" : "text-slate-400"
                            }`}
                        />
                      </a>
                    );
                  })}
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] h-6 bg-white/10 mx-1.5" />

                {/* Mobile Resume Download CTA */}
                <a
                  href={profile.resume}
                  download
                  className="p-3 rounded-full flex items-center justify-center bg-[#10b981]/10 border border-[#10b981]/20 active:scale-95 transition-transform"
                  aria-label="Download Resume"
                >
                  <Download size={16} className="text-primary animate-pulse" style={{ animationDuration: "4s" }} />
                </a>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
