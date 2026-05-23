import { ArrowDownLeftIcon, ReceiptTextIcon, AlertCircleIcon, SearchIcon, FilterIcon } from "lucide-react"

export function TransactionsOverview() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500/20 w-full sm:w-auto">
          <SearchIcon className="h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Name or amount..." 
            className="bg-transparent text-sm outline-none placeholder:text-slate-400 w-full"
          />
        </div>
        <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 w-full sm:w-auto justify-center">
          <FilterIcon className="h-4 w-4" /> Filter
        </button>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaction details</th>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <ReceiptTextIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Room charge</p>
                      <p className="text-xs text-slate-500">Today, 2:45 PM • TXN-9482</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">John Doe</p>
                  <p className="text-xs text-slate-500">BK Group</p>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">RWF 185,000</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                    Settled
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <ReceiptTextIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Food & Beverage</p>
                      <p className="text-xs text-slate-500">Today, 1:15 PM • TXN-9481</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">Alice Smith</p>
                  <p className="text-xs text-slate-500">MTN Rwanda</p>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">RWF 42,500</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                    Settled
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                      <ArrowDownLeftIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Boardroom Booking</p>
                      <p className="text-xs text-slate-500">Yesterday, 4:30 PM • TXN-9480</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">Corporate Team</p>
                  <p className="text-xs text-slate-500">RwandAir</p>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">RWF 280,000</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200">
                    Pending
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                      <AlertCircleIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Spa Services</p>
                      <p className="text-xs text-slate-500">Yesterday, 11:20 AM • TXN-9479</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">Sarah Jones</p>
                  <p className="text-xs text-slate-500">Bralirwa</p>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">RWF 85,000</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700 border border-orange-200">
                    Disputed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="space-y-6  px-0">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Transactions</h1>
        </div>
        <div className="mt-6">
          <TransactionsOverview />
        </div>
      </div>
    </div>
  )
}
