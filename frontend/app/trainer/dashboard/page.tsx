import { Toaster } from "@/components/ui/toaster"
import TrainerDashboard from "@/components/trainer-dashboard"

export const metadata = {
  title: "Trainer Dashboard • Apra Nova",
}

export default function Page() {
  return (
    <main>
      <TrainerDashboard />
      <Toaster />
    </main>
  )
}
