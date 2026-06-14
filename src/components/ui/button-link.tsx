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
    "border-[#10b981]/70 bg-[#10b981] text-[#020804] shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:bg-[#34d399]",
  secondary:
    "border-white/12 bg-white/[0.06] text-slate-100 hover:border-[#10b981]/45 hover:bg-[#10b981]/10",
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
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold tracking-tight transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10b981] ${variants[variant]} ${className}`;

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
