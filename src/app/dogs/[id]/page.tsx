import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDogByPublicId } from '@/lib/cms/db';

interface DogDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: DogDetailPageProps): Promise<Metadata> {
  const dog = getDogByPublicId(params.id);

  if (!dog) {
    return { title: 'Dog Not Found' };
  }

  return {
    title: `${dog.name} - ${dog.age}`,
    description: dog.shortDescription,
  };
}

export default function DogDetailPage({ params }: DogDetailPageProps) {
  const dog = getDogByPublicId(params.id);

  if (!dog) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="section-container py-4">
          <Link href="/dogs" className="text-sm font-semibold text-accent-700">
            Back to all dog profiles
          </Link>
        </div>
      </div>

      <section className="section-padding">
        <div className="section-container grid gap-12 lg:grid-cols-[520px_minmax(0,1fr)]">
          <div className="space-y-5">
            <div className="surface-card relative overflow-hidden">
              <div className="relative aspect-[4/3] bg-slate-100">
                {dog.image ? (
                  <Image
                    src={dog.image}
                    alt={`${dog.name} - ${dog.status}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-slate-500">
                    Photo coming soon
                  </div>
                )}
              </div>
            </div>

            {dog.beforeImage && dog.afterImage ? (
              <div className="surface-card p-5">
                <h2 className="text-2xl font-black text-[#13233d]">Recovery journey</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-700">Before</p>
                    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-100">
                      <Image src={dog.beforeImage} alt={`${dog.name} before rescue`} fill className="object-cover" sizes="50vw" />
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-green-700">After</p>
                    <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-100">
                      <Image src={dog.afterImage} alt={`${dog.name} after recovery`} fill className="object-cover" sizes="50vw" />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="surface-panel p-8 md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-slate-500">Dog profile</p>
                <h1 className="mt-3 text-5xl font-black text-[#13233d]">{dog.name}</h1>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                  {dog.age} / {dog.gender}
                </p>
              </div>
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  dog.status === 'Recovered'
                    ? 'bg-green-100 text-green-800'
                    : dog.status === 'Injured'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                }`}
              >
                {dog.status}
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="surface-card p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-slate-500">Status</p>
                <p className="mt-3 text-xl font-black text-[#13233d]">{dog.status}</p>
              </div>
              <div className="surface-card p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-slate-500">Adoption</p>
                <p className="mt-3 text-xl font-black text-[#13233d]">
                  {dog.adoptionEligible ? 'Ready for enquiries' : 'Still in recovery'}
                </p>
              </div>
              <div className="surface-card p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-slate-500">Profile ID</p>
                <p className="mt-3 text-xl font-black text-[#13233d]">#{dog.publicId}</p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-[#13233d]">About {dog.name}</h2>
                <p className="mt-3 leading-8 text-slate-600">{dog.fullDescription}</p>
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#13233d]">Rescue story</h2>
                <p className="mt-3 leading-8 text-slate-600">{dog.rescueStory}</p>
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#13233d]">Health status</h2>
                <p className="mt-3 leading-8 text-slate-600">{dog.healthStatus}</p>
              </div>

              {dog.specialNeeds ? (
                <div className="rounded-[1.8rem] border border-amber-200 bg-amber-50 p-5">
                  <h3 className="text-xl font-black text-amber-900">Special needs</h3>
                  <p className="mt-3 text-sm leading-7 text-amber-800">{dog.specialNeeds}</p>
                </div>
              ) : null}

              {dog.adoptionEligible ? (
                <div className="rounded-[1.8rem] border border-emerald-200 bg-emerald-50 p-6">
                  <h3 className="text-xl font-black text-emerald-900">Available for adoption</h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-800">
                    {dog.name} has completed treatment and can be matched with a safe, loving home.
                  </p>
                  <Link href="/adoption" className="btn-primary mt-5 inline-block">
                    Start adoption enquiry
                  </Link>
                </div>
              ) : (
                <div className="rounded-[1.8rem] border border-blue-200 bg-blue-50 p-6">
                  <h3 className="text-xl font-black text-blue-900">Still in recovery</h3>
                  <p className="mt-3 text-sm leading-7 text-blue-800">
                    {dog.name} is still receiving treatment or rehabilitation support. Donations help cover daily care and medical needs.
                  </p>
                  <Link href="/donate" className="btn-primary mt-5 inline-block">
                    Donate for this case
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
