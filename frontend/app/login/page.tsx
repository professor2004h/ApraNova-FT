"use client"

import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import LoginForm from "@/components/auth/login-form"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"
import { ArrowLeft, Code2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

// export const metadata: Metadata = {
//   title: "Login • Apra Nova",
//   description: "Sign in to your Apra Nova account",
// }

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || ""
  const { isCheckingAuth } = useAuthRedirect()

  // Updated to accept user object with role and redirectUrl
  function handleLoginSuccess(user: { role: string; redirectUrl?: string }) {
    // Use redirectUrl from backend if available, otherwise fallback to role-based routing
    const target =
      redirectUrl ||
      user.redirectUrl ||
      (user.role === "admin"
        ? "/admin/dashboard"
        : user.role === "trainer"
        ? "/trainer/dashboard"
        : user.role === "superadmin"
        ? "/superadmin/dashboard"
        : "/student/dashboard")

    router.push(target)
  }

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <main
        className="min-h-svh flex items-center justify-center p-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.98 0 0), var(--color-muted) 40%, var(--color-background) 80%)",
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking session...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Simple Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 dark:bg-gray-900 p-12 flex-col justify-between">
        {/* Logo & Home */}
        <div>
          <Link href="/" className="flex items-center space-x-2 text-foreground hover:opacity-70 transition-opacity">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-semibold">ApraNova</span>
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-6 max-w-md">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="text-lg text-muted-foreground">
            Sign in to continue your learning journey and access your workspace.
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-muted-foreground">
          © 2025 ApraNova. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-semibold">ApraNova</span>
            </Link>
          </div>

          {/* Back to Home */}
          <div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to continue
            </p>
          </div>

          {/* Login Form */}
          <LoginForm onLoginSuccess={handleLoginSuccess} />

          {/* Sign Up Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">New to ApraNova? </span>
            <Link href="/signup" className="font-medium text-purple-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
