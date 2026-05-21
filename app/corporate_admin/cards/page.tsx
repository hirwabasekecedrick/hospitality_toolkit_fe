export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Cards</h1>
            <p className="text-sm text-slate-500">Manage physical and virtual cards for your corporate team.</p>
          </div>
          <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Issue new card
          </button>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600">This page will show all corporate cards with status badges, spend limits, and quick actions for suspend, cancel, or update limits.</p>
      </div>
    </div>
  )
}
