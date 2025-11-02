import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "SuperAdmin Dashboard • Apra Nova",
  description: "SuperAdmin control panel for Apra Nova",
}

export default function SuperAdminDashboardPage() {
  return (
    <main className="min-h-svh bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">SuperAdmin Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">Total Admins</h2>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-2">System Status</h2>
            <p className="text-xl font-semibold text-green-600">Active</p>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  )
}
