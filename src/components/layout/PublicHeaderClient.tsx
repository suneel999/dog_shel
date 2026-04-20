'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dogs', label: 'Dogs' },
  { href: '/updates', label: 'Updates' },
  { href: '/transformations', label: 'Recoveries' },
  { href: '/adoption', label: 'Adopt' },
  { href: '/donate', label: 'Donate' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PublicHeaderClient({
  rescuePhone,
  whatsappPhone,
}: {
  rescuePhone: string;
  whatsappPhone: string;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialNumber = rescuePhone.replace(/\s+/g, '');
  const whatsappNumber = whatsappPhone.replace(/\s+/g, '');

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/60 bg-[rgba(255,252,247,0.84)] backdrop-blur-xl">
        <div className="border-b border-slate-200/70 bg-white/50">
          <div className="section-container flex flex-col gap-2 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="eyebrow !px-3 !py-1">24/7 Rescue</span>
              <a href={`tel:${dialNumber}`} className="hover:text-[var(--brand-strong)]">
                {rescuePhone}
              </a>
            </div>
            <p className="hidden sm:block">Rescue, treatment, shelter, recovery</p>
          </div>
        </div>

        <nav className="section-container py-4">
          <div className="flex items-center justify-between gap-4 xl:gap-6">
            <Link href="/" className="flex min-w-[210px] items-center gap-3 pr-3 sm:min-w-[228px] sm:gap-4">
              <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-[1.4rem] bg-white shadow-[0_12px_24px_rgba(21,36,59,0.12)]">
                <Image src="/images/logo.png" alt="Second Chance Tails" fill className="object-contain p-1" priority />
              </div>
              <div className="max-w-[220px] sm:max-w-[250px]">
                <p className="text-base font-black leading-none tracking-[-0.02em] text-[#1a237e] sm:text-lg xl:text-[1.35rem]">
                  Second Chance Tails
                </p>
                <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500 sm:text-[11px] sm:tracking-[0.26em]">
                  Hyderabad animal rescue
                </p>
              </div>
            </Link>

            <div className="hidden items-center gap-0.5 2xl:flex">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-3.5 py-2.5 text-sm font-bold transition ${
                      active
                        ? 'bg-[#1a237e] text-white shadow-[0_10px_25px_rgba(26,35,126,0.18)]'
                        : 'text-slate-700 hover:bg-white hover:text-[#1a237e]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link href="/emergency" className="btn-primary ml-2 !px-4 !py-3 !text-[13px]">
                Emergency Help
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300/80 bg-white text-slate-700 shadow-sm 2xl:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition ${
                    menuOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-current transition ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] block h-0.5 w-5 rounded-full bg-current transition ${
                    menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 2xl:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-[rgba(15,23,38,0.4)] backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute inset-x-4 top-24 bottom-24 overflow-y-auto rounded-[2rem] border border-white/20 bg-[rgba(255,252,247,0.96)] p-5 shadow-[0_28px_60px_rgba(21,36,59,0.2)] transition-all duration-300 ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="surface-dark px-5 py-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-300">Quick rescue access</p>
            <p className="mt-3 text-3xl font-black text-white">{rescuePhone}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a href={`tel:${dialNumber}`} className="btn-secondary text-center">
                Call now
              </a>
              <a
                href={`https://wa.me/91${whatsappNumber}?text=Hi, I need help regarding an animal rescue.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-white text-white hover:bg-white hover:text-[#13233d]"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-[1.2rem] px-4 py-4 text-sm font-bold transition ${
                    active
                      ? 'bg-[#15243b] text-white shadow-[0_14px_30px_rgba(21,36,59,0.18)]'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link href="/emergency" onClick={() => setMenuOpen(false)} className="btn-primary mt-4 w-full text-center">
            Emergency Help
          </Link>
        </div>
      </div>

      <div
        className={`fixed inset-x-3 bottom-3 z-40 transition duration-300 md:hidden ${
          menuOpen ? 'pointer-events-none translate-y-6 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div
          className="mobile-dock flex items-center gap-2 px-2 py-2"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)' }}
        >
          <a href={`tel:${dialNumber}`} className="mobile-dock-action mobile-dock-action--soft">
            Call
          </a>
          <a
            href={`https://wa.me/91${whatsappNumber}?text=Hi, I need help regarding an animal rescue.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-dock-action mobile-dock-action--accent"
          >
            WhatsApp
          </a>
          <Link href="/donate" className="mobile-dock-action mobile-dock-action--primary">
            Donate
          </Link>
        </div>
      </div>
    </>
  );
}
