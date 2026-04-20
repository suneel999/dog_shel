import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { getSiteSettings } from '@/lib/cms/db';

export const metadata: Metadata = {
  title: 'Emergency Help',
  description: 'Call or message Second Chance Tails for urgent animal rescue support in Hyderabad.',
};

const emergencyTypes = [
  'Road accidents and hit-and-run injuries',
  'Open wounds, fractures, or visible trauma',
  'Animals unable to stand or move safely',
  'Abandoned puppies or vulnerable animals in danger',
  'Illness, seizures, or distress requiring urgent help',
  'Animals trapped in unsafe locations',
];

export default function EmergencyPage() {
  const settings = getSiteSettings();
  const dialNumber = settings.phone.replace(/\s+/g, '');

  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="surface-dark overflow-hidden px-8 py-10 md:px-12 md:py-14">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.34em] text-slate-300">Emergency rescue</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[0.98] text-white sm:text-5xl md:text-[3.5rem]">
            Call or WhatsApp the rescue line immediately.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 md:text-lg">
            The same number is used for phone calls and WhatsApp so responders can coordinate more quickly.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`tel:${dialNumber}`} className="btn-secondary">Call {settings.phone}</a>
            <a href={`https://wa.me/91${dialNumber}?text=Emergency! I found an injured animal.`} target="_blank" rel="noopener noreferrer" className="btn-outline border-white text-white hover:bg-white hover:text-red-700">
              WhatsApp {settings.whatsapp}
            </a>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              'Share your exact location.',
              'Send a clear photo or video if possible.',
              'Describe whether the animal is bleeding, unable to stand, trapped, or in traffic.',
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <SectionHeader
            title="Situations that usually need urgent help"
            subtitle="If you are unsure, it is still better to contact the shelter and share the condition clearly."
            centered
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {emergencyTypes.map((item) => (
              <div key={item} className="surface-card px-5 py-5 text-sm leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container">
          <div className="surface-panel px-8 py-10 md:px-10 md:py-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-slate-500">
                  After the first rescue message
                </p>
                <h2 className="mt-4 text-4xl font-black text-[#13233d]">
                  Recovery support continues after the first rescue call.
                </h2>
                <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-600">
                  Emergency care is only the beginning. Ongoing treatment, recovery, shelter support, and donor help are what turn a rescue into a real second chance.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/updates" className="btn-primary text-center">
                  View rescue updates
                </Link>
                <Link href="/donate" className="btn-outline text-center">
                  Support emergency care
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
