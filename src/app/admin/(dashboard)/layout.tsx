import Link from 'next/link';
import type { ReactNode } from 'react';
import { requireAdmin } from '@/lib/cms/auth';
import { logoutAction } from '@/app/admin/actions';
import { getSiteSettings } from '@/lib/cms/db';
import AdminSidebarClient from '@/components/admin/AdminSidebarClient';

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  requireAdmin();
  const settings = getSiteSettings();

  return (
    <div className="admin-shell min-h-screen">
      <header className="border-b border-white/60 bg-[rgba(255,252,247,0.78)] backdrop-blur-xl">
        <div className="section-container flex flex-col gap-5 py-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow">Shelter CMS</span>
            <h1 className="mt-4 text-3xl font-black text-[#13233d] md:text-4xl">Manage the public website without touching code</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Update rescue cases, add new shelter posts, review public submissions, and keep the emergency line current. Public rescue line: {settings.phone}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link href="/" className="btn-secondary w-full sm:w-auto">
              View website
            </Link>
            <form action={logoutAction} className="w-full sm:w-auto">
              <button type="submit" className="btn-outline w-full sm:w-auto">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="section-container grid gap-6 py-6 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-8 xl:py-8">
        <AdminSidebarClient />
        <main>{children}</main>
      </div>
    </div>
  );
}
