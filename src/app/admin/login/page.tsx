import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated, isUsingDefaultAdminPassword } from '@/lib/cms/auth';
import { loginAction } from '@/app/admin/actions';

export const metadata: Metadata = {
  title: 'Admin Login',
};

interface AdminLoginPageProps {
  searchParams?: {
    error?: string;
  };
}

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  if (isAdminAuthenticated()) {
    redirect('/admin');
  }

  const showError = searchParams?.error === 'invalid-password';

  return (
    <div className="admin-shell flex min-h-screen items-center justify-center px-4 py-16">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_480px]">
        <div className="surface-dark p-8 md:p-10">
          <span className="eyebrow !bg-white/10 !text-white !shadow-none">Shelter dashboard</span>
          <h1 className="mt-5 text-5xl font-black text-white">A cleaner back office for rescue, updates, and public enquiries.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-200 md:text-base">
            This admin area is designed so the shelter team can update dog profiles, add donor and visitor posts,
            publish new rescue stories, and review adoption or volunteer forms in one place.
          </p>
        </div>

        <div className="surface-panel p-8 md:p-10">
          <span className="eyebrow">Admin Access</span>
          <h2 className="mt-5 text-3xl font-black text-[#13233d]">Sign in to the shelter CMS</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Use the admin password from `.env.local` to enter the dashboard.
          </p>

          {showError && (
            <div className="mt-6 rounded-[1.4rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              The admin password was incorrect. Please try again.
            </div>
          )}

          {isUsingDefaultAdminPassword() && (
            <div className="mt-6 rounded-[1.4rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              `ADMIN_PASSWORD` is still using the placeholder value. Change it before going live.
            </div>
          )}

          <form action={loginAction} className="mt-8 space-y-5">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-slate-600">
                Admin password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field"
                placeholder="Enter admin password"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Enter dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
