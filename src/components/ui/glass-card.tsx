import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/25 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
