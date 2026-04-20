import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';
import HowToHelpCard from '@/components/ui/HowToHelpCard';
import DogCard from '@/components/ui/DogCard';
import { getFeaturedDogs, getFeaturedUpdates, getSiteSettings } from '@/lib/cms/db';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Second Chance Tails rescues, treats, and shelters animals in need across Hyderabad. Explore rescue stories, current cases, and ways to help.',
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(value));
}

export default function HomePage() {
  const settings = getSiteSettings();
  const featuredDogs = getFeaturedDogs(6);
  const featuredUpdates = getFeaturedUpdates(3);
  const leadDog = featuredDogs[0];
  const dialNumber = settings.phone.replace(/\s+/g, '');
  const whatsappNumber = settings.whatsapp.replace(/\s+/g, '');

  return (
    <div>
      <section className="section-container pt-8 sm:pt-10 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_480px]">
          <div className="surface-panel relative overflow-hidden px-7 py-10 md:px-10 md:py-12">
            <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-[rgba(157,92,47,0.12)] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[rgba(40,114,113,0.12)] blur-3xl" />

            <span className="eyebrow">Hyderabad Animal Rescue</span>
            <h1 className="relative mt-6 max-w-4xl text-4xl font-black leading-[0.96] text-[#13233d] sm:text-5xl md:text-6xl">
              {settings.heroTitle}
            </h1>
            <p className="relative mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {settings.heroText}
            </p>

            <div className="relative mt-8 flex flex-wrap gap-4">
              <Link href="/donate" className="btn-primary">
                Donate now
              </Link>
              <Link href="/adoption" className="btn-secondary">
                Adoption enquiry
              </Link>
              <Link href="/updates" className="btn-outline">
                See latest updates
              </Link>
            </div>

            <div className="relative mt-10 grid gap-4 md:grid-cols-3">
              <div className="surface-card p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">
                  Rescue line
                </p>
                <p className="mt-3 text-2xl font-black text-[#13233d]">{settings.phone}</p>
                <a href={`tel:${dialNumber}`} className="mt-4 inline-block text-sm font-bold text-[var(--brand-strong)]">
                  Call now
                </a>
              </div>
              <div className="surface-card p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">
                  WhatsApp
                </p>
                <p className="mt-3 text-2xl font-black text-[#13233d]">{settings.whatsapp}</p>
                <a
                  href={`https://wa.me/91${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-bold text-[var(--accent)]"
                >
                  Message instantly
                </a>
              </div>
              <div className="surface-card p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">
                  Shelter base
                </p>
                <p className="mt-3 text-lg font-black leading-7 text-[#13233d]">{settings.address}</p>
                <Link href="/contact" className="mt-4 inline-block text-sm font-bold text-[#1a237e]">
                  Visit contact page
                </Link>
              </div>
            </div>
          </div>

          <div className="surface-dark relative overflow-hidden px-6 py-6 md:px-8 md:py-8">
            <div className="relative overflow-hidden rounded-[1.8rem] bg-white/10">
              <div className="relative aspect-[4/3]">
                <Image
                  src={leadDog?.image || '/images/dogs/after_4.jpeg'}
                  alt={leadDog?.name || 'Rescued dog at the shelter'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-300">
                  Featured recovery
                </p>
                <h2 className="mt-3 text-3xl font-black text-white">{leadDog?.name || 'Featured rescue'}</h2>
              </div>
              {leadDog?.status && (
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.24em] text-white">
                  {leadDog.status}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-8 text-slate-200">
              {leadDog?.shortDescription ||
                'Follow one of the animals currently receiving treatment, recovery support, or a second chance at adoption.'}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-300">Mission</p>
                <p className="mt-3 text-sm leading-7 text-slate-100">{settings.missionText}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-300">Why this site matters</p>
                <p className="mt-3 text-sm leading-7 text-slate-100">
                  Frequent rescue posts, donor updates, visitor notes, and current dog profiles build trust with the public.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            title="Shelter impact with visible proof"
            subtitle="Rescue numbers, recovery stories, and visible progress help supporters understand the scale of the shelter's work."
            centered
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard number={settings.dogsRescued} label="Animals Rescued" icon="Rescue" />
            <StatCard number={settings.dogsTreated} label="Animals Treated" icon="Medical" />
            <StatCard number={settings.dogsAdopted} label="Adoptions" icon="Homes" />
            <StatCard number={settings.activeCases} label="Active Cases" icon="Current" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            title="Dogs in our care"
            subtitle="Recovered dogs can be featured for adoption, while active cases stay visible so supporters understand the ongoing workload."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {featuredDogs.map((dog) => (
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

          <div className="mt-10 text-center">
            <Link href="/dogs" className="btn-secondary">
              View all dog profiles
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            title="Latest updates from the shelter"
            subtitle="This section is designed to stay fresh with new rescues, donor stories, visitor notes, and shelter progress updates."
            centered
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredUpdates.map((update) => (
              <article key={update.id} className="surface-card overflow-hidden">
                {update.image ? (
                  <div className="relative aspect-[16/10]">
                    <Image src={update.image} alt={update.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="eyebrow !py-1 !text-[10px]">{update.category}</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      {formatDate(update.occurredAt)}
                    </span>
                  </div>
                  <h3 className="mt-5 text-3xl font-black text-[#13233d]">{update.title}</h3>
                  <p className="mt-4 text-sm leading-8 text-slate-600">{update.excerpt}</p>
                  <Link href={`/updates/${update.slug}`} className="mt-6 inline-block text-sm font-bold text-[var(--brand-strong)]">
                    Read full update
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="surface-panel px-8 py-10 md:px-10 md:py-12">
            <SectionHeader
              title="How supporters can actually help"
              subtitle="Every form of support helps keep rescue, treatment, recovery, and adoption work moving."
              centered
            />

            <div className="grid gap-6 md:grid-cols-3">
              <HowToHelpCard
                title="Donate"
                description="Support food, medicines, transport, and recovery care so emergency cases can keep receiving attention."
                buttonText="Support the shelter"
                buttonLink="/donate"
                isPrimary
              />
              <HowToHelpCard
                title="Volunteer"
                description="From dog care to photography and coordination, volunteers strengthen the shelter far beyond rescue alone."
                buttonText="Volunteer with us"
                buttonLink="/volunteer"
              />
              <HowToHelpCard
                title="Adopt"
                description="Recovered dogs can be showcased more professionally so the public understands their story and feels confident enquiring."
                buttonText="Start adoption enquiry"
                buttonLink="/adoption"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
