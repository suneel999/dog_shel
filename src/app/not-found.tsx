import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent-600">404</p>
        <h1 className="mt-5 text-4xl font-black text-[#1a237e]">Page not found</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          The page you are looking for is not available right now. Try the homepage or the latest shelter updates instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">Go home</Link>
          <Link href="/updates" className="btn-secondary">View updates</Link>
        </div>
      </div>
    </div>
  );
}
