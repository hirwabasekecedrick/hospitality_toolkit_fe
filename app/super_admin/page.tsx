"use client"

import React from "react";
import { StatCard } from "@/src/components/superadmin/StatCard";
import { mockStats, mockSystemHealth } from "@/src/mocks/superAdminData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Page() {
  return (
    <div className="space-y-6 p-4">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={mockStats.totalUsers} />
        <StatCard title="Total Tenants" value={mockStats.totalTenants} />
        <StatCard title="Total Cards" value={mockStats.totalCards} />
        <StatCard title="Total Transactions" value={mockStats.totalTransactions} />
      </div>

      {/* System health chart */}
      <div className="h-80 rounded-xl bg-white/80 backdrop-blur-sm p-4 shadow-lg">
        <h3 className="mb-2 text-lg font-medium text-gray-700">System Health (CPU %)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockSystemHealth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="cpu" stroke="#2E9E6B" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
