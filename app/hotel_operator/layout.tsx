"use client"

import { Hotel_Operator_Sidebar } from "@/components/sidebars/hotel_operator/sidebar"
import { HotelOperatorHeader } from "@/components/headers/hotel_operator_header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

export default function HotelOperatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Hotel_Operator_Sidebar />
      <SidebarInset>
        <HotelOperatorHeader />
        <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
