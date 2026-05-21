"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CorporateEmployeeHeader } from "@/components/headers/corporate_employee_header"
import { CorporateEmployeeSidebar } from "@/components/sidebars/corporate_employee/sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import React from "react"

export default function CorporateEmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <CorporateEmployeeSidebar />
      <SidebarInset>
        <CorporateEmployeeHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
