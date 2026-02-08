"use client";
import {
  BarChart3,
  Database,
  Laptop,
  LogOut,
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

export function Header() {
  const { open, setOpen, session, mounted } = useHeader();

  if (!mounted) return null;
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
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
                <span>5 Brand</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Database className="h-4 w-4" />
                <span>12,450 Ulasan</span>
              </div>
            </div>
            <div onClick={() => setOpen(true)}>
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                    <span>{`Hi, ${session.data?.user?.name || "Guest"}`}</span>
                    <User className={cn("h-4 w-4 text-muted-foreground")} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-max bg-card border-border shadow-md"
                >
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-secondary focus:text-primary transition-colors hover:text-primary">
                      <UserCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Menu Profil</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator className="bg-border" />

                  <DropdownMenuItem
                    className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-red-500 transition-colors"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
