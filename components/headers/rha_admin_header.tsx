"use client"

import { RHAAdminSearch } from "@/components/search_inputs/rha_admin_search"
import {
  BellIcon,
  ChevronDownIcon,
  RefreshCcwIcon,
  UserCircle2Icon,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function RHAAdminHeader() {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 shadow-sm sm:px-4 md:gap-4">
      {/* Left: Sidebar trigger + branding */}
      <div className="flex items-center gap-2 sm:gap-3">
        <SidebarTrigger />
        <div className="hidden rounded-full bg-purple-950 px-3 py-1.5 text-xs font-semibold text-white shadow-sm sm:block sm:px-4 sm:py-2 sm:text-sm">
          RHA admin
        </div>
      </div>

      {/* Center: Search (hidden on mobile) */}
      <div className="hidden flex-1 items-center justify-center px-2 lg:flex">
        <RHAAdminSearch />
      </div>

      {/* Right: Actions + user menu */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:h-10 sm:w-10">
          <RefreshCcwIcon className="h-4 w-4" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:h-10 sm:w-10">
          <BellIcon className="h-4 w-4" />
        </button>
        <button className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-50 sm:flex sm:px-3 sm:py-2 sm:text-sm">
          <UserCircle2Icon className="h-4 w-4 text-purple-700 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">rha_admin</span>
          <ChevronDownIcon className="h-3 w-3 text-slate-500 sm:h-4 sm:w-4" />
        </button>
        {/* Mobile user button (icon only) */}
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:hidden">
          <UserCircle2Icon className="h-5 w-5 text-purple-700" />
        </button>
      </div>
    </header>
  )
}
