"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function SubmitPage() {
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [agreed, setAgreed] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        <Link href="/student/dashboard" className="underline-offset-4 hover:underline">
          Dashboard
        </Link>{" "}
        / Submit
      </div>

      {/* Pre-Submission Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Before You Submit</CardTitle>
          <CardDescription>Make sure you meet all requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Code is committed to GitHub</span>
            <Badge variant="secondary">✓</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>All requirements completed</span>
            <Badge variant="secondary">✓</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Code is tested and working</span>
            <Badge variant="secondary">✓</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Documentation updated</span>
            <Badge variant="secondary">✓</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Ready to submit</span>
            <Badge variant="outline">○</Badge>
          </div>
          <div className="text-xs text-muted-foreground">Progress: 4/5 checks completed</div>
        </CardContent>
      </Card>

      {/* Git Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Git Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge className="bg-emerald-600 hover:bg-emerald-600">Verified</Badge>
          </div>
          <div className="rounded-md border p-3 text-sm">
            <div className="font-mono">a1b2c3d</div>
            <div>Initialize project</div>
            <div className="text-muted-foreground">Today 10:21 • Author: Student</div>
          </div>
          <div className="flex items-center justify-between">
            <a
              className="text-sm text-primary underline-offset-4 hover:underline"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
            <Button variant="secondary" size="sm">
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Your Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="repo">GitHub Repo URL</Label>
            <Input id="repo" placeholder="https://github.com/you/project" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="demo">Live Demo URL (optional)</Label>
            <Input id="demo" placeholder="https://your-demo.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Submission Notes</Label>
            <Textarea id="notes" placeholder="Anything you'd like the trainer to know…" maxLength={500} />
            <div className="text-xs text-muted-foreground">0/500</div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="confirm" checked={agreed} onCheckedChange={(c) => setAgreed(Boolean(c))} />
            <Label htmlFor="confirm" className="leading-tight">
              I confirm this is my original work
            </Label>
          </div>
          <Button disabled={!agreed} onClick={() => setConfirmOpen(true)}>
            Submit Project
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div className="rounded-md border p-3">
              <div>Project: Project 1</div>
              <div>Track: DP</div>
              <div>Commits: 15</div>
              <div>Last commit: 2 hours ago</div>
            </div>
            <p className="text-muted-foreground">Once submitted, you cannot make changes until trainer review.</p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Go Back
            </Button>
            <Button asChild>
              <Link href="/student/dashboard">Yes, Submit Now</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
