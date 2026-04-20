interface StatCardProps {
  number: string | number;
  label: string;
  icon?: string;
}

export default function StatCard({ number, label, icon }: StatCardProps) {
  return (
    <div className="surface-card px-6 py-7 text-center transition duration-500 hover:-translate-y-2 hover:shadow-[0_26px_50px_rgba(21,36,59,0.14)]">
      {icon ? (
        <div className="mx-auto inline-flex rounded-full bg-[rgba(40,114,113,0.08)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.3em] text-[var(--accent)]">
          {icon}
        </div>
      ) : null}
      <div className="mt-5 text-5xl font-black text-[#13233d] md:text-6xl">{number}</div>
      <div className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">{label}</div>
    </div>
  );
}
