"use client"

import { Code2, BookOpen, TrendingUp, Users, Award, Rocket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Code2,
    title: "Cloud Workspace",
    description: "Access your VS Code IDE from anywhere. No setup required, start coding in seconds.",
    bgColor: "bg-blue-900"
  },
  {
    icon: BookOpen,
    title: "Structured Learning",
    description: "Project-based curriculum designed by industry experts. Learn by building real applications.",
    bgColor: "bg-blue-800"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Real-time analytics and feedback. Track your growth with detailed insights.",
    bgColor: "bg-blue-900"
  },
  {
    icon: Users,
    title: "Expert Mentors",
    description: "24/7 support from experienced developers. Get help when you need it most.",
    bgColor: "bg-blue-800"
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Industry-recognized certificates upon completion. Boost your resume and career.",
    bgColor: "bg-blue-900"
  },
  {
    icon: Rocket,
    title: "Career Support",
    description: "Job placement assistance and interview prep. Launch your tech career with confidence.",
    bgColor: "bg-blue-800"
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Everything You Need to{" "}
            <span className="text-blue-900 dark:text-blue-400">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Powerful features designed to accelerate your learning journey and career growth
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-800 hover:border-blue-900 dark:hover:border-blue-400"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
