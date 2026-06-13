import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
  external?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

const variants = {
  primary:
    "border-cyan-300/70 bg-cyan-300 text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.22)] hover:bg-cyan-200",
  secondary:
    "border-white/12 bg-white/[0.06] text-slate-100 hover:border-cyan-300/45 hover:bg-cyan-300/10",
  ghost: "border-transparent text-slate-300 hover:text-white",
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  download,
  external,
  className = "",
  ...props
}: ButtonLinkProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold tracking-tight transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${variants[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} download={download} {...props}>
      {children}
    </Link>
  );
}
