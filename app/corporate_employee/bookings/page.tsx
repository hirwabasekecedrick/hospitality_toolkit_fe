"use client"

import { useState } from "react"
import { RefreshCcwIcon } from "lucide-react"

const bookingStatuses = [
  { label: "All" },
  { label: "Pending" },
  { label: "Confirmed" },
  { label: "Completed" },
  { label: "Cancelled" },
]

export default function BookingsPage() {
  const [active, setActive] = useState("All")

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
          <p className="mt-1 text-sm text-slate-600">Manage your reservations and trip bookings</p>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50">
          <RefreshCcwIcon className="h-5 w-5 text-slate-600" />
        </button>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-6">
          <p className="text-sm font-medium text-yellow-700">Pending</p>
          <p className="mt-2 text-3xl font-bold text-yellow-700">0</p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <p className="text-sm font-medium text-emerald-700">Confirmed</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">0</p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm font-medium text-blue-700">Completed</p>
          <p className="mt-2 text-3xl font-bold text-blue-700">0</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {bookingStatuses.map((s) => (
          <button
            key={s.label}
            onClick={() => setActive(s.label)}
            className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm transition ${
              active === s.label
                ? "bg-emerald-700 text-white"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Empty state area */}
      <div className="mt-6 grid min-h-[40vh] place-items-center rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
          </svg>
          <p className="mt-4 text-sm text-slate-600">No bookings found</p>
        </div>
      </div>
    </div>
  )
}
