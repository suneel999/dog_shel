import { getAdoptionRequests, getVolunteerRequests } from '@/lib/cms/db';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function AdminFormsPage() {
  const adoptionRequests = getAdoptionRequests();
  const volunteerRequests = getVolunteerRequests();

  return (
    <div className="space-y-8">
      <section className="admin-card p-8">
        <span className="eyebrow">Forms</span>
        <h2 className="mt-4 text-4xl font-black text-[#13233d]">Incoming public enquiries</h2>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600">
          These submissions are now stored in the app instead of disappearing in alerts or console logs.
        </p>
      </section>

      <section className="admin-card p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Adoption</span>
            <h3 className="mt-4 text-3xl font-black text-[#13233d]">Adoption enquiries</h3>
          </div>
          <p className="text-sm text-slate-500">{adoptionRequests.length} enquiry(s)</p>
        </div>

        <div className="mt-6 space-y-4">
          {adoptionRequests.map((request) => (
            <div key={request.id} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h4 className="text-2xl font-black text-[#13233d]">{request.name}</h4>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {request.phone} · {request.email}
                  </p>
                </div>
                <span className="text-sm font-semibold text-slate-500">{formatDate(request.createdAt)}</span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <p className="text-sm leading-7 text-slate-700"><strong>Address:</strong> {request.address}</p>
                <p className="text-sm leading-7 text-slate-700"><strong>Experience:</strong> {request.experience}</p>
                <p className="text-sm leading-7 text-slate-700"><strong>Time available:</strong> {request.timeAvailability}</p>
                <p className="text-sm leading-7 text-slate-700"><strong>Household size:</strong> {request.householdSize}</p>
                <p className="text-sm leading-7 text-slate-700"><strong>Preferred dog:</strong> {request.preferredDog || 'No preference given'}</p>
                <p className="text-sm leading-7 text-slate-700"><strong>Previous dogs:</strong> {request.previousDogs || 'No details shared'}</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700"><strong>Why they want to adopt:</strong> {request.message}</p>
            </div>
          ))}

          {adoptionRequests.length === 0 && (
            <div className="rounded-[1.6rem] border border-dashed border-slate-300 px-5 py-6 text-sm text-slate-500">
              No adoption enquiries yet.
            </div>
          )}
        </div>
      </section>

      <section className="admin-card p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Volunteer</span>
            <h3 className="mt-4 text-3xl font-black text-[#13233d]">Volunteer applications</h3>
          </div>
          <p className="text-sm text-slate-500">{volunteerRequests.length} application(s)</p>
        </div>

        <div className="mt-6 space-y-4">
          {volunteerRequests.map((request) => (
            <div key={request.id} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h4 className="text-2xl font-black text-[#13233d]">{request.name}</h4>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {request.phone} · {request.email}
                  </p>
                </div>
                <span className="text-sm font-semibold text-slate-500">{formatDate(request.createdAt)}</span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <p className="text-sm leading-7 text-slate-700"><strong>City/Area:</strong> {request.city}</p>
                <p className="text-sm leading-7 text-slate-700"><strong>Availability:</strong> {request.availability}</p>
                <p className="text-sm leading-7 text-slate-700 md:col-span-2"><strong>Interests:</strong> {request.interests.join(', ')}</p>
                <p className="text-sm leading-7 text-slate-700 md:col-span-2"><strong>Experience:</strong> {request.experience || 'No prior experience shared'}</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700"><strong>Why they want to volunteer:</strong> {request.message}</p>
            </div>
          ))}

          {volunteerRequests.length === 0 && (
            <div className="rounded-[1.6rem] border border-dashed border-slate-300 px-5 py-6 text-sm text-slate-500">
              No volunteer applications yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
