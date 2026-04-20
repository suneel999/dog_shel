import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { getSiteSettings } from '@/lib/cms/db';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support Second Chance Tails with shelter donations for rescue, treatment, and daily animal care.',
};

export default function DonatePage() {
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_420px]">
          <div className="surface-panel px-8 py-10 md:px-12 md:py-14">
            <span className="eyebrow">Donate</span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[0.98] text-[#13233d] sm:text-5xl md:text-[3.5rem]">
              Support the less visible work that keeps rescues alive after the first emergency.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Donations help cover medicines, surgeries, shelter food, cleaning, rent, rescue transport, and daily care for active cases.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="btn-primary">
                Call the shelter
              </a>
              <a
                href={`https://wa.me/91${settings.whatsapp.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          <div className="surface-dark px-8 py-10">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-slate-300">
              Why recurring support matters
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-100">
              <p>Emergency rescues are unpredictable, but food, medicines, rent, and cleaning are constant monthly costs.</p>
              <p>Regular donor support helps the shelter respond faster without delaying treatment decisions.</p>
              <p>Posting donor-backed updates on the website also builds public trust and long-term support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            title="A transparent picture of where support goes"
            subtitle="This page is designed to make giving feel credible, practical, and connected to the shelter's real daily workload."
            centered
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="surface-card p-8">
              <h2 className="text-2xl font-black text-[#13233d]">Monthly costs</h2>
              <div className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                <p>Food and nutrition: Rs 40,000</p>
                <p>Medicines and treatment: Rs 60,000</p>
                <p>Shelter rent and utilities: Rs 25,000</p>
                <p>Staff support: Rs 30,000</p>
                <p>Rescue transport: Rs 15,000</p>
              </div>
            </div>

            <div className="surface-card p-8">
              <h2 className="text-2xl font-black text-[#13233d]">How to give</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                <p>UPI: secondchancetails@upi</p>
                <p>Bank transfer details can be confirmed directly with the shelter team.</p>
                <p>For receipts, donor records, or sponsorship questions, contact {settings.email}.</p>
              </div>
            </div>

            <div className="surface-card p-8">
              <h2 className="text-2xl font-black text-[#13233d]">Quick contact</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                <p>Phone / WhatsApp: {settings.phone}</p>
                <p>Email: {settings.email}</p>
                <p>Use website updates to spotlight donor impact, sponsored treatments, and recovery milestones.</p>
              </div>
              <a href={`mailto:${settings.email}`} className="btn-outline mt-6">
                Email the shelter
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="surface-panel px-8 py-10 md:px-10 md:py-12">
            <SectionHeader
              title="Support beyond one-time giving"
              subtitle="The shelter can now publish donor highlights and funding-backed recovery stories, which makes sponsorships and recurring support easier to communicate."
              centered
            />

            <div className="grid gap-6 md:grid-cols-3">
              <div className="surface-card p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Food sponsor</p>
                <h3 className="mt-4 text-3xl font-black text-[#13233d]">Monthly meals</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Help fund food and nutrition for dogs in active treatment and recovery.
                </p>
              </div>
              <div className="surface-card p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Medical sponsor</p>
                <h3 className="mt-4 text-3xl font-black text-[#13233d]">Treatment support</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Support medicines, tests, surgery, and follow-up care for emergency cases.
                </p>
              </div>
              <div className="surface-card p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Shelter sponsor</p>
                <h3 className="mt-4 text-3xl font-black text-[#13233d]">Operations support</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Help cover rent, cleaning, utilities, and the everyday logistics behind safe recovery.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/updates" className="btn-secondary">
                See impact updates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
