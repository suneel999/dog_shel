import Link from 'next/link';
import { getAdminUpdates, getDashboardCounts, getSiteSettings } from '@/lib/cms/db';
import { isUsingDefaultAdminPassword } from '@/lib/cms/auth';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function AdminOverviewPage() {
  const counts = getDashboardCounts();
  const settings = getSiteSettings();
  const recentUpdates = getAdminUpdates().slice(0, 4);

  return (
    <div className="space-y-8">
      {isUsingDefaultAdminPassword() && (
        <div className="admin-card border-amber-200 bg-amber-50/80 px-6 py-5 text-sm text-amber-900">
          The dashboard is still using the placeholder admin password from `.env.example`. Set a real
          `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` before deployment.
        </div>
      )}

      <section className="surface-dark px-8 py-8 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <span className="eyebrow !bg-white/10 !text-white !shadow-none">Overview</span>
            <h2 className="mt-5 text-4xl font-black text-white">Everything the shelter team needs in one place.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-200 md:text-base">
              This dashboard is now structured to make routine updates easier: changing the rescue number, adding dog profiles, publishing updates, and reviewing incoming enquiries.
            </p>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-300">
              Current rescue number
            </p>
            <p className="mt-3 text-3xl font-black text-white">{settings.phone}</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              Shared across emergency rescues and WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="admin-stat">
          <p className="admin-badge">Dog profiles</p>
          <p className="mt-4 text-5xl font-black text-[#13233d]">{counts.dogs}</p>
          <p className="mt-2 text-sm text-slate-500">Published and draft rescue profiles</p>
        </div>
        <div className="admin-stat">
          <p className="admin-badge">Updates</p>
          <p className="mt-4 text-5xl font-black text-[#13233d]">{counts.updates}</p>
          <p className="mt-2 text-sm text-slate-500">Rescues, donors, visitors, announcements</p>
        </div>
        <div className="admin-stat">
          <p className="admin-badge">Adoption</p>
          <p className="mt-4 text-5xl font-black text-[#13233d]">{counts.adoptionRequests}</p>
          <p className="mt-2 text-sm text-slate-500">Incoming adoption enquiries</p>
        </div>
        <div className="admin-stat">
          <p className="admin-badge">Volunteer</p>
          <p className="mt-4 text-5xl font-black text-[#13233d]">{counts.volunteerRequests}</p>
          <p className="mt-2 text-sm text-slate-500">New volunteer applications</p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="admin-card p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Recent updates</span>
              <h3 className="mt-4 text-3xl font-black text-[#13233d]">Latest content activity</h3>
            </div>
            <Link href="/admin/updates" className="btn-secondary">
              Manage updates
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {recentUpdates.map((update) => (
              <div key={update.id} className="rounded-[1.6rem] border border-slate-200/80 bg-white/80 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="admin-badge">{update.category}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    {formatDate(update.occurredAt)}
                  </span>
                </div>
                <h4 className="mt-4 text-2xl font-black text-[#13233d]">{update.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-600">{update.excerpt}</p>
              </div>
            ))}

            {recentUpdates.length === 0 && (
              <div className="rounded-[1.6rem] border border-dashed border-slate-300 px-5 py-6 text-sm text-slate-500">
                No updates have been posted yet. Create the first one from the Updates section.
              </div>
            )}
          </div>
        </div>

        <div className="admin-card p-8">
          <span className="eyebrow">Quick actions</span>
          <div className="mt-6 space-y-3">
            <Link href="/admin/dogs" className="block rounded-[1.4rem] bg-white/80 px-5 py-4 text-sm font-bold text-slate-800">
              Add or edit dog profiles
            </Link>
            <Link href="/admin/updates" className="block rounded-[1.4rem] bg-white/80 px-5 py-4 text-sm font-bold text-slate-800">
              Publish rescue and shelter updates
            </Link>
            <Link href="/admin/forms" className="block rounded-[1.4rem] bg-white/80 px-5 py-4 text-sm font-bold text-slate-800">
              Review adoption and volunteer forms
            </Link>
            <Link href="/admin/settings" className="block rounded-[1.4rem] bg-white/80 px-5 py-4 text-sm font-bold text-slate-800">
              Update phone, WhatsApp, stats, and hero content
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
