"use client"

import { UserPlus, BookOpen, Rocket, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up & Choose Track",
    description: "Create your account and select from Data Professional or Full Stack Development tracks.",
    bgColor: "bg-blue-900"
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Learn & Practice",
    description: "Access cloud IDE, follow structured curriculum, and build real-world projects.",
    bgColor: "bg-blue-800"
  },
  {
    icon: Rocket,
    step: "03",
    title: "Build & Get Certified",
    description: "Complete projects, earn certificates, and launch your tech career with confidence.",
    bgColor: "bg-blue-900"
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            How It{" "}
            <span className="text-blue-900 dark:text-blue-400">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Start your learning journey in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-700" />

          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-900 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-900 dark:border-blue-400 flex items-center justify-center font-bold text-blue-900 dark:text-blue-400 shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${step.bgColor} flex items-center justify-center mb-6 mx-auto relative z-10`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-center text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 -right-4 z-20">
                    <ArrowRight className="h-8 w-8 text-blue-900 dark:text-blue-400" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
