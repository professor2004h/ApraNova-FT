import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function ProjectGuidePage() {
  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        <Link href="/student/dashboard" className="underline-offset-4 hover:underline">
          Dashboard
        </Link>{" "}
        / Project Guide
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Project 1 Guide - Data Professional</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project 1: Data Analysis</CardTitle>
          <CardDescription>Analyze a dataset and present insights.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-muted px-2 py-1">⏱ 2 weeks</span>
            <span className="rounded bg-muted px-2 py-1">Beginner</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Video Walkthrough</CardTitle>
          <CardDescription>45 minutes overview of the project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted" aria-label="Video player">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Project tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            This walkthrough covers setup, data loading, cleaning, analysis, and visualization.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {[
              { id: "setup", t: "Setup & Configuration", d: "Install dependencies and configure your environment." },
              { id: "loading", t: "Data Loading", d: "Load datasets into your workspace and verify structure." },
              { id: "cleaning", t: "Data Cleaning", d: "Handle missing values and normalize fields." },
              { id: "analysis", t: "Analysis", d: "Compute metrics and derive insights." },
              { id: "viz", t: "Visualization", d: "Create clear charts to present findings." },
            ].map((sec) => (
              <AccordionItem key={sec.id} value={sec.id}>
                <AccordionTrigger>{sec.t}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{sec.d}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Starter Code & Resources</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Button>Download Starter Code (.zip)</Button>
          <Button variant="secondary" asChild>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="secondary" asChild>
            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
              Discord Community
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="https://cal.com/" target="_blank" rel="noopener noreferrer">
              Schedule Call
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="mailto:support@apranova.com">Email Support</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
