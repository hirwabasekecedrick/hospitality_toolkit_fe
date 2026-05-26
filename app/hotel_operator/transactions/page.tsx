"use client"

import { useMemo, useState } from "react"
import { ArrowDownLeftIcon, ReceiptTextIcon, AlertCircleIcon, SearchIcon } from "lucide-react"

const TRANSACTIONS = [
  {
    id: "TXN-9482",
    title: "Room charge",
    datetime: "Today, 2:45 PM",
    clientName: "John Doe",
    client_id: "CLT-09AX",
    clientOrg: "BK Group",
    amount: 185000,
    status: "Settled",
    statusVariant: "success",
    icon: "receipt",
  },
  {
    id: "TXN-9481",
    title: "Food & Beverage",
    datetime: "Today, 1:15 PM",
    clientName: "Alice Smith",
    client_id: "CLT-HA2500",
    clientOrg: "MTN Rwanda",
    amount: 42500,
    status: "Settled",
    statusVariant: "success",
    icon: "receipt",
  },
  {
    id: "TXN-9480",
    title: "Boardroom Booking",
    datetime: "Yesterday, 4:30 PM",
    clientName: "Corporate Team",
    client_id: "CLT-0OP1",
    clientOrg: "RwandAir",
    amount: 280000,
    status: "Pending",
    statusVariant: "neutral",
    icon: "arrow",
  },
  {
    id: "TXN-9479",
    title: "Spa Services",
    datetime: "Yesterday, 11:20 AM",
    clientName: "Sarah Jones",
    client_id: "CLT-P0DAX1",
    clientOrg: "Bralirwa",
    amount: 85000,
    status: "Disputed",
    statusVariant: "warning",
    icon: "alert",
  },
]

function formatAmount(amount: number) {
  return `RWF ${amount.toLocaleString()}`
}

function getStatusStyles(statusVariant: string) {
  switch (statusVariant) {
    case "success":
      return "inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200"
    case "warning":
      return "inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700 border border-orange-200"
    default:
      return "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200"
  }
}

export function TransactionsOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"amount_desc" | "amount_asc">("amount_desc")
  const [transactionsData] = useState(TRANSACTIONS)

  const filteredTransactions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return transactionsData
      .filter((txn) => {
        if (!query) return true

        return (
          txn.id.toLowerCase().includes(query) ||
          txn.title.toLowerCase().includes(query) ||
          txn.clientName.toLowerCase().includes(query) ||
          txn.clientOrg.toLowerCase().includes(query) ||
          formatAmount(txn.amount).toLowerCase().includes(query)
        )
      })
      .sort((a, b) => {
        if (sortOrder === "amount_asc") {
          return a.amount - b.amount
        }
        return b.amount - a.amount
      })
  }, [searchTerm, sortOrder, transactionsData])

  const recentClients = useMemo(() => {
    const map = new Map<string, { clientOrg: string; clientName: string }>()
    transactionsData.forEach((txn) => {
      if (!map.has(txn.clientOrg)) {
        map.set(txn.clientOrg, { clientOrg: txn.clientOrg, clientName: txn.clientName })
      }
    })
    return Array.from(map.values()).slice(0, 5)
  }, [transactionsData])

  return (
    <div className="space-y-6 px-0">
      <div className="rounded-3xl bg-white p-6">
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Recent transactions</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by client, reference, or amount"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "amount_desc" | "amount_asc")}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
              >
                <option value="amount_desc">Highest first</option>
                <option value="amount_asc">Lowest first</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Transaction details</th>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${txn.icon === "alert" ? "bg-orange-100 text-orange-700" : txn.icon === "arrow" ? "bg-slate-100 text-slate-700" : "bg-emerald-100 text-emerald-700"}`}>
                          {txn.icon === "receipt" ? (
                            <ReceiptTextIcon className="h-5 w-5" />
                          ) : txn.icon === "arrow" ? (
                            <ArrowDownLeftIcon className="h-5 w-5" />
                          ) : (
                            <AlertCircleIcon className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{txn.title}</p>
                          <p className="text-xs text-slate-500">{txn.datetime} • {txn.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{txn.client_id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{txn.clientName}</p>
                      <p className="text-xs text-slate-500">{txn.clientOrg}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{formatAmount(txn.amount)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={getStatusStyles(txn.statusVariant)}>{txn.status}</span>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-500">
                      No transactions found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return <TransactionsOverview />
}
