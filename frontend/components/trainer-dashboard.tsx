"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Inbox,
  CheckCircle,
  BarChart3,
  Calendar,
  ExternalLink,
  Download,
  Clock,
  Home,
  ListChecks,
  GraduationCap,
  FolderOpen,
} from "lucide-react"
import { TrainerHeader } from "@/components/trainer/TrainerHeader"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  Eye,
  MessageSquare,
  Monitor,
  Mail,
  Search,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  InboxIcon,
  Check,
  Clock3,
  Circle,
} from "lucide-react"

// Mock data
const mockStudents = [
  { id: "s1", name: "John Doe", track: "DP", progress: 88, status: "Active" },
  { id: "s2", name: "Sarah Lee", track: "FSD", progress: 76, status: "Active" },
  { id: "s3", name: "Mike Chen", track: "DP", progress: 42, status: "Inactive" },
  { id: "s4", name: "Priya Singh", track: "FSD", progress: 63, status: "Active" },
  { id: "s5", name: "Arjun Kumar", track: "DP", progress: 95, status: "Active" },
]

const recentActivity = [
  { id: "a1", icon: "submit", text: "John Doe submitted Project 1", time: "30 min ago" },
  { id: "a2", icon: "approve", text: "You approved Sarah's Project 1", time: "2 hours ago" },
  { id: "a3", icon: "changes", text: "Mike resubmitted with changes", time: "5 hours ago" },
  { id: "a4", icon: "launch", text: "Priya launched workspace", time: "Yesterday" },
  { id: "a5", icon: "commit", text: "Arjun pushed 3 commits", time: "2 days ago" },
]

const officeHours = [
  {
    id: "oh1",
    date: "Oct 15, 2025",
    time: "4:00 PM",
    duration: "60 min",
    slots: "3/8 booked",
    linkText: "Zoom",
    linkUrl: "https://zoom.us",
  },
  {
    id: "oh2",
    date: "Oct 18, 2025",
    time: "11:30 AM",
    duration: "45 min",
    slots: "8/10 booked",
    linkText: "Discord",
    linkUrl: "https://discord.com",
  },
]

// Helpers
function progressColor(val: number) {
  if (val > 80) return "var(--chart-2)"
  if (val >= 50) return "var(--chart-3)"
  return "var(--chart-5)"
}

// Header tab and sidebar types
type Tab = "dashboard" | "students" | "submissions" | "schedule"

export default function TrainerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")

  const progressData = useMemo(
    () =>
      mockStudents.map((s) => ({
        name: s.name,
        progress: s.progress,
        color: progressColor(s.progress),
      })),
    [],
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <TrainerHeader 
        activeTab={activeTab} 
        onTabChange={(tab) => setActiveTab(tab as Tab)}
        trainerName="Priya Singh"
      />

      {/* Shell */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-6 py-6 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-lg border bg-card p-3">
          <SidebarItem
            icon={<Home className="size-4" />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarItem
            icon={<Users className="size-4" />}
            label="My Students"
            active={activeTab === "students"}
            onClick={() => setActiveTab("students")}
          />
          <SidebarItem
            icon={<ListChecks className="size-4" />}
            label="Submission Queue"
            active={activeTab === "submissions"}
            onClick={() => setActiveTab("submissions")}
          />
          <SidebarItem
            icon={<Calendar className="size-4" />}
            label="Office Hours"
            active={activeTab === "schedule"}
            onClick={() => setActiveTab("schedule")}
          />
          <SidebarItem
            icon={<FolderOpen className="size-4" />}
            label="Resources"
            onClick={() => window.open("https://docs.apranova.com", "_blank", "noopener,noreferrer")}
          />
        </aside>

        {/* Main */}
        <section className="space-y-6">
          {activeTab === "dashboard" ? (
            <DashboardHome progressData={progressData} />
          ) : activeTab === "students" ? (
            <StudentsTab />
          ) : activeTab === "submissions" ? (
            <SubmissionsTab />
          ) : (
            <ScheduleTab />
          )}
        </section>
      </div>
    </div>
  )
}

/* UI Pieces */

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
        active ? "bg-primary/10 text-primary" : "hover:bg-muted",
      )}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  tone = "default",
  pulse = false,
}: {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  tone?: "default" | "warning" | "success"
  pulse?: boolean
}) {
  const toneClass =
    tone === "warning"
      ? "border-orange-300 bg-orange-50 text-orange-900"
      : tone === "success"
        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
        : "bg-card"
  return (
    <Card className={cn("overflow-hidden", pulse && "animate-pulse", tone !== "default" && "border", toneClass)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-3xl font-bold">{value}</div>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </CardContent>
    </Card>
  )
}

function DashboardHome({ progressData }: { progressData: Array<{ name: string; progress: number; color: string }> }) {
  // derived counts
  const totalStudents = mockStudents.length
  const pendingSubmissions = 5
  const reviewedToday = 3
  const avgProgress =
    Math.round((mockStudents.reduce((acc, s) => acc + s.progress, 0) / Math.max(1, mockStudents.length)) * 100) / 100

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={String(totalStudents)}
          subtitle="Assigned students"
          icon={<Users className="size-4 text-muted-foreground" />}
        />
        <StatCard
          title="Pending Submissions"
          value={String(pendingSubmissions)}
          subtitle="Awaiting review"
          icon={<Inbox className="size-4 text-orange-500" />}
          tone="warning"
          pulse={pendingSubmissions > 0}
        />
        <StatCard
          title="Reviewed Today"
          value={String(reviewedToday)}
          subtitle="Completed reviews"
          icon={<CheckCircle className="size-4 text-emerald-600" />}
          tone="success"
        />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <BarChart3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold">{avgProgress}%</div>
            <div className="h-2 w-full overflow-hidden rounded bg-muted">
              <div
                className="h-2 rounded bg-primary"
                style={{ width: `${avgProgress}%`, transition: "width 300ms ease" }}
                aria-label={`Average Progress ${avgProgress}%`}
              />
            </div>
            <p className="text-sm text-muted-foreground">Across all students</p>
          </CardContent>
        </Card>
      </div>

      {/* Two-column row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Work faster with shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant="secondary" onClick={() => ((window.location.hash = "#"), window.scrollTo(0, 0))}>
              📝 Review Submissions
            </Button>
            <Button variant="secondary" onClick={() => ((window.location.hash = "#students"), window.scrollTo(0, 0))}>
              👥 View All Students
            </Button>
            <Button variant="secondary" onClick={() => ((window.location.hash = "#schedule"), window.scrollTo(0, 0))}>
              📅 Schedule Office Hours
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.open("https://discord.com", "_blank", "noopener,noreferrer")}
            >
              💬 Join Discord Channel <ExternalLink className="ml-2 size-4" />
            </Button>
            <Button variant="secondary" onClick={() => alert("Reports downloaded (mock)")}>
              📊 Download Reports <Download className="ml-2 size-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your cohort</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivity.map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex size-6 items-center justify-center rounded-full bg-muted">
                    {a.icon === "submit" ? "📤" : a.icon === "approve" ? "✅" : a.icon === "changes" ? "⚠" : "📝"}
                  </span>
                  <div>
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Student Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Student Progress Overview</CardTitle>
          <CardDescription>Progress by student (click to view)</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={progressData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip formatter={(val: any) => `${val}%`} />
                <Bar dataKey="progress" isAnimationActive={false} radius={[0, 4, 4, 0]}>
                  {progressData.map((d, idx) => (
                    <Cell key={idx} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="size-3 rounded-sm" style={{ background: "var(--chart-2)" }} /> 80%+
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-3 rounded-sm" style={{ background: "var(--chart-3)" }} /> 50–80%
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-3 rounded-sm" style={{ background: "var(--chart-5)" }} /> under 50%
            </span>
            <Separator orientation="vertical" className="mx-1 h-4" />
            <Link href="#" className="text-primary hover:underline">
              View all students
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Office Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Office Hours</CardTitle>
          <CardDescription>Join or edit upcoming time slots</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {officeHours.map((oh) => (
            <div key={oh.id} className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                <Clock className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {oh.date} • {oh.time} • {oh.duration}
                  </p>
                  <p className="text-xs text-muted-foreground">Booked: {oh.slots}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(oh.linkUrl, "_blank", "noopener,noreferrer")}
                >
                  {oh.linkText} <ExternalLink className="ml-2 size-3" />
                </Button>
                <Button size="sm" variant="secondary">
                  Edit
                </Button>
              </div>
            </div>
          ))}
          <Button size="sm" className="mt-2">
            ➕ Add Office Hours
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        This is a placeholder. Connect real data and interactions in the next phase.
      </CardContent>
    </Card>
  )
}

function StudentsTab() {
  type StudentRow = {
    id: string
    name: string
    email: string
    avatar?: string
    track: "DP" | "FSD"
    batch: "Batch 1" | "Batch 2"
    progress: number
    currentProject: string
    checkpoints: { completed: number; total: number }
    lastActive: { label: string; online?: boolean }
    status: "Active" | "Inactive" | "Blocked"
    joined: string
    timeline: Array<{
      id: string
      name: string
      state: "completed" | "in-progress" | "pending"
      completedAt?: string
      timeTaken?: string
    }>
    submissions: Array<{
      id: string
      project: string
      submitted: string
      status: "Pending Review" | "Approved" | "Changes Requested"
      reviewer?: string
      feedbackUrl?: string
    }>
    activity: Array<{ id: string; text: string; at: string }>
    comms: Array<{ id: string; type: "message" | "call" | "feedback"; text: string; at: string }>
  }

  const data: StudentRow[] = [
    {
      id: "s1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder-user.jpg",
      track: "DP",
      batch: "Batch 1",
      progress: 88,
      currentProject: "Project 2",
      checkpoints: { completed: 4, total: 5 },
      lastActive: { label: "Online now", online: true },
      status: "Active",
      joined: "Aug 10, 2025",
      timeline: [
        { id: "t1", name: "Project 1", state: "completed", completedAt: "Sep 2, 2025", timeTaken: "6 days" },
        { id: "t2", name: "Checkpoint 1", state: "completed", completedAt: "Sep 5, 2025", timeTaken: "2 days" },
        { id: "t3", name: "Checkpoint 2", state: "in-progress" },
        { id: "t4", name: "Project 2", state: "pending" },
      ],
      submissions: [
        {
          id: "sub1",
          project: "Project 1 - Data Analysis",
          submitted: "Oct 10, 2025 2:30 PM",
          status: "Approved",
          reviewer: "Priya",
          feedbackUrl: "#",
        },
      ],
      activity: [
        { id: "a1", text: "Submitted Project 1", at: "2 days ago" },
        { id: "a2", text: "Viewed feedback", at: "2 days ago" },
        { id: "a3", text: "Pushed 3 commits", at: "1 day ago" },
      ],
      comms: [
        { id: "c1", type: "feedback", text: "Trainer approved submission", at: "2 days ago" },
        { id: "c2", type: "message", text: "Asked about next steps", at: "1 day ago" },
      ],
    },
    {
      id: "s2",
      name: "Sarah Lee",
      email: "sarah@example.com",
      track: "FSD",
      batch: "Batch 1",
      progress: 76,
      currentProject: "Project 1",
      checkpoints: { completed: 3, total: 5 },
      lastActive: { label: "2 hours ago" },
      status: "Active",
      joined: "Aug 12, 2025",
      timeline: [
        { id: "t1", name: "Project 1", state: "in-progress" },
        { id: "t2", name: "Checkpoint 1", state: "completed", completedAt: "Oct 1, 2025", timeTaken: "3 days" },
      ],
      submissions: [
        {
          id: "sub2",
          project: "Project 1 - React Foundations",
          submitted: "Oct 9, 2025 4:10 PM",
          status: "Changes Requested",
          reviewer: "Priya",
          feedbackUrl: "#",
        },
      ],
      activity: [{ id: "a1", text: "Started Project 1", at: "3 days ago" }],
      comms: [{ id: "c1", type: "message", text: "Trainer sent checklist", at: "3 days ago" }],
    },
    {
      id: "s3",
      name: "Mike Chen",
      email: "mike@example.com",
      track: "DP",
      batch: "Batch 2",
      progress: 42,
      currentProject: "Project 1",
      checkpoints: { completed: 2, total: 5 },
      lastActive: { label: "5 hours ago" },
      status: "Inactive",
      joined: "Aug 20, 2025",
      timeline: [
        { id: "t1", name: "Project 1", state: "in-progress" },
        { id: "t2", name: "Checkpoint 1", state: "pending" },
      ],
      submissions: [],
      activity: [{ id: "a1", text: "No recent activity", at: "—" }],
      comms: [],
    },
    {
      id: "s4",
      name: "Priya Singh",
      email: "priya@example.com",
      track: "FSD",
      batch: "Batch 2",
      progress: 63,
      currentProject: "Project 1",
      checkpoints: { completed: 3, total: 5 },
      lastActive: { label: "Yesterday" },
      status: "Active",
      joined: "Aug 25, 2025",
      timeline: [{ id: "t1", name: "Project 1", state: "in-progress" }],
      submissions: [],
      activity: [{ id: "a1", text: "Viewed project guide", at: "1 day ago" }],
      comms: [],
    },
    {
      id: "s5",
      name: "Arjun Kumar",
      email: "arjun@example.com",
      track: "DP",
      batch: "Batch 1",
      progress: 95,
      currentProject: "Project 3",
      checkpoints: { completed: 5, total: 5 },
      lastActive: { label: "2 days ago" },
      status: "Active",
      joined: "Aug 8, 2025",
      timeline: [
        { id: "t1", name: "Project 1", state: "completed", completedAt: "Sep 1, 2025", timeTaken: "5 days" },
        { id: "t2", name: "Project 2", state: "completed", completedAt: "Sep 20, 2025", timeTaken: "7 days" },
        { id: "t3", name: "Project 3", state: "in-progress" },
      ],
      submissions: [
        {
          id: "sub3",
          project: "Project 2 - ML Model",
          submitted: "Oct 1, 2025 10:22 AM",
          status: "Approved",
          reviewer: "Priya",
          feedbackUrl: "#",
        },
      ],
      activity: [{ id: "a1", text: "Pushed 6 commits", at: "2 days ago" }],
      comms: [{ id: "c1", type: "call", text: "Office hours with trainer", at: "1 week ago" }],
    },
  ]

  const [search, setSearch] = useState("")
  const [batch, setBatch] = useState<"All" | "Batch 1" | "Batch 2">("All")
  const [track, setTrack] = useState<"All" | "DP" | "FSD">("All")
  const [status, setStatus] = useState<"All" | "Active" | "Inactive">("All")
  const [sort, setSort] = useState<"ProgressHL" | "ProgressLH" | "NameAZ" | "LastActive">("ProgressHL")
  const [page, setPage] = useState(1)
  const pageSize = 5

  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selected, setSelected] = useState<StudentRow | null>(null)

  function openDetails(s: StudentRow) {
    setSelected(s)
    setDetailsOpen(true)
  }

  const filtered = data
    .filter((s) => (batch === "All" ? true : s.batch === batch))
    .filter((s) => (track === "All" ? true : s.track === track))
    .filter((s) => (status === "All" ? true : s.status === status))
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase().trim()))

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "ProgressHL":
        return b.progress - a.progress
      case "ProgressLH":
        return a.progress - b.progress
      case "NameAZ":
        return a.name.localeCompare(b.name)
      case "LastActive":
        // simple heuristic: "Online now" first, else by string
        const aScore = a.lastActive.online ? 0 : 1
        const bScore = b.lastActive.online ? 0 : 1
        if (aScore !== bScore) return aScore - bScore
        return a.lastActive.label.localeCompare(b.lastActive.label)
      default:
        return 0
    }
  })

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize)

  function progBarColor(p: number) {
    if (p > 80) return "var(--chart-2)"
    if (p >= 50) return "var(--chart-3)"
    return "var(--chart-5)"
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="space-y-3">
          <CardTitle>Students</CardTitle>
          <CardDescription>Manage your cohort: filter by batch, track, and status</CardDescription>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => {
                  setPage(1)
                  setSearch(e.target.value)
                }}
                placeholder="Search by name..."
                className="pl-8"
              />
            </div>
            <Select
              value={batch}
              onValueChange={(v) => {
                setPage(1)
                setBatch(v as any)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Batches</SelectItem>
                <SelectItem value="Batch 1">Batch 1</SelectItem>
                <SelectItem value="Batch 2">Batch 2</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={track}
              onValueChange={(v) => {
                setPage(1)
                setTrack(v as any)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Tracks</SelectItem>
                <SelectItem value="DP">DP</SelectItem>
                <SelectItem value="FSD">FSD</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={status}
              onValueChange={(v) => {
                setPage(1)
                setStatus(v as any)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ProgressHL">Progress High → Low</SelectItem>
                <SelectItem value="ProgressLH">Progress Low → High</SelectItem>
                <SelectItem value="NameAZ">Name A → Z</SelectItem>
                <SelectItem value="LastActive">Last Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Current Project</TableHead>
                  <TableHead>Checkpoints</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-40">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.map((s) => (
                  <TableRow key={s.id} className="hover:bg-muted/50">
                    <TableCell>
                      <button
                        className="flex items-center gap-3 hover:underline"
                        onClick={() => openDetails(s)}
                        aria-label={`Open details for ${s.name}`}
                      >
                        <Avatar className="size-8">
                          <AvatarImage src={s.avatar || "/placeholder-user.jpg"} alt={`${s.name} avatar`} />
                          <AvatarFallback>{s.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{s.name}</span>
                          <span className="text-xs text-muted-foreground">{s.email}</span>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{s.track}</Badge>
                    </TableCell>
                    <TableCell className="min-w-40">
                      <div className="text-sm font-medium">{s.progress}%</div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded bg-muted">
                        <div
                          className="h-2 rounded"
                          style={{ width: `${s.progress}%`, background: progBarColor(s.progress) }}
                          aria-label={`Progress ${s.progress}%`}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{s.currentProject}</TableCell>
                    <TableCell className="text-sm">
                      {s.checkpoints.completed}/{s.checkpoints.total} completed
                    </TableCell>
                    <TableCell className="text-sm">
                      {s.lastActive.online ? (
                        <span className="inline-flex items-center gap-1">
                          <span className="size-2 animate-pulse rounded-full bg-emerald-500" aria-hidden /> Online now
                        </span>
                      ) : (
                        s.lastActive.label
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "border",
                          s.status === "Active"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : s.status === "Inactive"
                              ? "border-gray-200 bg-gray-50 text-gray-700"
                              : "border-red-200 bg-red-50 text-red-800",
                        )}
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => openDetails(s)} aria-label="View Details">
                          <Eye className="mr-2 size-4" /> Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`mailto:${s.email}`, "_blank", "noopener")}
                          aria-label="Send Message"
                        >
                          <MessageSquare className="mr-2 size-4" /> Message
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open("https://codesandbox.io", "_blank", "noopener")}
                          aria-label="View Workspace"
                        >
                          <Monitor className="mr-2 size-4" /> Workspace
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {pageData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="flex items-center justify-center gap-3 py-10 text-sm text-muted-foreground">
                        <InboxIcon className="size-5" />
                        No students found for current filters.
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between border-t px-4 py-3">
            <div className="text-xs text-muted-foreground">
              Page {page} of {pageCount}
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="mr-1 size-4" />
                Prev
              </Button>
              {Array.from({ length: pageCount }).map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={page === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
              >
                Next
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>Profile, timeline, and history</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage src={selected.avatar || "/placeholder-user.jpg"} alt={`${selected.name} avatar`} />
                    <AvatarFallback>{selected.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-semibold">{selected.name}</div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <button
                        className="inline-flex items-center gap-1 hover:underline"
                        onClick={() => window.open(`mailto:${selected.email}`, "_blank", "noopener")}
                      >
                        <Mail className="size-4" /> {selected.email}
                      </button>
                      <Badge variant="outline">{selected.track}</Badge>
                      <span className="text-xs">•</span>
                      <span className="text-sm">{selected.batch}</span>
                      <Badge
                        className={cn(
                          "ml-2 border",
                          selected.status === "Active"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : selected.status === "Inactive"
                              ? "border-gray-200 bg-gray-50 text-gray-700"
                              : "border-red-200 bg-red-50 text-red-800",
                        )}
                      >
                        {selected.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Joined {selected.joined} • Last active {selected.lastActive.label}
                    </div>
                  </div>
                </div>
                <div className="min-w-48">
                  <div className="text-sm font-medium">Progress {selected.progress}%</div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded bg-muted">
                    <div
                      className="h-2 rounded"
                      style={{ width: `${selected.progress}%`, background: progBarColor(selected.progress) }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Progress Timeline</CardTitle>
                    <CardDescription>Checkpoints and projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {selected.timeline.map((t) => (
                        <li key={t.id} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-muted">
                            {t.state === "completed" ? (
                              <Check className="size-3 text-emerald-600" />
                            ) : t.state === "in-progress" ? (
                              <Clock3 className="size-3 text-orange-500" />
                            ) : (
                              <Circle className="size-3 text-muted-foreground" />
                            )}
                          </span>
                          <div>
                            <div className="font-medium">{t.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {t.state === "completed"
                                ? `Completed ${t.completedAt} • Time taken ${t.timeTaken}`
                                : t.state === "in-progress"
                                  ? "In progress"
                                  : "Pending"}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Submission History</CardTitle>
                    <CardDescription>Projects and statuses</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Reviewer</TableHead>
                          <TableHead>Feedback</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selected.submissions.length ? (
                          selected.submissions.map((sub) => (
                            <TableRow key={sub.id}>
                              <TableCell className="text-sm">{sub.project}</TableCell>
                              <TableCell className="text-sm">{sub.submitted}</TableCell>
                              <TableCell>
                                <Badge
                                  className={cn(
                                    "border",
                                    sub.status === "Approved"
                                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                      : sub.status === "Pending Review"
                                        ? "border-orange-200 bg-orange-50 text-orange-800"
                                        : "border-yellow-200 bg-yellow-50 text-yellow-800",
                                  )}
                                >
                                  {sub.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm">{sub.reviewer ?? "—"}</TableCell>
                              <TableCell className="text-sm">
                                {sub.feedbackUrl ? (
                                  <Link href={sub.feedbackUrl} className="text-primary hover:underline">
                                    View Feedback
                                  </Link>
                                ) : (
                                  "—"
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                              No submissions yet.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Activity Log</CardTitle>
                    <CardDescription>Last 10 activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {selected.activity.map((a) => (
                        <li key={a.id} className="flex items-center justify-between">
                          <span>{a.text}</span>
                          <span className="text-xs text-muted-foreground">{a.at}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Communication History</CardTitle>
                    <CardDescription>Messages, calls, and feedback</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {selected.comms.map((c) => (
                        <li key={c.id} className="flex items-center justify-between">
                          <span className="capitalize">{c.type}</span>
                          <span>{c.text}</span>
                          <span className="text-xs text-muted-foreground">{c.at}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <Button variant="outline" onClick={() => window.open(`mailto:${selected.email}`, "_blank", "noopener")}>
                  Send Message
                </Button>
                <Button variant="outline">View Latest Submission</Button>
                <Button variant="outline">Schedule Call</Button>
                <Button onClick={() => setDetailsOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SubmissionsTab() {
  type SubStatus = "Pending Review" | "Approved" | "Changes Requested"
  type Sub = {
    id: string
    student: string
    track: "DP" | "FSD"
    avatar?: string
    project: string
    submittedAt: string // e.g., "Oct 10 2025 2:30 PM"
    relative: string // e.g., "2 days ago"
    attempt: 1 | 2
    status: SubStatus
    repoUrl: string
    reviewer?: string
  }

  const subs: Sub[] = [
    {
      id: "r1",
      student: "John Doe",
      track: "DP",
      project: "Project 1 - Data Analysis",
      submittedAt: "Oct 10 2025 2:30 PM",
      relative: "2 days ago",
      attempt: 1,
      status: "Pending Review",
      repoUrl: "https://github.com/john/project1",
    },
    {
      id: "r2",
      student: "Sarah Lee",
      track: "FSD",
      project: "Project 1 - React Foundations",
      submittedAt: "Oct 11 2025 9:12 AM",
      relative: "1 day ago",
      attempt: 2,
      status: "Pending Review",
      repoUrl: "https://github.com/sarah/react-p1",
    },
    {
      id: "r3",
      student: "Arjun Kumar",
      track: "DP",
      project: "Project 2 - ML Model",
      submittedAt: "Oct 08 2025 3:00 PM",
      relative: "3 days ago",
      attempt: 1,
      status: "Approved",
      repoUrl: "https://github.com/arjun/ml-model",
      reviewer: "Priya",
    },
    {
      id: "r4",
      student: "Mike Chen",
      track: "DP",
      project: "Project 1 - Data Analysis",
      submittedAt: "Oct 09 2025 6:40 PM",
      relative: "2 days ago",
      attempt: 1,
      status: "Changes Requested",
      repoUrl: "https://github.com/mike/data-analysis",
      reviewer: "Priya",
    },
    {
      id: "r5",
      student: "Priya Singh",
      track: "FSD",
      project: "Project 1 - React Foundations",
      submittedAt: "Oct 07 2025 5:05 PM",
      relative: "4 days ago",
      attempt: 1,
      status: "Approved",
      repoUrl: "https://github.com/priya/react-foundations",
      reviewer: "Priya",
    },
  ]

  type StatusTab = "Pending" | "Reviewed" | "All"
  const [tab, setTab] = useState<StatusTab>("Pending")
  const [project, setProject] = useState<"All" | "Project 1" | "Project 2" | "Project 3">("All")
  const [track, setTrack] = useState<"All" | "DP" | "FSD">("All")
  const [sort, setSort] = useState<"Newest" | "Oldest" | "NameAZ">("Newest")
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 5
  const [reviewOpen, setReviewOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function filteredList() {
    let list = subs
    if (tab === "Pending") list = list.filter((s) => s.status === "Pending Review")
    else if (tab === "Reviewed") list = list.filter((s) => s.status !== "Pending Review")
    if (project !== "All") list = list.filter((s) => s.project.startsWith(project))
    if (track !== "All") list = list.filter((s) => s.track === track)
    if (sort === "Newest")
      list = [...list].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    if (sort === "Oldest")
      list = [...list].sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime())
    if (sort === "NameAZ") list = [...list].sort((a, b) => a.student.localeCompare(b.student))
    return list
  }

  const list = filteredList()
  const pageCount = Math.max(1, Math.ceil(list.length / pageSize))
  const pageData = list.slice((page - 1) * pageSize, page * pageSize)
  const pendingCount = subs.filter((s) => s.status === "Pending Review").length

  function AttemptBadge({ n }: { n: 1 | 2 }) {
    return (
      <Badge
        className={cn(
          "border",
          n === 1 ? "border-blue-200 bg-blue-50 text-blue-800" : "border-orange-200 bg-orange-50 text-orange-800",
        )}
      >
        {n === 1 ? "1st Attempt" : "2nd Attempt"}
      </Badge>
    )
  }

  function StatusBadge({ s }: { s: SubStatus }) {
    const cls =
      s === "Pending Review"
        ? "border-orange-200 bg-orange-50 text-orange-800"
        : s === "Approved"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-yellow-200 bg-yellow-50 text-yellow-800"
    const icon = s === "Pending Review" ? "⏳" : s === "Approved" ? "✅" : "⚠️"
    return (
      <Badge className={cn("border", cls)}>
        <span className="mr-1">{icon}</span> {s}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Submission Queue</CardTitle>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                <RefreshCcw className="mr-2 size-4" />
                Refresh
              </Button>
              <div className="flex items-center gap-2 text-sm">
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} id="auto-refresh" />
                <label htmlFor="auto-refresh" className="text-muted-foreground">
                  Auto-refresh
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={tab === "Pending" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setPage(1)
                setTab("Pending")
              }}
            >
              Pending
              <span className={cn("ml-2 rounded-md px-1.5 py-0.5 text-xs", "bg-orange-100 text-orange-800")}>
                {pendingCount}
              </span>
            </Button>
            <Button
              variant={tab === "Reviewed" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setPage(1)
                setTab("Reviewed")
              }}
            >
              Reviewed
            </Button>
            <Button
              variant={tab === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setPage(1)
                setTab("All")
              }}
            >
              All
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Select
              value={project}
              onValueChange={(v) => {
                setPage(1)
                setProject(v as any)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Projects</SelectItem>
                <SelectItem value="Project 1">Project 1</SelectItem>
                <SelectItem value="Project 2">Project 2</SelectItem>
                <SelectItem value="Project 3">Project 3</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={track}
              onValueChange={(v) => {
                setPage(1)
                setTrack(v as any)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Tracks</SelectItem>
                <SelectItem value="DP">DP</SelectItem>
                <SelectItem value="FSD">FSD</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Newest">Newest First</SelectItem>
                <SelectItem value="Oldest">Oldest First</SelectItem>
                <SelectItem value="NameAZ">Student Name A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {pageData.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <InboxIcon className="size-10 text-muted-foreground" />
              <div className="text-sm font-medium">No pending submissions</div>
              <div className="text-sm text-muted-foreground">Great! You're all caught up.</div>
              <button
                className="text-sm text-primary underline-offset-4 hover:underline"
                onClick={() => setTab("Reviewed")}
              >
                View reviewed submissions
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Submitted At</TableHead>
                    <TableHead>Attempt</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Repo</TableHead>
                    <TableHead className="w-40">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageData.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarImage src="/placeholder-user.jpg" alt={`${s.student} avatar`} />
                            <AvatarFallback>{s.student.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{s.student}</span>
                            <Badge variant="outline" className="w-fit text-xs">
                              {s.track}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{s.project}</TableCell>
                      <TableCell className="text-sm">
                        <div>{s.submittedAt}</div>
                        <div className="text-xs text-muted-foreground">{s.relative}</div>
                      </TableCell>
                      <TableCell>
                        <AttemptBadge n={s.attempt} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge s={s.status} />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(s.repoUrl, "_blank", "noopener,noreferrer")}
                        >
                          View Repo <ExternalLink className="ml-2 size-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        {s.status === "Pending Review" ? (
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedId(s.id)
                              setReviewOpen(true)
                            }}
                          >
                            Review
                          </Button>
                        ) : (
                          <button className="text-sm text-primary underline-offset-4 hover:underline">
                            View Feedback
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex items-center justify-between border-t px-4 py-3">
            <div className="text-xs text-muted-foreground">
              Page {page} of {pageCount}
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="mr-1 size-4" />
                Prev
              </Button>
              {Array.from({ length: pageCount }).map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={page === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
              >
                Next
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback Panel (Coming Soon)</DialogTitle>
            <DialogDescription>Review workflow will open here for submission ID: {selectedId || "—"}</DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">This is a placeholder for the future Feedback Panel page.</div>
          <div className="flex justify-end">
            <Button onClick={() => setReviewOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ScheduleTab() {
  type OH = {
    id: string
    dateLabel: string // "Oct 15, 2025 2:00 PM - 3:00 PM"
    duration: string
    booked: string // "8/10"
    linkText: "Zoom" | "Discord"
    linkUrl: string
  }

  const [items, setItems] = useState<OH[]>([
    {
      id: "oh1",
      dateLabel: "Oct 15, 2025 2:00 PM - 3:00 PM",
      duration: "60 min",
      booked: "8/10",
      linkText: "Zoom",
      linkUrl: "https://zoom.us",
    },
    {
      id: "oh2",
      dateLabel: "Oct 18, 2025 11:00 AM - 12:00 PM",
      duration: "60 min",
      booked: "5/10",
      linkText: "Discord",
      linkUrl: "https://discord.com",
    },
  ])

  function addSlot() {
    const n = items.length + 1
    setItems((prev) => [
      ...prev,
      {
        id: `oh${n}`,
        dateLabel: "Oct 20, 2025 5:00 PM - 6:00 PM",
        duration: "60 min",
        booked: "0/10",
        linkText: "Zoom",
        linkUrl: "https://zoom.us",
      },
    ])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Office Hours</CardTitle>
        <CardDescription>Upcoming availability for students to book</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((oh) => (
          <div
            key={oh.id}
            className="flex flex-col gap-2 rounded-md border p-3 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-3">
              <Clock className="mt-1 size-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{oh.dateLabel}</div>
                <div className="text-xs text-muted-foreground">
                  Duration {oh.duration} • Booked {oh.booked}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(oh.linkUrl, "_blank", "noopener,noreferrer")}
              >
                {oh.linkText} <ExternalLink className="ml-2 size-3" />
              </Button>
              <Button size="sm" variant="secondary" onClick={() => alert("Edit office hours (mock)")}>
                Edit
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <Button size="sm" onClick={addSlot}>
            ➕ Add Office Hours
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
