"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User, GraduationCap } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface TrainerHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  trainerName?: string;
}

export function TrainerHeader({ activeTab, onTabChange, trainerName = "Trainer" }: TrainerHeaderProps) {
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
    { key: "students", label: "Students" },
    { key: "submissions", label: "Submissions" },
    { key: "schedule", label: "Schedule" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <GraduationCap className="size-6 text-primary" />
          <span className="text-lg font-semibold">Apra Nova • Trainer</span>
        </div>
        
        <nav className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange?.(tab.key)}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                activeTab === tab.key ? "bg-primary/10 text-primary" : "hover:bg-muted"
              )}
              aria-current={activeTab === tab.key ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-trainer.jpg" alt={trainerName} />
                  <AvatarFallback>TR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{trainerName}</p>
                <p className="text-xs leading-none text-muted-foreground">Trainer</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/trainer/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/trainer/settings" className="cursor-pointer">
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
