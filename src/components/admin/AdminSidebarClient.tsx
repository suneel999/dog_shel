'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    href: '/admin',
    label: 'Overview',
    description: 'Snapshot of the shelter',
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    description: 'Contact info and homepage content',
  },
  {
    href: '/admin/dogs',
    label: 'Dogs',
    description: 'Profiles and recovery stories',
  },
  {
    href: '/admin/updates',
    label: 'Updates',
    description: 'Rescues, donors, visitors',
  },
  {
    href: '/admin/forms',
    label: 'Forms',
    description: 'Adoption and volunteer enquiries',
  },
];

function isActive(pathname: string, href: string) {
  if (href === '/admin') {
    return pathname === '/admin';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebarClient() {
  const pathname = usePathname();

  return (
    <>
      <div className="xl:hidden">
        <div className="admin-card p-3">
          <p className="px-3 pt-2 text-[11px] font-extrabold uppercase tracking-[0.34em] text-slate-500">
            Admin sections
          </p>
          <nav className="hide-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
            {navLinks.map((link, index) => {
              const active = isActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`min-w-[210px] shrink-0 rounded-[1.4rem] px-4 py-4 transition ${
                    active
                      ? 'bg-[#15243b] text-white shadow-[0_16px_30px_rgba(21,36,59,0.2)]'
                      : 'bg-white/80 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black uppercase tracking-[0.2em] ${
                        active ? 'bg-white/10 text-white' : 'bg-[rgba(157,92,47,0.1)] text-[var(--brand-strong)]'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{link.label}</p>
                      <p className={`text-xs ${active ? 'text-slate-200' : 'text-slate-500'}`}>
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <aside className="admin-card sticky top-8 hidden p-4 xl:block">
        <p className="px-3 pt-2 text-[11px] font-extrabold uppercase tracking-[0.34em] text-slate-500">
          Navigation
        </p>
        <nav className="mt-4 space-y-2">
          {navLinks.map((link, index) => {
            const active = isActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-[1.4rem] px-4 py-4 transition ${
                  active
                    ? 'bg-[#15243b] text-white shadow-[0_16px_30px_rgba(21,36,59,0.2)]'
                    : 'bg-white/70 text-slate-700 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black uppercase tracking-[0.2em] ${
                      active ? 'bg-white/10 text-white' : 'bg-[rgba(157,92,47,0.1)] text-[var(--brand-strong)]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{link.label}</p>
                    <p className={`text-xs ${active ? 'text-slate-200' : 'text-slate-500'}`}>
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
