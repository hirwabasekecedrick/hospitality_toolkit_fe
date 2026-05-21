"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SuperAdminHeader } from "@/components/headers/super_admin_header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SuperAdminHeader />
        <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
