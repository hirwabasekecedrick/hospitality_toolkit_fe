export default function Page() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
        <p className="mt-2 text-sm text-slate-500">
          Review all hotel transactions, including card charges, refunds, and payment activity.
        </p>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600">Transaction records will appear here once loaded.</p>
      </div>
    </div>
  )
}
