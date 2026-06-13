"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ArrowDownLeftIcon,
  ReceiptTextIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  SearchIcon,
} from "lucide-react"
import {
  getProviderTransactions,
  redeemBatch,
  type CorporateEmployeeTransaction,
} from "@/lib/corporateEmployeeTransactions"
import { toast } from "sonner"

function formatAmount(amount: number) {
  return `RWF ${amount.toLocaleString()}`
}

const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Settled", value: "SETTLED" },
  { label: "Pending", value: "PENDING" },
  { label: "Failed", value: "FAILED" },
]

function getStatusStyles(status: string) {
  switch (status.toUpperCase()) {
    case "CONFIRMED":
      return "inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200"
    case "SETTLED":
      return "inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 border border-sky-200"
    case "PENDING":
      return "inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200"
    case "FAILED":
      return "inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200"
    case "DISPUTED":
      return "inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700 border border-orange-200"
    default:
      return "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 border border-slate-200"
  }
}

function getStatusIcon(status: string) {
  switch (status.toUpperCase()) {
    case "CONFIRMED":
      return <CheckCircle2Icon className="h-5 w-5" />
    case "SETTLED":
      return <ReceiptTextIcon className="h-5 w-5" />
    case "PENDING":
      return <ArrowDownLeftIcon className="h-5 w-5" />
    default:
      return <AlertCircleIcon className="h-5 w-5" />
  }
}

function getIconBg(status: string) {
  switch (status.toUpperCase()) {
    case "CONFIRMED":
      return "bg-emerald-100 text-emerald-700"
    case "SETTLED":
      return "bg-sky-100 text-sky-700"
    case "PENDING":
      return "bg-amber-100 text-amber-700"
    case "FAILED":
      return "bg-rose-100 text-rose-700"
    default:
      return "bg-slate-100 text-slate-700"
  }
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("")
  const [transactions, setTransactions] = useState<CorporateEmployeeTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [redeeming, setRedeeming] = useState(false)

  const fetchTransactions = () => {
    setLoading(true)
    getProviderTransactions(activeTab || undefined)
      .then((res) => {
        setTransactions(res)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTransactions()
  }, [activeTab])

  const handleRedeem = async () => {
    const confirmedIds = transactions
      .filter((t) => t.status.toUpperCase() === "CONFIRMED")
      .map((t) => t.id)
    if (confirmedIds.length === 0) return
    
    setRedeeming(true)
    try {
      await redeemBatch(confirmedIds)
      toast.success("Successfully redeemed confirmed payments!")
      fetchTransactions()
    } catch (error) {
      toast.error("Failed to redeem payments")
    } finally {
      setRedeeming(false)
    }
  }

  const filteredTransactions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return transactions
    return transactions.filter(
      (txn) =>
        txn.title.toLowerCase().includes(query) ||
        txn.employeeName.toLowerCase().includes(query) ||
        txn.reference.toLowerCase().includes(query) ||
        formatAmount(txn.amount).toLowerCase().includes(query),
    )
  }, [searchTerm, transactions])

  return (
    <div className="space-y-6 px-0">
      <div className="rounded-3xl bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          All payments received at your hotel.
        </p>

        {/* Status filter tabs */}
        <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.value
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "CONFIRMED" && filteredTransactions.length > 0 && (
            <button
              onClick={handleRedeem}
              disabled={redeeming}
              className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 transition-colors"
            >
              {redeeming ? "Redeeming..." : "Redeem All Confirmed"}
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by employee, reference, or amount"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {loading ? (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              Loading...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">
                      Transaction details
                    </th>
                    <th className="px-6 py-4 font-semibold">Employee</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((txn) => (
                    <tr
                      key={txn.id}
                      className="transition-colors hover:bg-slate-50/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${getIconBg(txn.status)}`}
                          >
                            {getStatusIcon(txn.status)}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {txn.title}
                            </p>
                            <p className="text-xs text-slate-500">
                              {txn.datetime}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {txn.employeeName}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {formatAmount(txn.amount)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={getStatusStyles(txn.status)}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center text-sm text-slate-500"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function TransactionsOverview() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
        <a href="/hotel_operator/transactions" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
          View all
        </a>
      </div>
      <p className="text-sm text-slate-500">Go to the transactions page to view your received payments and redeem them.</p>
    </section>
  )
}
