"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/authprovider";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <DashboardSidebar>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </DashboardSidebar>
  );
}
