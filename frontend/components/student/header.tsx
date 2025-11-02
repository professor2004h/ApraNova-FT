"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { clearTokens, getRefreshToken } from "@/lib/auth"
import { authService } from "@/services"

const tabs = [
  { href: "/student/dashboard", label: "Dashboard" },
  { href: "/student/project-guide", label: "Project Guide" },
  { href: "/student/submit", label: "Submit" },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

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

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-6 px-4 md:px-6">
        <Link href="/student/dashboard" className="flex items-center gap-2">
          <Image src="/apra-nova-logo.jpg" alt="Apra Nova logo" width={28} height={28} className="rounded" />
          <span className="font-medium tracking-tight">Apra Nova</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "text-sm transition-colors hover:text-foreground",
                pathname === t.href ? "text-foreground font-medium" : "text-muted-foreground",
              )}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Student avatar" />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Student Name</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/student/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/student/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
