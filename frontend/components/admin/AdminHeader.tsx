"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { clearTokens, getRefreshToken } from "@/lib/auth";
import { authService } from "@/services";

interface AdminHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  adminName?: string;
}

export function AdminHeader({ activeTab, onTabChange, adminName = "Admin" }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const refreshToken = getRefreshToken();
    
    // Call backend to blacklist token
    if (refreshToken) {
      await authService.logout(refreshToken);
    }
    
    // Clear local tokens
    clearTokens();
    
    // Redirect to login
    router.push("/login");
  };

  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "users", label: "Users" },
    { key: "batches", label: "Batches" },
    { key: "payments", label: "Payments" },
    { key: "system", label: "System" },
  ];

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded bg-primary" aria-hidden />
          <div className="text-lg font-semibold">Apra Nova Admin</div>
          <nav className="hidden items-center gap-2 md:flex">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? "default" : "ghost"}
                onClick={() => onTabChange?.(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-admin.jpg" alt={adminName} />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{adminName}</p>
                <p className="text-xs leading-none text-muted-foreground">Administrator</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
