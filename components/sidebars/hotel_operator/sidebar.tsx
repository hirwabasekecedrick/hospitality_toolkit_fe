"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import {
  LayoutDashboardIcon,
  CreditCardIcon,
  ArrowRightLeftIcon,
  Building2Icon,
  BarChart3Icon,
  AlertCircleIcon,
  PieChartIcon,
  SettingsIcon,
  GiftIcon,
} from "lucide-react"

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  notifications?: number
}

const DIRECTORY = "/hotel_operator"

const data: { navMain: NavItem[] } = {
  navMain: [
    {
      title: "Overview",
      url: DIRECTORY,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Settlements",
      url: `${DIRECTORY}/settlements`,
      icon: CreditCardIcon,
    },
    {
      title: "Transactions",
      url: `${DIRECTORY}/transactions`,
      icon: ArrowRightLeftIcon,
    },
    {
      title: "Corporate clients",
      url: `${DIRECTORY}/corporate_clients`,
      icon: Building2Icon,
    },
    {
      title: "Revenue reports",
      url: `${DIRECTORY}/revenue_reports`,
      icon: BarChart3Icon,
    },
    {
      title: "Disputes",
      url: `${DIRECTORY}/disputes`,
      icon: AlertCircleIcon,
      notifications: 2,
    },
    {
      title: "Redeems",
      url: `${DIRECTORY}/redeems`,
      icon: GiftIcon,
    },
    {
      title: "Settings",
      url: `${DIRECTORY}/settings`,
      icon: SettingsIcon,
    },
  ],
}

export function Hotel_Operator_Sidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
            <SidebarMenuButton size="lg" className="p-0" asChild>
              <a href={DIRECTORY} onClick={handleNavClick} className="block w-full px-4 py-4">
                <div className="mx-auto h-14 w-full max-w-[180px]">
                  <Image
                    src="/images/sidebar_logo.png"
                    alt="Sidebar logo"
                    width={180}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const Icon = item.icon

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="hover:bg-emerald-50 hover:text-emerald-800 transition-colors" asChild>
                    <a href={item.url} className="flex items-center gap-2 font-semibold m-2" onClick={handleNavClick}>
                      <Icon className="size-4 shrink-0 text-sidebar-foreground" />
                      <span className="truncate">{item.title}</span>
                      {typeof item.notifications === "number" && item.notifications > 0 ? (
                        <SidebarMenuBadge className="bg-emerald-700 text-white font-semibold shadow-md hover:bg-emerald-800 transition-colors">
                          {item.notifications}
                        </SidebarMenuBadge>
                      ) : null}
                    </a>
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
