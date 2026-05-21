export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">VAT reports</h1>
        <p className="mt-2 text-sm text-slate-500">
          Access your hotel VAT summaries and prepare documentation for tax filing.
        </p>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600">VAT report data will appear here once generated.</p>
      </div>
    </div>
  )
}
