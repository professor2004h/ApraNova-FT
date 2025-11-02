"use client"

import type { Metadata } from "next"
import Image from "next/image"
import SignupForm from "@/components/auth/signup-form"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"

// export const metadata: Metadata = {
//   title: "Signup • Apra Nova",
//   description: "Create your Apra Nova account",
// }

export default function SignupPage() {
  const { isCheckingAuth } = useAuthRedirect()

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <main
        className="min-h-svh flex items-center justify-center p-4"
        style={{
          background: "linear-gradient(135deg, oklch(0.98 0 0), var(--color-muted) 40%, var(--color-background) 80%)",
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
        background: "linear-gradient(135deg, oklch(0.98 0 0), var(--color-muted) 40%, var(--color-background) 80%)",
      }}
    >
      <div className="w-full max-w-lg">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Image src="/apra-nova-logo.jpg" alt="Apra Nova logo" width={36} height={36} className="rounded-md" />
            <span className="text-lg font-medium tracking-tight">Apra Nova</span>
          </div>
        </div>
        <SignupForm />
      </div>
    </main>
  )
}
