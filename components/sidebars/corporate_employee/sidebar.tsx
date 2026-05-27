"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  MapPinIcon,
  BookOpenIcon,
  CalendarIcon,
  CreditCardIcon,
  StarIcon,
  MessageSquareIcon,
} from "lucide-react"

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

const mainItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/corporate_employee",
    icon: LayoutDashboardIcon,
  },
  // {
  //   title: "My trips",
  //   url: "/corporate_employee/trips",
  //   icon: MapPinIcon,
  // },
  // {
  //   title: "Bookings",
  //   url: "/corporate_employee/bookings",
  //   icon: BookOpenIcon,
  // },
  // {
  //   title: "Schedule",
  //   url: "/corporate_employee/schedule",
  //   icon: CalendarIcon,
  // },
]

const financeItems: NavItem[] = [
  {
    title: "Transactions",
    url: "/corporate_employee/payments",
    icon: CreditCardIcon,
  },
]

const communicationItems: NavItem[] = [
  {
    title: "Reviews",
    url: "/corporate_employee/reviews",
    icon: StarIcon,
  },
  {
    title: "Messages",
    url: "/corporate_employee/messages",
    icon: MessageSquareIcon,
  },
]

export function CorporateEmployeeSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname() || "/"
  const { isMobile, setOpenMobile } = useSidebar()

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/corporate_employee" className="block w-full px-4 py-10" onClick={handleNavClick}>
                <div className="w-full  ">
                  <Image
                    src="/images/sidebarlogo.png"
                    alt="Sidebar logo"
                    width={180}
                    height={56}
                    loading="eager"
                    className="h-full w-full object-contain"
                  />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {mainItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.url)
              const linkClass = `flex w-full items-center gap-2 rounded-md px-2 m-1 py-2 ${
                isActive ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-700 hover:bg-emerald-50"
              }`
              const iconClass = `size-4 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-400"}`
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={linkClass} onClick={handleNavClick}>
                      <Icon className={iconClass} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>FINANCE</SidebarGroupLabel>
          <SidebarMenu>
            {financeItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname.startsWith(item.url)
                const linkClass = `flex w-full items-center gap-2 m-1 rounded-md px-2 py-2 ${
                  isActive ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-700 hover:bg-emerald-50"
                }`
                const iconClass = `size-4 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-400"}`
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className={linkClass} onClick={handleNavClick}>
                        <Icon className={iconClass} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>COMMUNICATION</SidebarGroupLabel>
          <SidebarMenu>
            {communicationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.url)
              const linkClass = `flex w-full items-center gap-2 m-1 rounded-md px-2 py-2 ${
                isActive ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-700 hover:bg-emerald-50"
              }`
              const iconClass = `size-4 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-400"}`
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={linkClass}>
                      <Icon className={iconClass} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
