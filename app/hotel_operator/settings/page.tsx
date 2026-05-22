export default function Page() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-0">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Settings</h1>
            <p className="mt-2 text-sm text-slate-500">Configure property details, bank accounts, and user access.</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
             <p className="text-sm font-medium text-slate-500">Property and integration settings will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
