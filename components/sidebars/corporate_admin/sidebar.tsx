"use client";

import * as React from "react";

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
  useSidebar,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  CreditCardIcon,
  ArrowRightLeftIcon,
  PieChartIcon,
  CheckCircle2Icon,
  BarChart3Icon,
  Building2Icon,
  SettingsIcon,
} from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  notifications?: number;
}

const DIRECTORY = "/corporate_admin";

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
};

export function Corporate_Admin_Sidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname() || "/";
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/corporate_admin"
                className="block w-full px-4 py-10"
                onClick={handleNavClick}
              >
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
            {data.navMain.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.url);
              const linkClass = `flex w-full items-center gap-2 rounded-md px-2 py-2 ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-700 hover:bg-emerald-50"
              }`;
              const iconClass = `size-4 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-400"}`;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={linkClass}
                      onClick={handleNavClick}
                    >
                      <Icon className={iconClass} />
                      <span className="truncate">{item.title}</span>
                      {typeof item.notifications === "number" &&
                      item.notifications > 0 ? (
                        <SidebarMenuBadge className="bg-emerald-700 text-white font-semibold shadow-md hover:bg-emerald-800 transition-colors">
                          {item.notifications}
                        </SidebarMenuBadge>
                      ) : null}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
