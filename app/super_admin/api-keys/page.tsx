// app/super_admin/api-keys/page.tsx
"use client";

import React from "react";
import { mockApiKeys } from "@/src/mocks/superAdminApiKeys";

export default function ApiKeysPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">API Keys Management</h1>
      <table className="min-w-full border-collapse table-auto bg-white/80 backdrop-blur-sm shadow rounded-lg overflow-hidden">
        <thead className="bg-emerald-50">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Key</th>
            <th className="px-4 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {mockApiKeys.map((key) => (
            <tr key={key.id} className="border-t">
              <td className="px-4 py-2">{key.id}</td>
              <td className="px-4 py-2">{key.name}</td>
              <td className="px-4 py-2 text-sm text-gray-600 break-all">{key.key}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{key.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
