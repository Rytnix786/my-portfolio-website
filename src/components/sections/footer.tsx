import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
        <p>Mehedi Hasan. AI systems, backend architecture, and product delivery.</p>
        <a
          href={`mailto:${profile.email}`}
          className="font-medium text-slate-300 transition hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
