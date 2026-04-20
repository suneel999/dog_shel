import { getSiteSettings } from '@/lib/cms/db';
import { saveSettingsAction } from '@/app/admin/actions';

interface AdminSettingsPageProps {
  searchParams?: {
    saved?: string;
    error?: string;
  };
}

export default function AdminSettingsPage({ searchParams }: AdminSettingsPageProps) {
  const settings = getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="admin-card p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="admin-badge">Settings</p>
            <h2 className="mt-4 text-4xl font-black text-[#13233d]">Website-wide contact and homepage content</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              This page controls the key public details people rely on most: rescue contact info, homepage messaging, shelter stats, and map location.
            </p>
          </div>
          <div className="admin-card max-w-sm p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Helpful note</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Emergency rescues and WhatsApp are currently using the same number. Keep both aligned unless the shelter decides to split them later.
            </p>
          </div>
        </div>
      </div>

      {searchParams?.saved === '1' ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Settings saved successfully.
        </div>
      ) : null}

      {searchParams?.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Please fill in the required contact fields before saving.
        </div>
      ) : null}

      <form action={saveSettingsAction} className="space-y-6">
        <div className="admin-card p-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Contact details</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="shelterName" className="mb-2 block text-sm font-semibold text-gray-700">
                Shelter name
              </label>
              <input id="shelterName" name="shelterName" defaultValue={settings.shelterName} className="input-field" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input id="email" name="email" type="email" required defaultValue={settings.email} className="input-field" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">
                Emergency phone
              </label>
              <input id="phone" name="phone" required defaultValue={settings.phone} className="input-field" />
            </div>
            <div>
              <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-gray-700">
                WhatsApp
              </label>
              <input id="whatsapp" name="whatsapp" required defaultValue={settings.whatsapp} className="input-field" />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="address" className="mb-2 block text-sm font-semibold text-gray-700">
              Address
            </label>
            <input id="address" name="address" defaultValue={settings.address} className="input-field" />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="mapLat" className="mb-2 block text-sm font-semibold text-gray-700">
                Map latitude
              </label>
              <input id="mapLat" name="mapLat" type="number" step="0.0001" defaultValue={settings.mapLat} className="input-field" />
            </div>
            <div>
              <label htmlFor="mapLng" className="mb-2 block text-sm font-semibold text-gray-700">
                Map longitude
              </label>
              <input id="mapLng" name="mapLng" type="number" step="0.0001" defaultValue={settings.mapLng} className="input-field" />
            </div>
          </div>
        </div>

        <div className="admin-card p-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Homepage content</p>
          <div className="mt-6 space-y-6">
            <div>
              <label htmlFor="heroTitle" className="mb-2 block text-sm font-semibold text-gray-700">
                Homepage headline
              </label>
              <input id="heroTitle" name="heroTitle" defaultValue={settings.heroTitle} className="input-field" />
            </div>

            <div>
              <label htmlFor="heroText" className="mb-2 block text-sm font-semibold text-gray-700">
                Homepage intro
              </label>
              <textarea id="heroText" name="heroText" rows={4} defaultValue={settings.heroText} className="input-field" />
            </div>

            <div>
              <label htmlFor="missionText" className="mb-2 block text-sm font-semibold text-gray-700">
                Mission text
              </label>
              <textarea id="missionText" name="missionText" rows={4} defaultValue={settings.missionText} className="input-field" />
            </div>
          </div>
        </div>

        <div className="admin-card p-8">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-500">Impact stats</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label htmlFor="dogsRescued" className="mb-2 block text-sm font-semibold text-gray-700">
                Animals rescued
              </label>
              <input id="dogsRescued" name="dogsRescued" type="number" defaultValue={settings.dogsRescued} className="input-field" />
            </div>
            <div>
              <label htmlFor="dogsTreated" className="mb-2 block text-sm font-semibold text-gray-700">
                Animals treated
              </label>
              <input id="dogsTreated" name="dogsTreated" type="number" defaultValue={settings.dogsTreated} className="input-field" />
            </div>
            <div>
              <label htmlFor="dogsAdopted" className="mb-2 block text-sm font-semibold text-gray-700">
                Animals adopted
              </label>
              <input id="dogsAdopted" name="dogsAdopted" type="number" defaultValue={settings.dogsAdopted} className="input-field" />
            </div>
            <div>
              <label htmlFor="activeCases" className="mb-2 block text-sm font-semibold text-gray-700">
                Active cases
              </label>
              <input id="activeCases" name="activeCases" type="number" defaultValue={settings.activeCases} className="input-field" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Saving here updates the public website immediately on the next request.
          </p>
          <button type="submit" className="btn-primary">
            Save settings
          </button>
        </div>
      </form>
    </div>
  );
}
