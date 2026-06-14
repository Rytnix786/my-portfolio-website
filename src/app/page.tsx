import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Background } from "@/components/sections/background";
import { Contact } from "@/components/sections/contact";
import { CapabilitiesAccordion } from "@/components/sections/capabilities-accordion";
import { Footer } from "@/components/sections/footer";
import { InteractiveHero } from "@/components/sections/interactive-hero";
import { Journey } from "@/components/sections/journey";
import { TechStack } from "@/components/sections/tech-stack";
import { Projects } from "@/components/sections/projects";
import { TerminalDemo } from "@/components/sections/terminal-demo";

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
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}



