"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AutoSaveIndicator from "@/components/student/auto-save-indicator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  Circle,
  Rocket,
  BookOpen,
  Upload,
  MessageCircle,
  ExternalLink,
  UserCheck,
} from "lucide-react"
import apiClient from "@/lib/apiClient"

function formatDate() {
  const d = new Date()
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })
}

export default function StudentDashboardPage() {
  const progress = 45
  const [trainerInfo, setTrainerInfo] = useState<{ name: string; email: string } | null>(null)
  const [studentName, setStudentName] = useState("Student")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await apiClient.get("/users/profile")
        
        // Set student name
        if (response.data.name || response.data.username) {
          setStudentName(response.data.name || response.data.username)
        }
        
        // Set trainer info
        if (response.data.assigned_trainer) {
          setTrainerInfo({
            name: response.data.assigned_trainer.name || response.data.assigned_trainer.email,
            email: response.data.assigned_trainer.email
          })
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserProfile()
  }, [])

  return (
    <div className="space-y-6">
      <AutoSaveIndicator />

      {/* Breadcrumbs */}
      <div className="text-sm text-muted-foreground">Dashboard</div>

      {/* Welcome */}
      <Card>
        <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-balance">Welcome back, {studentName}!</CardTitle>
            <CardDescription>{formatDate()}</CardDescription>
          </div>
          <Button asChild>
            <Link href="/student/project-guide">
              View Project Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
      </Card>

      {/* Trainer Info */}
      {!loading && trainerInfo && (
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
          <UserCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-900 dark:text-blue-100">
            <span className="font-medium">Your Trainer:</span> {trainerInfo.name}
            {trainerInfo.name !== trainerInfo.email && (
              <span className="text-sm text-blue-700 dark:text-blue-300"> ({trainerInfo.email})</span>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {!loading && !trainerInfo && (
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
          <UserCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-900 dark:text-amber-100">
            A trainer will be assigned to you soon.
          </AlertDescription>
        </Alert>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Project Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Project 1 - Data Professional</CardTitle>
            <CardDescription>Track your progress and upcoming checkpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Custom progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{progress}% Complete</span>
              </div>
              <div className="h-3 w-full rounded bg-muted">
                <div
                  className="h-3 rounded bg-emerald-600 transition-all"
                  style={{ width: `${progress}%` }}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  role="progressbar"
                />
              </div>
            </div>

            {/* Checkpoints */}
            <ul className="space-y-3">
              <li className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <div>
                    <div className="font-medium">Environment Setup</div>
                    <div className="text-xs text-muted-foreground">Completed 2 days ago</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                  Completed
                </Badge>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <div>
                    <div className="font-medium">Data Loading</div>
                    <div className="text-xs text-muted-foreground">Completed 1 day ago</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                  Completed
                </Badge>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <Circle className="h-4 w-4 text-yellow-500" />
                  <div>
                    <div className="font-medium">Data Cleaning</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">
                  In Progress
                </Badge>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Analysis</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
                <Badge variant="outline">Pending</Badge>
              </li>
              <li className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <Circle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Visualization</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
                <Badge variant="outline">Pending</Badge>
              </li>
            </ul>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Estimated completion: 3 days
              </div>
              <div>Last updated: 2 minutes ago</div>
            </div>
          </CardContent>
        </Card>

        {/* Workspace Status */}
        <Card>
          <CardHeader>
            <CardTitle>Workspace Status</CardTitle>
            <CardDescription>Your cloud IDE status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Status</div>
              <Badge className="bg-emerald-600 hover:bg-emerald-600">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Last active</div>
              <div className="text-sm">10 mins ago</div>
            </div>
            <div className="text-sm text-muted-foreground">IDE: code-server • Track: DP • Auto-save: On</div>
            <Button asChild className="w-full">
              <Link href="/student/workspace">
                Launch Workspace
                <Rocket className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 2nd row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Commits */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Commits</CardTitle>
            <CardDescription>Latest activity from your repository</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hash</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { h: "a1b2c3d", m: "Initialize project", d: "Today 10:21", s: "Verified" },
                  { h: "d4e5f6a", m: "Add data loader", d: "Yesterday 18:05", s: "Verified" },
                  { h: "b7c8d9e", m: "Clean dataset", d: "Yesterday 12:31", s: "Verified" },
                  { h: "f0a1b2c", m: "Fix schema", d: "Tue 09:11", s: "Verified" },
                  { h: "c3d4e5f", m: "WIP analysis", d: "Mon 16:44", s: "Verified" },
                ].map((row) => (
                  <TableRow key={row.h}>
                    <TableCell className="font-mono text-xs">{row.h}</TableCell>
                    <TableCell className="text-sm">{row.m}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{row.d}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                        ✓ {row.s}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-3 text-right">
              <a
                className="inline-flex items-center text-sm text-primary underline-offset-4 hover:underline"
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View All
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions + Announcements */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button asChild variant="secondary" className="justify-start">
                <Link href="/student/project-guide">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Project Guide
                </Link>
              </Button>
              <Button asChild variant="secondary" className="justify-start">
                <Link href="/student/workspace">
                  <Rocket className="mr-2 h-4 w-4" />
                  Launch Workspace
                </Link>
              </Button>
              <Button asChild variant="secondary" className="justify-start">
                <Link href="/student/submit">
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Project
                </Link>
              </Button>
              <Button asChild variant="secondary" className="justify-start">
                <a href="https://cal.com/" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Schedule Call
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card id="support">
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-medium">Welcome Cohort Kickoff</div>
                <div className="text-sm text-muted-foreground">Starts next week. Read more in Discord.</div>
              </div>
              <div>
                <div className="font-medium">New Resources</div>
                <div className="text-sm text-muted-foreground">Added tutorials and datasets to the guide.</div>
              </div>
              <a
                className="inline-flex items-center text-sm text-primary underline-offset-4 hover:underline"
                href="https://discord.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
