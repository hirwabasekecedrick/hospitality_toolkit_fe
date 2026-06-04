"use client"

import { useRouter } from "next/navigation"
import { SuperAdminSearch } from "@/components/search_inputs/super_admin_search"
import {
  BellIcon,
  ChevronDownIcon,
  RefreshCcwIcon,
  UserCircle2Icon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"

export function SuperAdminHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const userName = user ? `${user.firstName} ${user.lastName}` : "super_admin"

  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 shadow-sm sm:px-4 md:gap-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <SidebarTrigger />
        <div className="hidden rounded-full bg-red-950 px-3 py-1.5 text-xs font-semibold text-white shadow-sm sm:block sm:px-4 sm:py-2 sm:text-sm">
          Super admin
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center px-2 lg:flex">
        <SuperAdminSearch />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:h-10 sm:w-10">
          <RefreshCcwIcon className="h-4 w-4" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:h-10 sm:w-10">
          <BellIcon className="h-4 w-4" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-50 sm:flex sm:px-3 sm:py-2 sm:text-sm">
              <UserCircle2Icon className="h-4 w-4 text-red-700 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">{userName}</span>
              <ChevronDownIcon className="h-3 w-3 text-slate-500 sm:h-4 sm:w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700" onClick={handleLogout}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:hidden">
              <UserCircle2Icon className="h-5 w-5 text-red-700" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700" onClick={handleLogout}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
