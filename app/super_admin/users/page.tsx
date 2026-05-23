// app/super_admin/users/page.tsx
"use client";

import React from "react";
import { mockUsers } from "@/src/mocks/superAdminUsers";

export default function UsersPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Users Management</h1>
      <table className="min-w-full border-collapse table-auto bg-white/80 backdrop-blur-sm shadow rounded-lg overflow-hidden">
        <thead className="bg-emerald-50">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${user.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-800"}`}> 
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
