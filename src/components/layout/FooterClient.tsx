'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FooterClientProps {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export default function FooterClient({ phone, whatsapp, email, address }: FooterClientProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="mt-12 px-4 pb-28 sm:px-6 sm:pb-6 lg:px-8">
      <div className="section-container surface-dark overflow-hidden px-8 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.8fr]">
          <div>
            <span className="eyebrow !bg-white/10 !text-white !shadow-none">Second Chance Tails</span>
            <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">
              Rescue work that stays visible, current, and trusted.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-200 md:text-base">
              We rescue, treat, shelter, and rehabilitate injured or abandoned animals across Hyderabad.
              Recovery stories, donor support, visitor updates, and shelter contact details all live here so
              the public can stay close to the work.
            </p>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-slate-300">Explore</p>
            <div className="mt-5 space-y-3 text-sm font-bold">
              <Link href="/dogs" className="block text-slate-100 hover:text-white">Dogs in our care</Link>
              <Link href="/updates" className="block text-slate-100 hover:text-white">Latest updates</Link>
              <Link href="/adoption" className="block text-slate-100 hover:text-white">Adoption</Link>
              <Link href="/volunteer" className="block text-slate-100 hover:text-white">Volunteer</Link>
              <Link href="/donate" className="block text-slate-100 hover:text-white">Donate</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-slate-300">Contact</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-200">
              <p>
                <strong className="text-white">Emergency / WhatsApp</strong>
                <br />
                {phone}
              </p>
              <p>
                <strong className="text-white">Email</strong>
                <br />
                {email}
              </p>
              <p>
                <strong className="text-white">Address</strong>
                <br />
                {address}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="btn-secondary !justify-start">
                Call rescue line
              </a>
              <a
                href={`https://wa.me/91${whatsapp.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !justify-start !border-white/20 !bg-white/10 !text-white hover:!bg-white/16"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs font-bold uppercase tracking-[0.28em] text-slate-300">
          Copyright {new Date().getFullYear()} Second Chance Tails
        </div>
      </div>
    </footer>
  );
}
