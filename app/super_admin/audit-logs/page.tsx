// app/super_admin/audit-logs/page.tsx
"use client";

import React from "react";
import { mockAuditLogs } from "@/src/mocks/superAdminAuditLogs";

export default function AuditLogsPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Audit Logs</h1>
      <table className="min-w-full border-collapse table-auto bg-white/80 backdrop-blur-sm shadow rounded-lg overflow-hidden">
        <thead className="bg-emerald-50">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Action</th>
            <th className="px-4 py-2 text-left">Timestamp</th>
            <th className="px-4 py-2 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {mockAuditLogs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-2">{log.id}</td>
              <td className="px-4 py-2">{log.user}</td>
              <td className="px-4 py-2">{log.action}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{log.timestamp}</td>
              <td className="px-4 py-2 text-sm text-gray-500">{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
