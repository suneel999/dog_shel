import { getAdminUpdates } from '@/lib/cms/db';
import { deleteUpdateAction, saveUpdateAction } from '@/app/admin/actions';

interface AdminUpdatesPageProps {
  searchParams?: {
    saved?: string;
    deleted?: string;
    error?: string;
  };
}

function UpdateFlag({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-gray-300 text-accent-600"
      />
      <span>{label}</span>
    </label>
  );
}

function dateTimeLocalValue(value: string) {
  return value ? new Date(value).toISOString().slice(0, 16) : '';
}

export default function AdminUpdatesPage({ searchParams }: AdminUpdatesPageProps) {
  const updates = getAdminUpdates();

  return (
    <div className="space-y-8">
      <section className="admin-card p-8">
        <span className="eyebrow">Updates</span>
        <h2 className="mt-4 text-4xl font-black text-[#13233d]">Publish rescue stories, donor notes, and visitor updates</h2>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600">
          This area is meant for frequent publishing so the public sees an active shelter, not a stale website.
        </p>

        {(searchParams?.saved === '1' || searchParams?.deleted === '1') && (
          <div className="mt-6 rounded-[1.4rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Update saved successfully.
          </div>
        )}

        {searchParams?.error && (
          <div className="mt-6 rounded-[1.4rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            An update title is required before saving.
          </div>
        )}

        <form action={saveUpdateAction} encType="multipart/form-data" className="mt-8 rounded-[1.75rem] bg-white/70 p-6">
          <h3 className="text-2xl font-black text-[#13233d]">Create new update</h3>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Title</label>
              <input name="title" required className="input-field" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Custom slug</label>
              <input name="slug" className="input-field" placeholder="Optional" />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Excerpt</label>
            <textarea name="excerpt" rows={2} className="input-field" />
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Full update</label>
            <textarea name="body" rows={6} className="input-field" />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Category</label>
              <select name="category" defaultValue="shelter-update" className="input-field">
                <option value="rescue">Rescue</option>
                <option value="shelter-update">Shelter update</option>
                <option value="donor">Donor</option>
                <option value="visitor">Visitor</option>
                <option value="announcement">Announcement</option>
                <option value="transformation">Transformation</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Occurred at</label>
              <input
                name="occurredAt"
                type="datetime-local"
                defaultValue={dateTimeLocalValue(new Date().toISOString())}
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Image URL</label>
              <input name="image" className="input-field" />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Upload image</label>
            <input name="imageUpload" type="file" accept="image/*" className="input-field" />
          </div>

          <div className="mt-6 flex flex-wrap gap-5">
            <UpdateFlag name="featured" label="Feature on homepage" defaultChecked />
            <UpdateFlag name="published" label="Visible on website" defaultChecked />
          </div>

          <button type="submit" className="btn-primary mt-8">
            Publish update
          </button>
        </form>
      </section>

      <section className="admin-card p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Existing posts</span>
            <h3 className="mt-4 text-3xl font-black text-[#13233d]">Current updates</h3>
          </div>
          <p className="text-sm text-slate-500">{updates.length} update(s)</p>
        </div>

        <div className="mt-6 space-y-4">
          {updates.map((update) => (
            <details key={update.id} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-5">
              <summary className="cursor-pointer list-none">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h4 className="text-2xl font-black text-[#13233d]">{update.title}</h4>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {update.category} · {update.published ? 'Published' : 'Draft'}
                    </p>
                  </div>
                  <span className="btn-outline !px-4 !py-2">Edit update</span>
                </div>
              </summary>

              <form action={saveUpdateAction} encType="multipart/form-data" className="mt-6 space-y-6">
                <input type="hidden" name="id" value={update.id} />

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Title</label>
                    <input name="title" defaultValue={update.title} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Slug</label>
                    <input name="slug" defaultValue={update.slug} className="input-field" />
                  </div>
                </div>

                <textarea name="excerpt" rows={2} defaultValue={update.excerpt} className="input-field" />
                <textarea name="body" rows={6} defaultValue={update.body} className="input-field" />

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Category</label>
                    <select name="category" defaultValue={update.category} className="input-field">
                      <option value="rescue">Rescue</option>
                      <option value="shelter-update">Shelter update</option>
                      <option value="donor">Donor</option>
                      <option value="visitor">Visitor</option>
                      <option value="announcement">Announcement</option>
                      <option value="transformation">Transformation</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Occurred at</label>
                    <input name="occurredAt" type="datetime-local" defaultValue={dateTimeLocalValue(update.occurredAt)} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Image URL</label>
                    <input name="image" defaultValue={update.image} className="input-field" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Upload replacement image</label>
                  <input name="imageUpload" type="file" accept="image/*" className="input-field" />
                </div>

                <div className="flex flex-wrap gap-5">
                  <UpdateFlag name="featured" label="Feature on homepage" defaultChecked={update.featured} />
                  <UpdateFlag name="published" label="Visible on website" defaultChecked={update.published} />
                </div>

                <button type="submit" className="btn-primary">
                  Save changes
                </button>
              </form>

              <form action={deleteUpdateAction} className="mt-4">
                <input type="hidden" name="id" value={update.id} />
                <button type="submit" className="text-sm font-bold uppercase tracking-[0.16em] text-red-600">
                  Delete this update
                </button>
              </form>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
