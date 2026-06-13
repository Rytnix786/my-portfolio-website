export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_50%_92%,rgba(20,184,166,0.13),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.12]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.06]" />
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
    </div>
  );
}
