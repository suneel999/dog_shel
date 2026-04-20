import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { submitAdoptionFormAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Adoption',
  description: 'Submit an adoption enquiry for a recovered dog at Second Chance Tails.',
};

interface AdoptionPageProps {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
}

const processSteps = [
  'Submit the enquiry form with honest details about your home and lifestyle.',
  'Our team reviews the application and contacts you for an initial conversation.',
  'You visit the shelter and spend time with the dog you want to adopt.',
  'We may conduct a home check to ensure the environment is safe for the dog.',
  'If the match feels right, we complete the adoption and stay in touch after placement.',
];

export default function AdoptionPage({ searchParams }: AdoptionPageProps) {
  return (
    <div className="min-h-screen">
      <section className="section-container pt-10 sm:pt-12 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_420px]">
          <div className="surface-panel px-8 py-10 md:px-12 md:py-14">
            <SectionHeader
              title="Adopt a recovered shelter dog"
              subtitle="Adoption is a serious long-term commitment. The shelter wants every recovered dog to move into a patient, safe, and prepared home."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {[
                'Honest home and lifestyle details help the team recommend the right match.',
                'Recovered dogs still need patience, stability, and continued care after adoption.',
                'Clear information helps the shelter team review your enquiry and follow up with the right next step.',
              ].map((item) => (
                <div key={item} className="surface-card p-4 text-sm leading-7 text-slate-600">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-dark px-8 py-10">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-slate-300">
              Good adopters usually offer
            </p>
            <div className="mt-6 space-y-4">
              {[
                'Time for daily care, walks, and follow-up adjustment.',
                'A household that agrees on the adoption and can handle emergencies.',
                'Willingness to stay in touch with the shelter after adoption.',
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-100">
                  {item}
                </div>
              ))}
            </div>
            <Link href="/dogs" className="btn-secondary mt-8">
              Browse dog profiles
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="surface-card p-8">
            <h2 className="text-3xl font-black text-[#13233d]">How the process works</h2>
            <div className="mt-6 space-y-4">
              {processSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-[1.5rem] bg-[rgba(157,92,47,0.06)] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#15243b] font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-3xl font-black text-[#13233d]">Adoption enquiry form</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Share your home setup, experience, and availability so the team can understand whether the match is right.
            </p>

            {searchParams?.submitted === '1' && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Your adoption enquiry has been submitted successfully. The shelter team will review it and follow up.
              </div>
            )}

            {searchParams?.error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Please fill in all required fields before submitting.
              </div>
            )}

            <form action={submitAdoptionFormAction} className="mt-8 space-y-6">
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
                <label className="mb-2 block text-sm font-semibold text-gray-700">Full address</label>
                <input name="address" required className="input-field" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Experience with dogs</label>
                <select name="experience" required className="input-field" defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option value="Extensive experience">Extensive experience</option>
                  <option value="Some experience">Some experience</option>
                  <option value="First-time adopter">First-time adopter</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Tell us about any previous dogs</label>
                <textarea name="previousDogs" rows={3} className="input-field" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Daily time available</label>
                  <select name="timeAvailability" required className="input-field" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option value="1-2 hours">1-2 hours</option>
                    <option value="3-4 hours">3-4 hours</option>
                    <option value="5+ hours">5+ hours</option>
                    <option value="Full-time at home">Full-time at home</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">People in the household</label>
                  <input name="householdSize" required className="input-field" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Preferred dog</label>
                <input name="preferredDog" className="input-field" placeholder="Optional - name from the Dogs page" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Why do you want to adopt?</label>
                <textarea name="message" rows={5} required className="input-field" />
              </div>

              <button type="submit" className="btn-primary w-full">
                Submit adoption enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
