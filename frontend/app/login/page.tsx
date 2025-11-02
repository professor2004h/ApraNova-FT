"use client"

import { Suspense } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import LoginForm from "@/components/auth/login-form"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"

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
    <main
      className="min-h-svh flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.98 0 0), var(--color-muted) 40%, var(--color-background) 80%)",
      }}
    >
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Image
              src="/apra-nova-logo.jpg"
              alt="Apra Nova logo"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-lg font-medium tracking-tight">
              Apra Nova
            </span>
          </div>
        </div>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
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
