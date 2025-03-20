"use client";

import { useAuth } from "@/providers/authprovider";
import { useTheme } from "@/providers/themeprovider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Moon, Sun, User, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between border-b bg-background shadow-lg px-6 md:px-10">
      {/* Left Section */}
      <div className="flex-1 md:flex-initial">
        <h1 className="text-xl font-bold md:hidden">Dashboard</h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex max-w-md w-full mx-6">
        <div className="relative w-full">
          <Search className="absolute left-4 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-full pl-10 bg-muted/40 border border-muted/50 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Theme Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="transition-all duration-300 hover:bg-muted/50 rounded-full p-2"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch to {theme === "dark" ? "light" : "dark"} mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Notifications */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-muted/50 rounded-full p-2"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground shadow-md">
                  3
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>You have 3 unread notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full p-1">
              <Avatar className="h-9 w-9 border-2 border-primary/30">
                <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                  {user?.email.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-3 p-3 border-b">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                  {user?.email.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-medium text-sm truncate max-w-[120px]">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
            <DropdownMenuItem asChild>
              <a
                href="/profile"
                className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md"
              >
                <User className="h-4 w-4" /> Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={logout}
              className="text-destructive px-3 py-2 hover:bg-red-100 hover:text-red-700 rounded-md cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
