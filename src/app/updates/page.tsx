import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import { getPublishedUpdates } from '@/lib/cms/db';

export const metadata: Metadata = {
  title: 'Updates',
  description: 'Read the latest rescue stories, shelter updates, donor notes, and visitor highlights from Second Chance Tails.',
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(value));
}

export default function UpdatesPage() {
  const updates = getPublishedUpdates();
  const [leadUpdate, ...otherUpdates] = updates;

  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="surface-panel px-8 py-10 md:px-12 md:py-14">
          <SectionHeader
            title="Shelter updates that stay current"
            subtitle="This section is built for frequent rescue posts, donor notes, shelter progress, visitor stories, and recovery milestones."
          />

          {leadUpdate ? (
            <article className="surface-card overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
                {leadUpdate.image ? (
                  <div className="relative min-h-[320px] bg-slate-100">
                    <Image src={leadUpdate.image} alt={leadUpdate.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                ) : null}
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="eyebrow !py-1 !text-[10px]">{leadUpdate.category}</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      {formatDate(leadUpdate.occurredAt)}
                    </span>
                  </div>
                  <h2 className="mt-5 text-4xl font-black text-[#13233d]">{leadUpdate.title}</h2>
                  <p className="mt-5 text-base leading-8 text-slate-600">{leadUpdate.excerpt}</p>
                  <Link href={`/updates/${leadUpdate.slug}`} className="btn-primary mt-7">
                    Read full update
                  </Link>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container grid gap-6 lg:grid-cols-3">
          {otherUpdates.map((update) => (
            <article key={update.id} className="surface-card overflow-hidden p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent-700">
                  {update.category}
                </span>
                <span className="text-sm text-slate-500">{formatDate(update.occurredAt)}</span>
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-900">{update.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{update.excerpt}</p>
              <Link href={`/updates/${update.slug}`} className="mt-6 inline-block text-sm font-semibold text-[#13233d]">
                Read full update
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
