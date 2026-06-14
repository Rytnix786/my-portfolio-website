"use client";

import { useEffect } from "react";

/**
 * ScrollReset — Disables browser scroll restoration and forces
 * the page to the top (position 0,0) on every page load.
 *
 * Without this, Chrome remembers the last scroll position and
 * restores it, which scrolls straight to the terminal section
 * instead of the hero.
 */
export function ScrollReset() {
  useEffect(() => {
    // Prevent browser from restoring scroll position between sessions
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Immediately force to top on mount, before any paint
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
