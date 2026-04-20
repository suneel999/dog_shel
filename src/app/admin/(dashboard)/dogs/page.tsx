import { getAdminDogs } from '@/lib/cms/db';
import { deleteDogAction, saveDogAction } from '@/app/admin/actions';

interface AdminDogsPageProps {
  searchParams?: {
    saved?: string;
    deleted?: string;
    error?: string;
  };
}

function StatusCheckbox({
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

export default function AdminDogsPage({ searchParams }: AdminDogsPageProps) {
  const dogs = getAdminDogs();

  return (
    <div className="space-y-8">
      <section className="admin-card p-8">
        <span className="eyebrow">Dogs</span>
        <h2 className="mt-4 text-4xl font-black text-[#13233d]">Add or update rescue profiles</h2>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600">
          This page is designed for frequent content updates: new rescues, changed status, new before/after photos, and adoption visibility.
        </p>

        {(searchParams?.saved === '1' || searchParams?.deleted === '1') && (
          <div className="mt-6 rounded-[1.4rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Dog profile updated successfully.
          </div>
        )}

        {searchParams?.error && (
          <div className="mt-6 rounded-[1.4rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            A dog name is required before saving.
          </div>
        )}

        <form action={saveDogAction} encType="multipart/form-data" className="mt-8 space-y-6">
          <div className="rounded-[1.75rem] bg-white/70 p-6">
            <h3 className="text-2xl font-black text-[#13233d]">Create new dog profile</h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Public ID</label>
                <input name="publicId" className="input-field" placeholder="Leave blank for auto" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Name</label>
                <input name="name" required className="input-field" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Age</label>
                <input name="age" className="input-field" placeholder="2 years" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Gender</label>
                <select name="gender" className="input-field" defaultValue="Male">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Status</label>
              <select name="status" className="input-field" defaultValue="Under Treatment">
                <option value="Under Treatment">Under Treatment</option>
                <option value="Injured">Injured</option>
                <option value="Recovered">Recovered</option>
              </select>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Main image URL</label>
                <input name="image" className="input-field" placeholder="/uploads/example.jpg" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Before image URL</label>
                <input name="beforeImage" className="input-field" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">After image URL</label>
                <input name="afterImage" className="input-field" />
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Upload main image</label>
                <input name="imageUpload" type="file" accept="image/*" className="input-field" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Upload before image</label>
                <input name="beforeImageUpload" type="file" accept="image/*" className="input-field" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Upload after image</label>
                <input name="afterImageUpload" type="file" accept="image/*" className="input-field" />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Short description</label>
              <textarea name="shortDescription" rows={2} className="input-field" />
            </div>
            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Full description</label>
              <textarea name="fullDescription" rows={4} className="input-field" />
            </div>
            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Rescue story</label>
              <textarea name="rescueStory" rows={4} className="input-field" />
            </div>
            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Health status</label>
              <textarea name="healthStatus" rows={3} className="input-field" />
            </div>
            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Special needs</label>
              <textarea name="specialNeeds" rows={2} className="input-field" />
            </div>

            <div className="mt-6 flex flex-wrap gap-5">
              <StatusCheckbox name="adoptionEligible" label="Available for adoption" defaultChecked />
              <StatusCheckbox name="featured" label="Show on homepage" defaultChecked />
              <StatusCheckbox name="published" label="Visible on website" defaultChecked />
            </div>

            <button type="submit" className="btn-primary mt-8">
              Save dog profile
            </button>
          </div>
        </form>
      </section>

      <section className="admin-card p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Existing profiles</span>
            <h3 className="mt-4 text-3xl font-black text-[#13233d]">Current dog records</h3>
          </div>
          <p className="text-sm text-slate-500">{dogs.length} profile(s)</p>
        </div>

        <div className="mt-6 space-y-4">
          {dogs.map((dog) => (
            <details key={dog.id} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-5">
              <summary className="cursor-pointer list-none">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h4 className="text-2xl font-black text-[#13233d]">{dog.name}</h4>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                      ID {dog.publicId} · {dog.status} · {dog.adoptionEligible ? 'Adoptable' : 'Recovery only'}
                    </p>
                  </div>
                  <span className="btn-outline !px-4 !py-2">Edit profile</span>
                </div>
              </summary>

              <form action={saveDogAction} encType="multipart/form-data" className="mt-6 space-y-6">
                <input type="hidden" name="id" value={dog.id} />

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Public ID</label>
                    <input name="publicId" defaultValue={dog.publicId} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Name</label>
                    <input name="name" defaultValue={dog.name} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Age</label>
                    <input name="age" defaultValue={dog.age} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Gender</label>
                    <select name="gender" defaultValue={dog.gender} className="input-field">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Status</label>
                  <select name="status" defaultValue={dog.status} className="input-field">
                    <option value="Under Treatment">Under Treatment</option>
                    <option value="Injured">Injured</option>
                    <option value="Recovered">Recovered</option>
                  </select>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Main image URL</label>
                    <input name="image" defaultValue={dog.image} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Before image URL</label>
                    <input name="beforeImage" defaultValue={dog.beforeImage} className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">After image URL</label>
                    <input name="afterImage" defaultValue={dog.afterImage} className="input-field" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Upload new main image</label>
                    <input name="imageUpload" type="file" accept="image/*" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Upload new before image</label>
                    <input name="beforeImageUpload" type="file" accept="image/*" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-slate-600">Upload new after image</label>
                    <input name="afterImageUpload" type="file" accept="image/*" className="input-field" />
                  </div>
                </div>

                <textarea name="shortDescription" rows={2} defaultValue={dog.shortDescription} className="input-field" />
                <textarea name="fullDescription" rows={4} defaultValue={dog.fullDescription} className="input-field" />
                <textarea name="rescueStory" rows={4} defaultValue={dog.rescueStory} className="input-field" />
                <textarea name="healthStatus" rows={3} defaultValue={dog.healthStatus} className="input-field" />
                <textarea name="specialNeeds" rows={2} defaultValue={dog.specialNeeds} className="input-field" />

                <div className="flex flex-wrap gap-5">
                  <StatusCheckbox name="adoptionEligible" label="Available for adoption" defaultChecked={dog.adoptionEligible} />
                  <StatusCheckbox name="featured" label="Show on homepage" defaultChecked={dog.featured} />
                  <StatusCheckbox name="published" label="Visible on website" defaultChecked={dog.published} />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button type="submit" className="btn-primary">
                    Save changes
                  </button>
                </div>
              </form>

              <form action={deleteDogAction} className="mt-4">
                <input type="hidden" name="id" value={dog.id} />
                <button type="submit" className="text-sm font-bold uppercase tracking-[0.16em] text-red-600">
                  Delete this profile
                </button>
              </form>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
