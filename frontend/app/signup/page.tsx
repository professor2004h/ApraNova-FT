"use client"

import type { Metadata } from "next"
import Link from "next/link"
import SignupForm from "@/components/auth/signup-form"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"
import { ArrowLeft, Rocket, Users, Award, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

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
            Start learning today
          </h1>
          <p className="text-lg text-muted-foreground">
            Join thousands of students building their tech careers with hands-on projects and expert guidance.
          </p>
          
          {/* Simple Benefits List */}
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
              Cloud-based workspace
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
              Industry-recognized certificates
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
              24/7 expert support
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-sm text-muted-foreground">
          © 2025 ApraNova. All rights reserved.
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-lg space-y-8">
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
            <h2 className="text-2xl font-semibold">Create your account</h2>
            <p className="text-sm text-muted-foreground">
              Get started with your free account
            </p>
          </div>

          {/* Signup Form */}
          <SignupForm />

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="font-medium text-purple-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
