"use client"

import * as React from "react"
import Link from "next/link"
import { mockRedeems } from "@/lib/redeems"

const statusStyles: Record<"Pending" | "Completed" | "Processing" | "Failed", string> = {
  Pending: "bg-amber-100 text-amber-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Processing: "bg-sky-100 text-sky-800",
  Failed: "bg-rose-100 text-rose-800",
}

export default function Page() {
  const totalRedeems = mockRedeems.length
  const totalAmount = mockRedeems.reduce((sum, item) => sum + item.amount, 0)
  const nextRedeem = mockRedeems.find((item) => item.status === "Pending" || item.status === "Processing")?.nextRun

  return (
    <div className="space-y-6  px-0">
      <div className="rounded-3xl bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Redeems</h1>
          </div>
          
        </div>

        <div className="mt-6 space-y-4">
          {mockRedeems.map((item) => (
            <Link
              key={item.id}
              href={`/hotel_operator/redeems/${item.id}`}
              className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 hover:border-emerald-300 hover:bg-white transition-colors"
            >
              <div className="flex flex-row sm:flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600">{item.title}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">${item.amount.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status] ?? "bg-slate-100 text-slate-800"}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-500">{item.description}</p>

              <div className="grid gap-3 sm:grid-cols-3 text-sm text-slate-600">
                <div>
                  <p className="font-medium text-slate-900">Schedule</p>
                  <p>{item.schedule}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Transactions</p>
                  <p>{item.transactionCount}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Created</p>
                  <p>{item.createdAt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
