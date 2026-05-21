"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function RHAAdminSearch() {
  return (
    <div className="relative w-full max-w-3xl">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        placeholder="Search hotels, sectors, analytics..."
        className="pl-10 pr-4"
      />
    </div>
  )
}
