"use client"

import { Check, Heart, TrendingUp, AlertTriangle, History } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const benefits = [
  {
    icon: Heart,
    title: "Make Smarter Food Choices",
    description: "Understand exactly what you're eating with detailed nutritional breakdowns and health scores.",
    stats: "87% of users report better food choices",
  },
  {
    icon: TrendingUp,
    title: "Monitor Key Nutrients",
    description: "Track calories, sugar, sodium, and fats across all your meals to stay within healthy limits.",
    stats: "Track 20+ nutritional values",
  },
  {
    icon: AlertTriangle,
    title: "Get Dietary Alerts",
    description: "Receive instant notifications when foods exceed recommended limits for your health goals.",
    stats: "Real-time health warnings",
  },
  {
    icon: History,
    title: "Track Nutrition Trends",
    description: "View your nutrition history over time and identify patterns to improve your diet.",
    stats: "Weekly & monthly insights",
  },
]

export function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="benefits" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={isVisible ? "animate-slide-in-left" : "opacity-0"}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Heart className="h-4 w-4" />
              <span>Why NutriScan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Take control of</span>
              <br />
              <span className="gradient-text">your nutrition</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Join thousands of health-conscious individuals who use NutriScan to make informed decisions about their food and improve their overall wellbeing.
            </p>

            {/* Checklist */}
            <ul className="space-y-4">
              {[
                "Instant AI-powered analysis",
                "Personalized health recommendations",
                "Track unlimited products",
                "Export detailed reports",
              ].map((item, index) => (
                <li
                  key={item}
                  className={`flex items-center gap-3 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Benefit Cards */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon

              return (
                <div
                  key={benefit.title}
                  className={`group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 ${
                    isVisible ? "animate-scale-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{benefit.description}</p>

                  {/* Stats */}
                  <div className="text-xs font-medium text-primary">{benefit.stats}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
