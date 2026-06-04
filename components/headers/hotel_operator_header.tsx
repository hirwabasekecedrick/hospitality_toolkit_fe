"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { HotelOperatorSearch } from "../search_inputs/hotel_operator_search"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api-client"

interface Notification {
  id: string
  title: string
  message?: string
  type?: string
  createdAt: string
}

export function HotelOperatorHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.get<Notification[]>("/notifications")
        setNotifications(data)
        const unread = await api.get<{ count: number }>("/notifications/unread-count")
        setUnreadCount(unread.count)
      } catch {
      }
    }
    load()
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const userName = user ? `${user.firstName} ${user.lastName}` : "admin1"
  const hotelName = user?.tenant?.name || "XYZ Hotel"

  return (
    <header className="relative left-0 right-0 flex h-20 items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-10 shadow-sm md:gap-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <SidebarTrigger />
        <div className="hidden rounded-full text-emerald-700 px-3 py-1.5 text-xs font-bold sm:block sm:px-4 sm:py-2 sm:text-lg">
          {hotelName}
        </div>
      </div>

      <div className="flex-1 items-center justify-center px-2 flex">
        <HotelOperatorSearch />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-emerald-600 transition hover:bg-emerald-50 hover:border-emerald-300 sm:h-10 sm:w-10">
              <BellIcon className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
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
                      You have {unreadCount} unread updates
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
            </div>
            <div className="space-y-3 px-1">
              {notifications.slice(0, 10).map((notification) => (
                <div key={notification.id} className="group relative rounded-lg border border-slate-100 bg-gradient-to-r from-slate-50 to-transparent hover:border-emerald-300 hover:bg-gradient-to-r hover:from-slate-100 hover:to-transparent transition-all p-4 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100">
                      <CheckCircle2Icon className="h-5 w-5 text-emerald-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">{notification.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-slate-400 mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="text-center text-sm text-slate-500 py-8">No notifications yet</p>
              )}
            </div>
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
              <UserCircle2Icon className="h-5 w-5 text-emerald-700" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
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
      </div>
    </header>
  )
}
