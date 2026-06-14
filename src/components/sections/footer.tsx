import { profile } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 pb-12 pt-8 sm:px-6 lg:px-8 bg-[#020804] border-t border-white/5 select-none">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm text-slate-500 font-mono">
        <div className="text-center md:text-left space-y-1">
          <p>© {currentYear} Mehedi Hasan. All rights reserved.</p>
          <p className="text-[11px] text-slate-600">
            Built with Next.js, Framer Motion, and WebGL. Deployed on Vercel.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-1.5">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-slate-400 hover:text-[#34d399] transition-colors"
          >
            {profile.email}
          </a>
          <span className="text-[10px] text-slate-600">
            Last updated: June 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
