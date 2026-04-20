import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import DogCard from '@/components/ui/DogCard';
import { getPublishedDogs } from '@/lib/cms/db';

export const metadata: Metadata = {
  title: 'Dogs In Our Care',
  description:
    'Meet the rescued dogs currently receiving shelter support or ready for adoption at Second Chance Tails.',
};

export default function DogsPage() {
  const dogs = getPublishedDogs();
  const recoveredDogs = dogs.filter((dog) => dog.status === 'Recovered');
  const activeDogs = dogs.filter((dog) => dog.status !== 'Recovered');

  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="surface-panel px-8 py-10 md:px-12 md:py-14">
          <SectionHeader
            title="Dogs in our care"
            subtitle="Meet dogs currently recovering at the shelter and those who are ready to move into safe, loving homes."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <div className="surface-card p-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">All visible profiles</p>
              <p className="mt-4 text-4xl font-black text-[#13233d]">{dogs.length}</p>
            </div>
            <div className="surface-card p-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Recovered dogs</p>
              <p className="mt-4 text-4xl font-black text-[#13233d]">{recoveredDogs.length}</p>
            </div>
            <div className="surface-card p-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Active treatment cases</p>
              <p className="mt-4 text-4xl font-black text-[#13233d]">{activeDogs.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container space-y-14">
          <div>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black text-[#13233d]">Recovered and ready for adoption</h2>
                <p className="mt-3 max-w-3xl text-slate-600">
                  These dogs have completed treatment and are now looking for safe, loving homes.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {recoveredDogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  id={dog.publicId}
                  name={dog.name}
                  age={dog.age}
                  status={dog.status}
                  image={dog.image}
                  shortDescription={dog.shortDescription}
                  adoptionEligible={dog.adoptionEligible}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-4xl font-black text-[#13233d]">Currently receiving treatment</h2>
                <p className="mt-3 max-w-3xl text-slate-600">
                  These cases still need medical attention, rest, and daily shelter support.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {activeDogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  id={dog.publicId}
                  name={dog.name}
                  age={dog.age}
                  status={dog.status}
                  image={dog.image}
                  shortDescription={dog.shortDescription}
                  adoptionEligible={dog.adoptionEligible}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="surface-dark p-8 text-center md:p-12">
            <h2 className="text-4xl font-black text-white">Want to help one of these dogs?</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              Donations support treatment and daily care. Adoption enquiries help recovered dogs move into stable homes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/donate" className="btn-secondary">Donate for their care</Link>
              <Link href="/adoption" className="btn-outline border-white text-white hover:bg-white hover:text-[#13233d]">
                Start adoption enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
