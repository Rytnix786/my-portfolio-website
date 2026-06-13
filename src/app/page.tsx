import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Background } from "@/components/sections/background";
import { Contact } from "@/components/sections/contact";
import { FocusAreas } from "@/components/sections/focus-areas";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <FocusAreas />
        <Projects />
        <TechStack />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
