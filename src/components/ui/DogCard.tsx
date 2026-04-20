import Link from 'next/link';
import Image from 'next/image';

interface DogCardProps {
  id: string;
  name: string;
  age: string;
  status: string;
  image: string;
  shortDescription: string;
  adoptionEligible: boolean;
}

export default function DogCard({
  id,
  name,
  age,
  status,
  image,
  shortDescription,
  adoptionEligible,
}: DogCardProps) {
  const statusStyles =
    status === 'Recovered'
      ? 'bg-emerald-50 text-emerald-800'
      : status === 'Injured'
        ? 'bg-rose-50 text-rose-800'
        : 'bg-sky-50 text-sky-800';

  return (
    <article className="surface-card group overflow-hidden transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(21,36,59,0.16)]">
      <div className="relative aspect-[4/4.2] overflow-hidden bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={`${name} - ${status}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-100 px-6 text-center text-sm font-medium text-slate-500">
            Photo coming soon
          </div>
        )}

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.24em] ${statusStyles}`}>
            {status}
          </span>
          {adoptionEligible ? (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--brand-strong)]">
              Adoptable
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-slate-500">
              Rescue profile
            </p>
            <h3 className="mt-3 text-3xl font-black text-[#13233d] transition-colors group-hover:text-[var(--brand-strong)]">
              {name}
            </h3>
          </div>
          <span className="rounded-full bg-[rgba(40,114,113,0.08)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            {age}
          </span>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
          {shortDescription}
        </p>

        <div className="mt-7 flex items-center justify-between gap-4">
          <Link
            href={`/dogs/${id}`}
            className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#13233d]"
          >
            Read story
          </Link>
          {adoptionEligible ? (
            <Link
              href="/adoption"
              className="rounded-full bg-[rgba(157,92,47,0.1)] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--brand-strong)] transition hover:bg-[var(--brand-strong)] hover:text-white"
            >
              Adopt
            </Link>
          ) : (
            <Link
              href="/donate"
              className="rounded-full bg-slate-100 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.24em] text-slate-700 transition hover:bg-[#15243b] hover:text-white"
            >
              Support
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
