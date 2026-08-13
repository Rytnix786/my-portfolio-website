import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Background } from "@/components/sections/background";
import { Footer } from "@/components/sections/footer";
import { InteractiveHero } from "@/components/sections/interactive-hero";

// Dynamically split below-the-fold interactive sections for lightweight initial payload
const Projects = dynamic(() => import("@/components/sections/projects").then((mod) => mod.Projects), {
  loading: () => <div className="min-h-[400px] bg-[#020804]" />,
});

const CapabilitiesAccordion = dynamic(() => import("@/components/sections/capabilities-accordion").then((mod) => mod.CapabilitiesAccordion), {
  loading: () => <div className="min-h-[300px] bg-[#020804]" />,
});

const TerminalDemo = dynamic(() => import("@/components/sections/terminal-demo").then((mod) => mod.TerminalDemo), {
  loading: () => <div className="min-h-[450px] bg-[#020804]" />,
});

const TechStack = dynamic(() => import("@/components/sections/tech-stack").then((mod) => mod.TechStack), {
  loading: () => <div className="min-h-[300px] bg-[#020804]" />,
});

const InteractiveStory = dynamic(() => import("@/components/sections/interactive-story").then((mod) => mod.InteractiveStory), {
  loading: () => <div className="min-h-[500px] bg-[#020804]" />,
});

const Contact = dynamic(() => import("@/components/sections/contact").then((mod) => mod.Contact), {
  loading: () => <div className="min-h-[300px] bg-[#020804]" />,
});

export default function Home() {
  return (
    <>
      <div id="top" />
      <Background />
      <Navbar />
      <main>
        <InteractiveHero />
        <About />
        <Projects />
        <CapabilitiesAccordion />
        <TerminalDemo />
        <TechStack />
        <InteractiveStory />
        <Contact />
      </main>
      <Footer />
    </>
  );
}



