"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const monthlyRevenue = [
  { month: "Jan", revenue: 182000 },
  { month: "Feb", revenue: 210000 },
  { month: "Mar", revenue: 236000 },
  { month: "Apr", revenue: 195000 },
  { month: "May", revenue: 248000 },
  { month: "Jun", revenue: 276000 },
  { month: "Jul", revenue: 312000 },
  { month: "Aug", revenue: 290000 },
  { month: "Sep", revenue: 334000 },
  { month: "Oct", revenue: 356000 },
  { month: "Nov", revenue: 398000 },
  { month: "Dec", revenue: 420000 },
]

const companyRankings = [
  { name: "Grand Horizon Hotels", revenue: 1260000 },
  { name: "Urban Inn Group", revenue: 980000 },
  { name: "Summit Suites", revenue: 830000 },
  { name: "Harborview Hospitality", revenue: 720000 },
  { name: "Maple Lane Resorts", revenue: 610000 },
]

const revenueDistribution = [
  { name: "Corporate Clients", value: 1420000 },
  { name: "Direct Bookings", value: 860000 },
  { name: "Travel Partners", value: 520000 },
  { name: "Other Services", value: 190000 },
]

const categoryColors = ["#16A34A", "#0EA5E9", "#F59E0B", "#A855F7"]

function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`
}

export default function Page() {
  return (
    <div className="space-y-6 px-0">
      <div className="rounded-3xl bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-950">Revenue Reports</h1>
          </div>
          <button className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 w-full sm:w-auto">
            Export Analytics
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">General Revenue</p>
              </div>
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                14.8% increase
              </span>
            </div>

            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue} margin={{ top: 20, right: 20, left: -12, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="revenue" name="Revenue" fill="#16A34A" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Revenue split</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-950">Corporate channels</h2>
            </div>

            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={4}
                    label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
                  >
                    {revenueDistribution.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={categoryColors[index % categoryColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Organization ranking</p>
            </div>
          </div>

          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyRankings} margin={{ top: 20, right: 10, left: -20, bottom: 10 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                <YAxis dataKey="name" type="category" width={150} tickLine={false} axisLine={false} tick={{ fill: "#334155", fontSize: 13 }} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="revenue" name="Revenue" fill="#0EA5E9" radius={[10, 10, 10, 10]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
