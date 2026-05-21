"use client"

import { Corporate_Admin_Sidebar } from "@/components/sidebars/corporate_admin/sidebar"
import { CorporateAdminHeader } from "@/components/headers/corporate_admin_header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

export default function CorporateAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Corporate_Admin_Sidebar />
      <SidebarInset>
        <CorporateAdminHeader />
        <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
