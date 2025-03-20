"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Settings, User, Menu, X } from "lucide-react";

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Profile", href: "/profile", icon: User },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 dark:bg-gray-800 md:hidden"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Overlay for closing sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 dark:bg-gray-900 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <Sidebar>
          <SidebarHeader className="flex h-16 items-center border-b px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <LayoutDashboard className="h-6 w-6" />
              <span>Admin Dashboard</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton asChild tooltip={route.title}>
                    <Link
                      href={route.href}
                      className={`flex items-center gap-3 p-3 rounded-md transition-all duration-300 ${
                        pathname === route.href
                          ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                          : "hover:bg-gray-200 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setIsOpen(false)} // Close on click
                    >
                      <route.icon className="h-5 w-5" />
                      <span>{route.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="text-xs text-muted-foreground">
              <p>© 2025 Admin Dashboard</p>
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>
    </>
  );
}
