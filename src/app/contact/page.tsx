import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { getSiteSettings } from '@/lib/cms/db';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Second Chance Tails for emergency rescues, shelter visits, adoptions, donations, and volunteering.',
};

export default function ContactPage() {
  const settings = getSiteSettings();
  const dialNumber = settings.phone.replace(/\s+/g, '');
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${settings.mapLat},${settings.mapLng}`;

  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_420px]">
          <div className="surface-panel px-8 py-10 md:px-12 md:py-14">
            <SectionHeader
              title="Reach the shelter team quickly"
              subtitle="Emergency rescues and WhatsApp now use the same number so callers do not have to guess which line to use during urgent situations."
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="surface-card p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">
                  Emergency rescue
                </p>
                <p className="mt-4 text-3xl font-black text-[#13233d]">{settings.phone}</p>
                <a href={`tel:${dialNumber}`} className="mt-5 inline-block text-sm font-bold text-[var(--brand-strong)]">
                  Call now
                </a>
              </div>
              <div className="surface-card p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">
                  WhatsApp
                </p>
                <p className="mt-4 text-3xl font-black text-[#13233d]">{settings.whatsapp}</p>
                <a
                  href={`https://wa.me/91${dialNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block text-sm font-bold text-[var(--accent)]"
                >
                  Open chat
                </a>
              </div>
            </div>
          </div>

          <div className="surface-dark px-8 py-10">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-slate-300">
              Best way to contact us
            </p>
            <div className="mt-6 space-y-4">
              {[
                'For emergencies, share the exact location, a clear photo, and what happened.',
                'For visits, donations, or adoption questions, WhatsApp is usually the fastest path.',
                'For receipts, partnerships, or detailed follow-up, use email as well.',
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-100">
                  {item}
                </div>
              ))}
            </div>
            <Link href="/emergency" className="btn-secondary mt-8">
              Emergency instructions
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="surface-card p-8">
            <h2 className="text-2xl font-black text-[#13233d]">Email</h2>
            <p className="mt-4 break-all text-lg font-semibold text-slate-900">{settings.email}</p>
            <a href={`mailto:${settings.email}`} className="mt-6 inline-block text-sm font-semibold text-[var(--brand-strong)]">Send email</a>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-2xl font-black text-[#13233d]">Shelter location</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-900">{settings.address}</p>
            <a href={mapHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-semibold text-[var(--accent)]">Open map</a>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-2xl font-black text-[#13233d]">Adoption enquiries</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Share your home details and preferred dog so the shelter team can guide you toward the right match.
            </p>
            <Link href="/adoption" className="mt-6 inline-block text-sm font-semibold text-[#13233d]">
              Start adoption form
            </Link>
          </div>
          <div className="surface-card p-8">
            <h2 className="text-2xl font-black text-[#13233d]">Volunteer support</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Dog care, transport, photography, admin help, and visitor coordination can all be managed through the site.
            </p>
            <Link href="/volunteer" className="mt-6 inline-block text-sm font-semibold text-[#13233d]">
              Volunteer application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
