import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { submitVolunteerFormAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Volunteer',
  description: 'Volunteer with Second Chance Tails and support rescue, recovery, and shelter work.',
};

interface VolunteerPageProps {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
}

const volunteerRoles = [
  'Dog care and feeding',
  'Walking and exercise support',
  'Shelter cleaning and organization',
  'Rescue transport support',
  'Photography and social media content',
  'Admin, donor, and visitor coordination',
];

export default function VolunteerPage({ searchParams }: VolunteerPageProps) {
  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_420px]">
          <div className="surface-panel px-8 py-10 md:px-12 md:py-14">
            <SectionHeader
              title="Volunteer with the shelter"
              subtitle="Whether you help with dogs, transport, photography, or coordination, your time can make the shelter stronger."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {[
                'Hands-on shelter care is still the most valuable support on busy days.',
                'Transport, photography, and admin help are equally useful when rescue volume rises.',
                'Volunteer support helps the team stay responsive during both calm days and rescue-heavy weeks.',
              ].map((item) => (
                <div key={item} className="surface-card p-4 text-sm leading-7 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-dark px-8 py-10">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-slate-300">
              Strong volunteer support includes
            </p>
            <div className="mt-6 space-y-4">
              {[
                'Showing up consistently when you commit to a task.',
                'Comfort with shelter realities like cleaning, illness, and recovery care.',
                'Helping the shelter stay organized, visible, and responsive to the public.',
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-100">
                  {item}
                </div>
              ))}
            </div>
            <Link href="/updates" className="btn-secondary mt-8">
              See recent shelter activity
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="surface-card p-8">
            <h2 className="text-3xl font-black text-[#13233d]">Ways to volunteer</h2>
            <div className="mt-6 space-y-3">
              {volunteerRoles.map((role) => (
                <div key={role} className="rounded-[1.5rem] bg-[rgba(157,92,47,0.06)] px-5 py-4 text-sm font-medium text-slate-700">
                  {role}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-3xl font-black text-[#13233d]">Volunteer application</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Tell the team how you would like to help and when you are available.
            </p>

            {searchParams?.submitted === '1' && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Your volunteer application has been submitted successfully.
              </div>
            )}

            {searchParams?.error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Please complete the required fields and choose at least one interest.
              </div>
            )}

            <form action={submitVolunteerFormAction} className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Full name</label>
                  <input name="name" required className="input-field" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Phone number</label>
                  <input name="phone" required className="input-field" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Email address</label>
                <input name="email" type="email" required className="input-field" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">City / area</label>
                <input name="city" required className="input-field" placeholder="Bowrampet, Gachibowli, Madhapur..." />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Availability</label>
                <select name="availability" required className="input-field" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option value="Weekday mornings">Weekday mornings</option>
                  <option value="Weekday evenings">Weekday evenings</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <p className="mb-3 block text-sm font-semibold text-gray-700">Areas of interest</p>
                <div className="space-y-3">
                  {[
                    ['dog-care', 'Dog care and feeding'],
                    ['walking', 'Walking and exercise'],
                    ['cleaning', 'Shelter cleaning'],
                    ['transport', 'Rescue transport'],
                    ['media', 'Photography and social media'],
                    ['admin', 'Admin and coordination'],
                  ].map(([value, label]) => (
                    <label key={value} className="flex items-center gap-3 text-sm text-slate-700">
                      <input type="checkbox" name="interests" value={value} className="h-4 w-4 rounded border-gray-300 text-accent-600" />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Relevant experience</label>
                <textarea name="experience" rows={3} className="input-field" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Why do you want to volunteer?</label>
                <textarea name="message" rows={5} required className="input-field" />
              </div>

              <button type="submit" className="btn-primary w-full">
                Submit volunteer application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
