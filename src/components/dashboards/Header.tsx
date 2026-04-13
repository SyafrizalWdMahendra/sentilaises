"use client";
import {
  BarChart3,
  Database,
  Laptop,
  LogOut,
  Moon,
  Sun,
  User,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useHeader } from "@/src/hooks/useHeader";
import { useDashboards } from "@/src/hooks/useDashboard";
import { useState } from "react";
import { is } from "zod/v4/locales";

export function Header({
  onToggle,
  isDark,
}: {
  onToggle: () => void;
  isDark: boolean;
}) {
  const { open, setOpen, session, mounted, productCount } = useHeader();
  const { totalReviews } = useDashboards();

  if (!mounted) return null;
  return (
    <header
      className={`border-b ${isDark ? "bg-gray-900 text-white" : "bg-[#F8FBFF]/50"} backdrop-blur-sm sticky top-0 z-10  transition-all duration-500`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? "bg-gray-700 text-white" : "bg-primary text-primary-foreground"}`}
            >
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                SENTILAISES.
              </h1>
              <p className="text-sm text-muted-foreground">
                Analisis Sentimen Ulasan Laptop Tokopedia
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-6 text-sm md:flex">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Laptop className="h-4 w-4" />
                <span>{productCount} Produk</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Database className="h-4 w-4" />
                <span>{totalReviews} Ulasan</span>
              </div>
            </div>
            <div onClick={() => setOpen(true)}>
              <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                    <span>{`Hi, ${session.data?.user?.name || "Guest"}`}</span>
                    <User className={cn("h-4 w-4 text-muted-foreground")} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className={`bg-card ${isDark ? "bg-gray-800 text-white" : "bg-white"} transition-all duration-500`}
                >
                  <Link href="/profile">
                    <DropdownMenuItem
                      className={`cursor-pointer gap-2 transition-colors hover:text-primary ${isDark ? "text-white hover:bg-gray-900 hover:text-card" : "text-black hover:bg-primary hover:text-card"} transition-all duration-500`}
                    >
                      <UserCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Menu Profil</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator className="bg-border" />

                  <DropdownMenuItem
                    className={`cursor-pointer gap-2 text-destructive transition-colors ${isDark ? "text-white focus:bg-sentiment-negative/10 focus:text-sentiment-negative" : "text-black focus:bg-sentiment-negative-light focus:text-sentiment-negative"} transition-all duration-500`}
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {isDark ? (
              <Sun
                onClick={onToggle}
                className={`h-4 w-4 cursor-pointer ${isDark ? "text-white" : "text-black"} `}
              />
            ) : (
              <Moon
                onClick={onToggle}
                className={`h-4 w-4 cursor-pointer ${isDark ? "text-white" : "text-black"} `}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
