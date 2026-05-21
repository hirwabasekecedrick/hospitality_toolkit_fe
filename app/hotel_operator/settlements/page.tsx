export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Settlements</h1>
        <p className="mt-2 text-sm text-slate-500">
          All hotel settlements are managed here. You can review settlement status, payment details, and reconciliation notes.
        </p>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600">No settlement actions available yet.</p>
      </div>
    </div>
  )
}
