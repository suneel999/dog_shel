import Link from 'next/link';

interface HowToHelpCardProps {
  icon?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isPrimary?: boolean;
}

export default function HowToHelpCard({
  icon,
  title,
  description,
  buttonText,
  buttonLink,
  isPrimary = false,
}: HowToHelpCardProps) {
  return (
    <div className="surface-card group flex h-full flex-col p-8 text-left transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_56px_rgba(21,36,59,0.15)]">
      {icon ? (
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[rgba(40,114,113,0.08)] text-3xl transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>
      ) : (
        <div className="mb-6 inline-flex rounded-full bg-[rgba(157,92,47,0.1)] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.3em] text-[var(--brand-strong)]">
          Support path
        </div>
      )}

      <h3 className="text-3xl font-black text-[#13233d]">{title}</h3>
      <p className="mt-4 flex-1 text-sm leading-8 text-slate-600">{description}</p>

      <Link
        href={buttonLink}
        className={`mt-8 inline-flex w-fit rounded-full px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.24em] transition-all ${
          isPrimary
            ? 'bg-[#15243b] text-white shadow-[0_14px_28px_rgba(21,36,59,0.22)] hover:-translate-y-0.5'
            : 'bg-slate-100 text-[#13233d] hover:bg-[#15243b] hover:text-white'
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
}
