"use client"

import { CorporateAdminSearch } from "@/components/search_inputs/corporate_admin_search"
import {
  BellIcon,
  ChevronDownIcon,
  UserCircle2Icon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CorporateAdminHeader() {
  return (
    <header className="relative left-0 right-0 flex h-20 items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-10 shadow-sm md:gap-4">
      {/* Left: Sidebar trigger + branding */}
      <div className="flex items-center gap-2 sm:gap-3">
        <SidebarTrigger />
        <div className="hidden rounded-full text-emerald-700 px-3 py-1.5 text-xs font-bold sm:block sm:px-4 sm:py-2 sm:text-lg">
          XYZ Company
        </div>
      </div>

      {/* Center: Search (hidden on mobile) */}
      <div className="flex-1 items-center justify-center px-2 flex">
        <CorporateAdminSearch />
      </div>

      {/* Right: Actions + user menu */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:h-10 sm:w-10">
              <BellIcon className="h-4 w-4" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>
                You have 3 unread notifications.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-1 border-b pb-4">
                <span className="text-sm font-semibold text-slate-900">New Card Requested</span>
                <span className="text-xs text-slate-500">Amina K. has requested a new virtual card.</span>
                <span className="text-xs text-slate-400 mt-1">2 mins ago</span>
              </div>
              <div className="flex flex-col gap-1 border-b pb-4">
                <span className="text-sm font-semibold text-slate-900">Spending Limit Reached</span>
                <span className="text-xs text-slate-500">Marketing Dept card has reached 90% of its limit.</span>
                <span className="text-xs text-slate-400 mt-1">1 hour ago</span>
              </div>
              <div className="flex flex-col gap-1 border-b pb-4">
                <span className="text-sm font-semibold text-slate-900">System Update</span>
                <span className="text-xs text-slate-500">Scheduled maintenance tonight at 2 AM.</span>
                <span className="text-xs text-slate-400 mt-1">5 hours ago</span>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-50 sm:flex sm:px-3 sm:py-2 sm:text-sm">
              <UserCircle2Icon className="h-4 w-4 text-emerald-700 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">admin1</span>
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
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile user button (icon only) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 sm:hidden">
              <UserCircle2Icon className="h-5 w-5 text-emerald-700" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>admin1</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
