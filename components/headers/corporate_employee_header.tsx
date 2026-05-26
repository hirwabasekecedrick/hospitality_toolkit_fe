"use client"

import { CorporateAdminSearch } from "@/components/search_inputs/corporate_admin_search"
import {
  BellIcon,
  ChevronDownIcon,
  UserCircle2Icon,
  SettingsIcon,
  LogOutIcon,
  CreditCardIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
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
import { CorporateEmployeeSearch } from "../search_inputs/corporate_employee_search"

export function CorporateEmployeeHeader() {
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
        <CorporateEmployeeSearch />
      </div>

      {/* Right: Actions + user menu */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-emerald-600 transition hover:bg-emerald-50 hover:border-emerald-300 sm:h-10 sm:w-10">
              <BellIcon className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                3
              </span>
            </button>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 shadow-sm">
              <SheetHeader className="space-y-2 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm">
                    <BellIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <SheetTitle className="text-white text-xl">Notifications</SheetTitle>
                    <SheetDescription className="text-emerald-100 text-sm">
                      You have 3 unread updates
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
            </div>
            <div className="space-y-3 px-1">
              {/* Notification 1 */}
              <div className="group relative rounded-lg border border-emerald-100 bg-gradient-to-r from-emerald-50 to-transparent hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-transparent transition-all p-4 cursor-pointer">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100">
                    <CreditCardIcon className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-900">New Card Requested</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-200 text-emerald-800">
                        New
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Amina K. has requested a new virtual card.</p>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <span>2 mins ago</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification 2 */}
              <div className="group relative rounded-lg border border-amber-100 bg-gradient-to-r from-amber-50 to-transparent hover:border-amber-300 hover:bg-gradient-to-r hover:from-amber-100 hover:to-transparent transition-all p-4 cursor-pointer">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-amber-100">
                    <AlertTriangleIcon className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-900">Spending Limit Warning</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-200 text-amber-800">
                        Alert
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Marketing Dept card has reached 90% of its limit.</p>
                    <p className="text-xs text-slate-400 mt-2">1 hour ago</p>
                  </div>
                </div>
              </div>

              {/* Notification 3 */}
              <div className="group relative rounded-lg border border-slate-100 bg-gradient-to-r from-slate-50 to-transparent hover:border-slate-300 hover:bg-gradient-to-r hover:from-slate-100 hover:to-transparent transition-all p-4 cursor-pointer">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-slate-100">
                    <AlertCircleIcon className="h-5 w-5 text-slate-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-900">System Update</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-800">
                        Info
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Scheduled maintenance tonight at 2 AM.</p>
                    <p className="text-xs text-slate-400 mt-2">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 mt-6 pt-4">
              <button className="w-full py-2 px-3 text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition">
                View All Notifications
              </button>
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
