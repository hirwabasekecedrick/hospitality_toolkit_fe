// app/super_admin/settings/page.tsx
"use client";

import React from "react";
import { mockSettings } from "@/src/mocks/superAdminSettings";

export default function SettingsPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <table className="min-w-full border-collapse table-auto bg-white/80 backdrop-blur-sm shadow rounded-lg overflow-hidden">
        <thead className="bg-emerald-50">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {mockSettings.map((setting) => (
            <tr key={setting.id} className="border-t">
              <td className="px-4 py-2">{setting.id}</td>
              <td className="px-4 py-2">{setting.name}</td>
              <td className="px-4 py-2">{setting.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
