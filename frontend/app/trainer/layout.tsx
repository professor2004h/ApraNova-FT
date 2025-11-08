import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trainer • Apra Nova",
  description: "Trainer area",
}

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
