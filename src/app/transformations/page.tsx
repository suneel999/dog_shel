import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import { getTransformationDogs } from '@/lib/cms/db';

export const metadata: Metadata = {
  title: 'Recovery Stories',
  description: 'See before-and-after recovery stories from rescued animals treated by Second Chance Tails.',
};

export default function TransformationsPage() {
  const transformationDogs = getTransformationDogs();

  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="surface-panel px-8 py-10 md:px-12 md:py-14">
          <SectionHeader
            title="Recovery stories with visible proof"
            subtitle="Before-and-after pairs are some of the strongest trust-builders on the site. They show the reality of rescue, treatment, and recovery."
          />

          <div className="surface-card p-5 sm:max-w-sm">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Stories currently visible</p>
            <p className="mt-4 text-4xl font-black text-[#13233d]">{transformationDogs.length}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="grid gap-6 lg:grid-cols-3">
            {transformationDogs.map((dog) => (
              <article key={dog.id} className="surface-card overflow-hidden">
                <div className="grid grid-cols-2">
                  <div className="p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-red-700">Before</p>
                    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-100">
                      <Image src={dog.beforeImage} alt={`${dog.name} before rescue`} fill className="object-cover" sizes="50vw" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-green-700">After</p>
                    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-100">
                      <Image src={dog.afterImage} alt={`${dog.name} after recovery`} fill className="object-cover" sizes="50vw" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-3xl font-black text-[#13233d]">{dog.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{dog.shortDescription}</p>
                  <Link href={`/dogs/${dog.publicId}`} className="mt-5 inline-block text-sm font-semibold text-[var(--brand-strong)]">
                    Read full story
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
