// SuperAdminSidebar.tsx – replicates Corporate_Admin_Sidebar with Super Admin items
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
  UsersIcon,
  SettingsIcon,
  CreditCardIcon,
  BarChart3Icon,
  LogOutIcon,
  RefreshCcwIcon,
} from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  notifications?: number;
}

const DIRECTORY = "/super_admin";

const data: { navMain: NavItem[] } = {
  navMain: [
    { title: "Dashboard", url: DIRECTORY, icon: LayoutDashboardIcon },
    { title: "Users", url: `${DIRECTORY}/users`, icon: UsersIcon },
    { title: "Tenants", url: `${DIRECTORY}/tenants`, icon: CreditCardIcon },
    { title: "Audit Logs", url: `${DIRECTORY}/audit-logs`, icon: LogOutIcon, notifications: 4 },
    { title: "Settings", url: `${DIRECTORY}/settings`, icon: SettingsIcon },
    { title: "API Keys", url: `${DIRECTORY}/api-keys`, icon: RefreshCcwIcon },
  ],
};

export function SuperAdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname() || "/";
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/super_admin" className="flex items-center gap-3" onClick={handleNavClick}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image src="/images/sidebar_logo.png" alt="Sidebar logo" width={32} height={32} loading="eager" className="rounded-md object-cover" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold">yoGuide</span>
                  <span className="text-xs text-muted-foreground">Super Admin</span>
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
                isActive ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-700 hover:bg-emerald-50"
              }`;
              const iconClass = `size-4 shrink-0 ${isActive ? "text-emerald-700" : "text-slate-400"}`;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={linkClass} onClick={handleNavClick}>
                      <Icon className={iconClass} />
                      <span className="truncate">{item.title}</span>
                      {typeof item.notifications === "number" && item.notifications > 0 && (
                        <SidebarMenuBadge className="bg-emerald-700 text-white font-semibold shadow-md hover:bg-emerald-800 transition-colors">
                          {item.notifications}
                        </SidebarMenuBadge>
                      )}
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
