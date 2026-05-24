"use client"

import { useMemo, useState } from "react"

const MOCK_CLIENTS = [
  {
    id: "CLT-1001",
    name: "James Murekezi",
    company: "BK Group",
    region: "Kigali",
    lastBooking: "2026-05-20",
    totalSpend: 1365000,
    rate: "Corporate Platinum",
    status: "Active",
  },
  {
    id: "CLT-1002",
    name: "Eunice Uwizeyimana",
    company: "RwandAir",
    region: "Kigali",
    lastBooking: "2026-05-12",
    totalSpend: 415200,
    rate: "Corporate Gold",
    status: "Active",
  },
  {
    id: "CLT-1003",
    name: "Daniel Habimana",
    company: "MTN Rwanda",
    region: "Rubavu",
    lastBooking: "2026-04-28",
    totalSpend: 278000,
    rate: "Corporate Silver",
    status: "Paused",
  },
  {
    id: "CLT-1004",
    name: "Amina Nshimiyimana",
    company: "Bralirwa",
    region: "Huye",
    lastBooking: "2026-05-22",
    totalSpend: 915000,
    rate: "Corporate Platinum",
    status: "Active",
  },
  {
    id: "CLT-1005",
    name: "Pauline Uwimana",
    company: "Cogebank",
    region: "Musanze",
    lastBooking: "2026-03-30",
    totalSpend: 124000,
    rate: "Corporate Bronze",
    status: "Expired",
  },
  {
    id: "CLT-1006",
    name: "Eric Niyomugabo",
    company: "Airtel Rwanda",
    region: "Kigali",
    lastBooking: "2026-05-10",
    totalSpend: 498500,
    rate: "Corporate Gold",
    status: "Active",
  },
]

const STATUS_OPTIONS = ["all", "Active", "Paused", "Expired"]
const SORT_OPTIONS = [
  { value: "date_desc", label: "Date: Newest first" },
  { value: "date_asc", label: "Date: Oldest first" },
  { value: "spend_desc", label: "Spend: High to Low" },
  { value: "spend_asc", label: "Spend: Low to High" },
]

function formatCurrency(amount: number) {
  return `RWF ${amount.toLocaleString()}`
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("date_desc")

  const filteredClients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return MOCK_CLIENTS.filter((client) => {
      const searchMatch =
        query === "" ||
        client.id.toLowerCase().includes(query) ||
        client.name.toLowerCase().includes(query) ||
        client.company.toLowerCase().includes(query) ||
        client.region.toLowerCase().includes(query) ||
        client.rate.toLowerCase().includes(query)

      const statusMatch = statusFilter === "all" || client.status === statusFilter

      return searchMatch && statusMatch
    }).sort((a, b) => {
      if (sortOrder === "date_asc") {
        return new Date(a.lastBooking).getTime() - new Date(b.lastBooking).getTime()
      }
      if (sortOrder === "date_desc") {
        return new Date(b.lastBooking).getTime() - new Date(a.lastBooking).getTime()
      }
      if (sortOrder === "spend_asc") {
        return a.totalSpend - b.totalSpend
      }
      return b.totalSpend - a.totalSpend
    })
  }, [searchTerm, statusFilter, sortOrder])

  return (
    <div className="space-y-6 px-0">
      <div className="rounded-3xl bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Corporate Clients</h1>
            <p className="mt-2 text-sm text-slate-500">Search and sort corporate clients by name, company, status, stay date, and spend.</p>
          </div>
          <button className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 w-full sm:w-auto">
            Add Client Rate
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[1.9fr_1fr_1fr]">
          <div className="relative rounded-2xl border border-slate-200 bg-slate-50">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client name, company region or rate"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 p-3"
            />
          </div>
{/* 
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All statuses" : status}
                </option>
              ))}
            </select>
          </div> */}

          <div className="rounded-2xl">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 p-3 text-sm text-slate-700 outline-none"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold">Last booking</th>
                <th className="px-6 py-4 font-semibold">Total spend</th>
                <th className="px-6 py-4 font-semibold">Rate</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{client.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{client.company}</p>
                    <p className="text-xs text-slate-500">{client.region}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-900">{formatDate(client.lastBooking)}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{formatCurrency(client.totalSpend)}</td>
                  <td className="px-6 py-4 text-slate-900">{client.rate}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      client.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : client.status === "Paused"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                      {client.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500">
                    No corporate clients match your search and filters.
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
