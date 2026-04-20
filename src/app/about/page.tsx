import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import { getSiteSettings } from '@/lib/cms/db';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the mission and shelter work behind Second Chance Tails.',
};

export default function AboutPage() {
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="surface-panel relative overflow-hidden px-8 py-10 md:px-12 md:py-14">
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[rgba(157,92,47,0.12)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[rgba(40,114,113,0.12)] blur-3xl" />

          <span className="eyebrow">About The Shelter</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[0.98] text-[#13233d] sm:text-5xl md:text-[3.5rem]">
            A real rescue shelter that needs a public presence as active as its work on the ground.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            {settings.missionText}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/updates" className="btn-primary">
              See shelter updates
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact the team
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            title="The work behind every recovery story"
            subtitle="Second Chance Tails is not just posting feel-good rescues. It is coordinating urgent response, veterinary treatment, recovery support, daily shelter care, donor trust, and adoption follow-through."
            centered
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard number={settings.dogsRescued} label="Animals Rescued" icon="Rescue" />
            <StatCard number={settings.dogsTreated} label="Animals Treated" icon="Medical" />
            <StatCard number={settings.dogsAdopted} label="Successful Adoptions" icon="Homes" />
            <StatCard number={settings.activeCases} label="Active Care Cases" icon="Current" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_420px]">
          <div className="surface-dark px-8 py-10 md:px-10 md:py-12">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-slate-300">
              What the shelter handles
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                'Emergency rescues for road accidents, wounds, illness, and abandonment.',
                'Daily medical follow-up, treatment coordination, and rest for active cases.',
                'Before-and-after documentation that helps donors and adopters trust the work.',
                'Volunteer coordination, visitor communication, and adoption screening.',
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-slate-500">
              Why the new website matters
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>
                The team can now update new rescues, shelter photos, donor notes, visitor stories, and adoption-ready dogs without touching source code.
              </p>
              <p>
                That makes the website more credible for the public, more useful for day-to-day operations, and much easier to keep current.
              </p>
              <p>Shelter base: {settings.address}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/volunteer" className="btn-primary text-center">
                Volunteer with us
              </Link>
              <Link href="/donate" className="btn-outline text-center">
                Support the shelter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
