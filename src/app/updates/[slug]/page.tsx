import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getUpdateBySlug } from '@/lib/cms/db';

interface UpdateDetailPageProps {
  params: {
    slug: string;
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export async function generateMetadata({ params }: UpdateDetailPageProps): Promise<Metadata> {
  const update = getUpdateBySlug(params.slug);

  if (!update) {
    return { title: 'Update Not Found' };
  }

  return {
    title: update.title,
    description: update.excerpt,
  };
}

export default function UpdateDetailPage({ params }: UpdateDetailPageProps) {
  const update = getUpdateBySlug(params.slug);

  if (!update) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="surface-panel mx-auto max-w-5xl px-8 py-10 md:px-12 md:py-14">
          <Link href="/updates" className="text-sm font-semibold text-accent-700">
            Back to updates
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent-700">
              {update.category}
            </span>
            <span className="text-sm text-slate-500">{formatDate(update.occurredAt)}</span>
          </div>
          <h1 className="mt-5 text-5xl font-black leading-tight text-[#13233d]">{update.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{update.excerpt}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-5xl">
          {update.image ? (
            <div className="surface-card relative mb-8 aspect-[16/9] overflow-hidden bg-slate-100">
              <Image src={update.image} alt={update.title} fill className="object-cover" sizes="100vw" />
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="surface-card p-8">
              <p className="whitespace-pre-line leading-8 text-slate-700">{update.body}</p>
            </article>

            <aside className="surface-card h-fit p-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Why this matters</p>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                <p>Regular updates make the shelter feel active, accountable, and worth supporting.</p>
                <p>Stories like this help rescuers, donors, adopters, and visitors stay connected to the shelter's work.</p>
              </div>
              <Link href="/donate" className="btn-primary mt-6 w-full">
                Support the shelter
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
