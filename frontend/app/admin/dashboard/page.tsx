import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import AdminDashboard from "@/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard • Apra Nova",
  description: "Administration panel for Apra Nova",
}

export default function AdminDashboardPage() {
  return (
    <main className="min-h-svh bg-background">
      <AdminDashboard />
      <Toaster />
    </main>
  )
}
