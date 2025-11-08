"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Code2, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-700">
              <Sparkles className="h-4 w-4 text-blue-900" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Cloud-Based Learning Platform</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                Learn.{" "}
                <span className="text-blue-900 dark:text-blue-400">
                  Code.
                </span>{" "}
                Build.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl">
                Master in-demand tech skills with our cloud-based IDE, structured curriculum, and expert mentorship. Start coding in minutes, not hours.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-blue-900 hover:bg-blue-800 text-white text-lg h-14 px-8 w-full sm:w-auto"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 w-full sm:w-auto"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-blue-900 dark:text-blue-400">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900 dark:text-blue-400">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-900 dark:text-blue-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px]">
              {/* Code Editor Mockup */}
              <div className="absolute inset-0 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                {/* Editor Header */}
                <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-4 text-sm text-gray-400">workspace.tsx</div>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-blue-400">import <span className="text-blue-300">React</span> from <span className="text-green-400">'react'</span></div>
                  <div className="text-blue-400">import <span className="text-blue-300">{'{ useState }'}</span> from <span className="text-green-400">'react'</span></div>
                  <div className="h-4" />
                  <div className="text-blue-400">function <span className="text-yellow-400">LearnWithApraNova</span>() {'{'}</div>
                  <div className="pl-4 text-gray-400">const [<span className="text-blue-300">skills</span>, <span className="text-blue-300">setSkills</span>] = <span className="text-blue-400">useState</span>([<span className="text-green-400">'coding'</span>])</div>
                  <div className="pl-4 text-gray-400">const [<span className="text-blue-300">career</span>, <span className="text-blue-300">setCareer</span>] = <span className="text-blue-400">useState</span>(<span className="text-green-400">'ready'</span>)</div>
                  <div className="h-4" />
                  <div className="pl-4 text-blue-400">return</div>
                  <div className="pl-8 text-gray-400">{'<'}div className=<span className="text-green-400">"success"</span>{'>'}</div>
                  <div className="pl-12 text-gray-400">🚀 Start Your Journey</div>
                  <div className="pl-8 text-gray-400">{'</'}div{'>'}</div>
                  <div className="text-blue-400">{'}'}</div>

                  {/* Animated Cursor */}
                  <div className="inline-block w-2 h-5 bg-blue-500 animate-pulse" />
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 -right-4 bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg animate-bounce">
                  ✓ Code Compiled
                </div>
                <div className="absolute bottom-32 -left-4 bg-blue-900 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg animate-pulse">
                  💡 AI Assistant
                </div>
              </div>

              {/* Decorative Elements */}
              <Code2 className="absolute -top-8 -right-8 h-16 w-16 text-gray-400/20" />
              <Code2 className="absolute -bottom-8 -left-8 h-20 w-20 text-gray-400/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
