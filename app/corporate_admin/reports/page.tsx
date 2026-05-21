export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Reports</h1>
            <p className="text-sm text-slate-500">Generate and export spend, VAT, and budget reports for your corporate program.</p>
          </div>
          <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Export report
          </button>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600">This page will include report templates, date-range filters, and download actions for CSV, XLSX, and PDF.</p>
      </div>
    </div>
  )
}
