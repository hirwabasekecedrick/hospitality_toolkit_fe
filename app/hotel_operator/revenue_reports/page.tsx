export default function Page() {
  return (
    <div className="space-y-6  px-0">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Revenue Reports</h1>
            <p className="mt-2 text-sm text-slate-500">Analyze revenue streams by category, date, and client.</p>
          </div>
          <button className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 w-full sm:w-auto">
            Export Analytics
          </button>
        </div>
        <div className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
             <p className="text-sm font-medium text-slate-500">Revenue dashboards and charts will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
