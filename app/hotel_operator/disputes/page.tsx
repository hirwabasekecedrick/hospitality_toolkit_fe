export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Disputes</h1>
        <p className="mt-2 text-sm text-slate-500">
          Track open disputes and manage resolution workflows for guest charges and vendor invoices.
        </p>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600">There are currently no active disputes to display.</p>
      </div>
    </div>
  )
}
