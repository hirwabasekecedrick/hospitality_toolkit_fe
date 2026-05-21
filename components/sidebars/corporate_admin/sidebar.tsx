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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import type { LucideIcon } from "lucide-react"
import {
  GalleryVerticalEndIcon,
  LayoutDashboardIcon,
  CreditCardIcon,
  ArrowRightLeftIcon,
  PieChartIcon,
  CheckCircle2Icon,
  BarChart3Icon,
  Building2Icon,
  SettingsIcon,
} from "lucide-react"

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  notifications?: number
}

const DIRECTORY = "/corporate_admin"

const data: { navMain: NavItem[] } = {
  navMain: [
    {
      title: "Overview",
      url: DIRECTORY,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Cards",
      url: `${DIRECTORY}/cards`,
      icon: CreditCardIcon,
    },
    {
      title: "Transactions",
      url: `${DIRECTORY}/transactions`,
      icon: ArrowRightLeftIcon,
    },
    {
      title: "Budget",
      url: `${DIRECTORY}/budget`,
      icon: PieChartIcon,
    },
    {
      title: "Approvals",
      url: `${DIRECTORY}/approvals`,
      icon: CheckCircle2Icon,
      notifications: 3,
    },
    {
      title: "Reports",
      url: `${DIRECTORY}/reports`,
      icon: BarChart3Icon,
      notifications: 2,
    },
    {
      title: "Hotels",
      url: `${DIRECTORY}/hotels`,
      icon: Building2Icon,
      notifications: 5,
    },
    {
      title: "Settings",
      url: `${DIRECTORY}/settings`,
      icon: SettingsIcon,
    },
  ],
}

export function Corporate_Admin_Sidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEndIcon className="size-4" />
                </div> */}
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold">yoGuide</span>
                  <span className="text-xs text-muted-foreground">Corporate Hospitality Card</span>
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
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton className="hover:bg-blue-200" asChild>
                    <a href={item.url} className="flex items-center gap-2 font-semibold m-2">
                      <Icon className="size-4 shrink-0 text-sidebar-foreground" />
                      <span className="truncate">{item.title}</span>
                      {typeof item.notifications === "number" && item.notifications > 0 ? (
                        <SidebarMenuBadge className="bg-red-200 text-red-900">
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
