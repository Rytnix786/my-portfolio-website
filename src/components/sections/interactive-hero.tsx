"use client";

import Hero from "@/components/ui/animated-shader-hero";
import { profile } from "@/data/portfolio";

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

  return (
    <Hero
      trustBadge={{
        text: `${profile.role} based in ${profile.location}`,
        icons: ["✨", "🤖", "⚡"]
      }}
      headline={{
        line1: profile.name,
        line2: "AI Systems Engineer"
      }}
      subtitle={profile.headline}
      buttons={{
        primary: {
          text: "View Featured Builds",
          onClick: handleViewBuilds
        },
        secondary: {
          text: "Contact Me",
          onClick: handleContactMe
        }
      }}
    />
  );
}
