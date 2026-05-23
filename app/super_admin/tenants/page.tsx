// app/super_admin/tenants/page.tsx
"use client";

import React from "react";
import { mockTenants } from "@/src/mocks/superAdminTenants";

export default function TenantsPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Tenants Management</h1>
      <table className="min-w-full border-collapse table-auto bg-white/80 backdrop-blur-sm shadow rounded-lg overflow-hidden">
        <thead className="bg-emerald-50">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">API Key</th>
            <th className="px-4 py-2 text-left">Rate Limit</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockTenants.map((tenant) => (
            <tr key={tenant.id} className="border-t">
              <td className="px-4 py-2">{tenant.id}</td>
              <td className="px-4 py-2">{tenant.name}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{tenant.apiKey}</td>
              <td className="px-4 py-2">{tenant.rateLimit}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${tenant.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}`}>
                  {tenant.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
