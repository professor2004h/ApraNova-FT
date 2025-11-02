"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Rocket, ExternalLink } from "lucide-react"
import apiClient from "@/lib/apiClient"

type State = "inactive" | "provisioning" | "ready" | "error"

export default function WorkspacePage() {
  const [state, setState] = React.useState<State>("inactive")
  const [progress, setProgress] = React.useState(0)
  const [workspaceUrl, setWorkspaceUrl] = React.useState<string>("")
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  React.useEffect(() => {
    let timer: number | undefined
    if (state === "provisioning") {
      setProgress(0)
      timer = window.setInterval(() => {
        setProgress((p) => {
          const next = Math.min(100, p + 10)
          if (next === 100) {
            window.clearInterval(timer)
            setTimeout(() => setState("ready"), 600)
          }
          return next
        })
      }, 1200)
    }
    return () => {
      if (timer) window.clearInterval(timer)
    }
  }, [state])

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        <Link href="/student/dashboard" className="underline-offset-4 hover:underline">
          Dashboard
        </Link>{" "}
        / Workspace
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Launch Your Workspace</CardTitle>
          <CardDescription>Your cloud-based IDE will be ready in under 30 seconds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {state === "inactive" && (
            <>
              <div className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
                Track: Data Professional • Tools: Python, Pandas, Jupyter, code-server • Storage: Persistent (auto-sync)
              </div>
              <Button
                className="w-full"
                onClick={async () => {
                  setState("provisioning");
                  setErrorMessage("");
                  try {
                    const res = await apiClient.post("/users/workspace/create/");
                    setWorkspaceUrl(res.data.url || ""); // Save the dynamic URL
                    setTimeout(() => {
                      setState("ready");
                      const workspaceUrl = res.data.url;
                      window.open(res.data.url, "_blank", "noopener,noreferrer");
                    }, 3000);
                  } catch (err: any) {
                    setState("error");
                    const message = err.response?.data?.message || err.response?.data?.error || "Failed to provision workspace";
                    setErrorMessage(message);
                  }
                }}
              >
                <Rocket className="mr-2 h-4 w-4" />
                Launch Workspace
              </Button>
              <p className="text-xs text-muted-foreground">Your workspace automatically saves every 10 seconds.</p>
            </>
          )}

          {state === "provisioning" && (
            <>
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-muted">
                  <div className="h-3 rounded bg-primary transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-sm text-muted-foreground">Provisioning… ~15 seconds remaining</div>
                <ul className="text-sm text-muted-foreground list-disc pl-5">
                  <li>Provisioning container…</li>
                  <li>Setting up environment…</li>
                  <li>Mounting storage…</li>
                  <li>Almost ready…</li>
                </ul>
              </div>
              <Button variant="secondary" onClick={() => setState("inactive")}>
                Cancel
              </Button>
            </>
          )}

          {state === "ready" && (
            <>
              <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
                <AlertTitle>Your workspace is ready!</AlertTitle>
                <AlertDescription>Open the IDE in a new tab to start coding.</AlertDescription>
              </Alert>
              <Button
                className="w-full"
                asChild
                onClick={() => {
                  if (workspaceUrl || "") {
                    window.open(workspaceUrl, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <a href={workspaceUrl} target="_blank" rel="noopener noreferrer">
                  Open IDE
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <div className="text-sm text-muted-foreground">URL: {workspaceUrl}</div>
            </>
          )}

          {state === "error" && (
            <>
              <Alert variant="destructive">
                <AlertTitle>Failed to provision workspace</AlertTitle>
                <AlertDescription>
                  {errorMessage || "Please try again or contact support."}
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button onClick={() => {
                  setState("provisioning");
                  setErrorMessage("");
                }}>Try Again</Button>
                <Button asChild variant="secondary">
                  <a href="mailto:support@apranova.com">Contact Support</a>
                </Button>
              </div>
            </>
          )}
          {state !== "inactive" && state !== "ready" && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Working...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
