"use client"

import { Rha_Admin_Sidebar } from "@/components/sidebars/rha_admin/sidebar"
import { RHAAdminHeader } from "@/components/headers/rha_admin_header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

export default function RhaAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Rha_Admin_Sidebar />
      <SidebarInset>
        <RHAAdminHeader />
        <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
