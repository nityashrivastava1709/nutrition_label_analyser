"use client"

import { Camera, FileSearch, Activity, Brain, Bell, BarChart3 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Camera,
    title: "Image Upload & Detection",
    description: "Simply snap or upload a photo of any nutrition label. Our AI instantly detects and processes it.",
    gradient: "from-primary to-accent",
  },
  {
    icon: FileSearch,
    title: "OCR Nutrient Extraction",
    description: "Advanced optical character recognition extracts every nutrient value with 99% accuracy.",
    gradient: "from-chart-2 to-primary",
  },
  {
    icon: Activity,
    title: "AI Healthiness Score",
    description: "Get an instant 0-100 health score based on nutritional content and scientific guidelines.",
    gradient: "from-primary to-chart-2",
  },
  {
    icon: Brain,
    title: "Personalized Insights",
    description: "Receive tailored recommendations based on your health profile and dietary goals.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Bell,
    title: "Smart Nutrient Alerts",
    description: "Get notified when products exceed recommended limits for sodium, sugar, or fats.",
    gradient: "from-chart-4 to-chart-3",
  },
  {
    icon: BarChart3,
    title: "Weekly Reports",
    description: "Track your nutrition trends over time with comprehensive weekly health reports.",
    gradient: "from-chart-2 to-chart-5",
  },
]

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = sectionRef.current?.querySelectorAll("[data-index]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <Activity className="h-4 w-4" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Everything you need to</span>
            <br />
            <span className="gradient-text">understand your food</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our AI-powered platform combines cutting-edge technology with nutritional science to give you complete insights into what you eat.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={feature.title}
                data-index={index}
                className={`group relative p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 ${
                  isVisible ? "animate-fade-up opacity-100" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="relative w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
