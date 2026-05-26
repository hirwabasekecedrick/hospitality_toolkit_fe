"use client"

import { useMemo, useState } from "react"
import { ArrowDownLeftIcon, ReceiptTextIcon, AlertCircleIcon } from "lucide-react"

const TRANSACTIONS = [
  {
    id: "TXN-9482",
    title: "Room charge",
    datetime: "Today, 2:45 PM",
    clientName: "John Doe",
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

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"amount_desc" | "amount_asc">("amount_desc")
  const [hotelId, setHotelId] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [password, setPassword] = useState("")
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [transactionsData, setTransactionsData] = useState(TRANSACTIONS)

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

  const handlePaymentSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!hotelId || !paymentAmount || !password) {
      return
    }

    const newTransaction = {
      id: `TXN-${Date.now()}`,
      title: `Hotel payment via QR ${hotelId}`,
      datetime: "Just now",
      clientName: "Hotel guest",
      clientOrg: `Hotel ${hotelId}`,
      amount: Number(paymentAmount),
      status: "Settled",
      statusVariant: "success",
      icon: "receipt",
    }

    setTransactionsData((current) => [newTransaction, ...current])
    setPaymentConfirmed(true)
    setHotelId("")
    setPaymentAmount("")
    setPassword("")
  }

  return (
    <div className="space-y-6">
      {paymentConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-6">
          <div className="w-full max-w-2xl rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Payment confirmed</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Hotel payment received</h2>
            <p className="mt-3 text-sm text-slate-500">The hotel operator has been notified and the transaction is now stored in the system.</p>
            <button
              className="mt-8 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              onClick={() => setPaymentConfirmed(false)}
            >
              Close notification
            </button>
          </div>
        </div>
      )}

      <div className="rounded-3xl bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Payments</h1>
            <p className="mt-2 text-sm text-slate-500">Use hotel QR / ID, amount and password to confirm corporate employee payments.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">Corporate employee payment workflow</div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Process Hotel Payment</h2>
            <p className="mt-1 text-sm text-slate-500">Capture hotel QR, enter the amount, and confirm with a password.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-600">Full-screen confirmation alert is shown on success.</div>
        </div>

        <form onSubmit={handlePaymentSubmit} className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Hotel QR / ID</label>
            <input
              value={hotelId}
              onChange={(e) => setHotelId(e.target.value)}
              placeholder="Scan hotel QR or enter ID"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Amount (RWF)</label>
            <input
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="200000"
              type="number"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
            />
          </div>
          <button className="sm:col-span-3 rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800">
            Confirm payment
          </button>
        </form>
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
  )
}
