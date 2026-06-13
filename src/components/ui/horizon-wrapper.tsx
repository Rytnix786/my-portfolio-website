"use client";

import dynamic from "next/dynamic";

const HorizonHeroSection = dynamic(
  () => import("./horizon-hero-section").then((mod) => mod.Component),
  { ssr: false }
);

export function HorizonWrapper() {
  return <HorizonHeroSection />;
}
