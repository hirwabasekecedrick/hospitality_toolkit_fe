"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ArrowRightLeftIcon,
  CheckCircle2Icon,
  Loader2Icon,
  ReceiptTextIcon,
  SearchIcon,
} from "lucide-react"
import {
  getProviderTransactions,
  redeemBatch,
  type CorporateEmployeeTransaction,
} from "@/lib/corporateEmployeeTransactions"
import { getRedeemList, type RedeemSummary } from "@/lib/redeems"

function formatAmount(amount: number) {
  return `RWF ${amount.toLocaleString()}`
}

export default function Page() {
  // Confirmed transactions (ready to redeem)
  const [confirmedTxns, setConfirmedTxns] = useState<CorporateEmployeeTransaction[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [redeeming, setRedeeming] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Past redeems
  const [redeems, setRedeems] = useState<RedeemSummary[]>([])
  const [redeemsLoading, setRedeemsLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    try {
      const txns = await getProviderTransactions("CONFIRMED")
      setConfirmedTxns(txns)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const loadRedeems = async () => {
    setRedeemsLoading(true)
    try {
      const data = await getRedeemList()
      setRedeems(data)
    } catch {
    } finally {
      setRedeemsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    loadRedeems()
  }, [])

  const filteredTxns = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return confirmedTxns
    return confirmedTxns.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.employeeName.toLowerCase().includes(q) ||
        t.reference.toLowerCase().includes(q) ||
        formatAmount(t.amount).toLowerCase().includes(q),
    )
  }, [searchTerm, confirmedTxns])

  const totalConfirmed = confirmedTxns.reduce((s, t) => s + t.amount, 0)
  const totalSelected = confirmedTxns
    .filter((t) => selectedIds.has(t.id))
    .reduce((s, t) => s + t.amount, 0)

  const allSelected =
    filteredTxns.length > 0 && filteredTxns.every((t) => selectedIds.has(t.id))

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredTxns.map((t) => t.id)))
    }
  }

  const handleRedeem = async () => {
    const ids = Array.from(selectedIds)
    if (ids.length === 0) return
    setRedeeming(true)
    setErrorMessage("")
    setSuccessMessage("")
    try {
      await redeemBatch(ids)
      setSuccessMessage(
        `Successfully redeemed ${ids.length} transaction(s) totaling ${formatAmount(totalSelected)}.`,
      )
      setSelectedIds(new Set())
      // Reload both lists
      await Promise.all([loadData(), loadRedeems()])
    } catch (err: any) {
      setErrorMessage(
        err?.body?.message || err?.message || "Redeem failed. Please try again.",
      )
    } finally {
      setRedeeming(false)
    }
  }

  return (
    <div className="space-y-6 px-0">
      <div className="rounded-3xl bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
              Settlements &amp; Redeems
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Redeem confirmed payments to settle them with your hotel.
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-emerald-50/50 p-5">
            <p className="text-sm font-semibold text-slate-600">
              Confirmed &amp; ready to redeem
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {formatAmount(totalConfirmed)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {confirmedTxns.length} transaction(s)
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
            <p className="text-sm font-semibold text-slate-600">Selected</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {formatAmount(totalSelected)}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {selectedIds.size} transaction(s)
            </p>
          </div>
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-5">
            <button
              type="button"
              onClick={handleRedeem}
              disabled={selectedIds.size === 0 || redeeming}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {redeeming ? (
                <>
                  <Loader2Icon className="h-4 w-4 animate-spin" /> Redeeming...
                </>
              ) : (
                <>
                  <ArrowRightLeftIcon className="h-4 w-4" /> Redeem Selected (
                  {selectedIds.size})
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success / Error messages */}
        {successMessage && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2Icon className="h-5 w-5 shrink-0" />
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {errorMessage}
          </div>
        )}

        {/* Search */}
        <div className="mt-6">
          <div className="relative max-w-sm">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search confirmed transactions..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 outline-none"
            />
          </div>
        </div>

        {/* Confirmed transactions table */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {loading ? (
            <div className="flex items-center justify-center px-6 py-12">
              <Loader2Icon className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : filteredTxns.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              {confirmedTxns.length === 0
                ? "No confirmed payments to redeem right now."
                : "No transactions match your search."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleAll}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                      />
                    </th>
                    <th className="px-4 py-4 font-semibold">Transaction</th>
                    <th className="px-4 py-4 font-semibold">Employee</th>
                    <th className="px-4 py-4 font-semibold">Reference</th>
                    <th className="px-4 py-4 font-semibold text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTxns.map((txn) => (
                    <tr
                      key={txn.id}
                      className={`transition-colors ${selectedIds.has(txn.id) ? "bg-emerald-50/40" : "hover:bg-slate-50/50"}`}
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(txn.id)}
                          onChange={() => toggleOne(txn.id)}
                          className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <ReceiptTextIcon className="h-4 w-4" />
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
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-900">
                          {txn.employeeName}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-mono text-xs text-slate-500">
                          {txn.reference}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-slate-900">
                        {formatAmount(txn.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Past redeems history */}
      <div className="rounded-3xl bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-950">Redeem History</h2>
        <p className="mt-1 text-sm text-slate-500">
          Previously redeemed batches and their status.
        </p>
        <div className="mt-6">
          {redeemsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2Icon className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : redeems.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">
              No redeems yet.
            </p>
          ) : (
            <div className="space-y-3">
              {redeems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <ArrowRightLeftIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">
                        {item.transactionCount} transaction(s) &bull;{" "}
                        {item.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-slate-900">
                      {formatAmount(item.amount)}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "Failed"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function SettlementsOverview() {
  return (
    <section>
      <p className="text-sm text-slate-500 mt-2">Go to the settlements page to view and manage your past redeems.</p>
    </section>
  )
}
