import {
  BarChart3,
  Database,
  Laptop,
  LogOut,
  RefreshCw,
  User,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { redirect } from "next/navigation";

export function Header() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [open, setOpen] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          </div>

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
            <div
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="gap-2 focus-visible:ring-0 border-border hover:bg-secondary hover:text-white transition-colors"
                  >
                    <User className={cn("h-4 w-4 text-muted-foreground")} />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-max bg-card border-border shadow-md"
                >
                  <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-secondary focus:text-primary transition-colors hover:text-primary">
                    <UserCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Menu Profil</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-border" />

                  <DropdownMenuItem
                    className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-red-500 transition-colors"
                    onClick={() => redirect("/")}
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
