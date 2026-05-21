export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Hotels</h1>
            <p className="text-sm text-slate-500">Manage partner hotels and view your negotiated corporate hotel list.</p>
          </div>
          <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Add hotel
          </button>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600">This page will show hotel partner details, corporate rates, and settlement links.</p>
      </div>
    </div>
  )
}
