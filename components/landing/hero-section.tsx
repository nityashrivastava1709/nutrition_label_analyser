"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Activity, Shield, Zap } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
  { value: "50K+", label: "Labels Analyzed" },
  { value: "99%", label: "Accuracy Rate" },
  { value: "2s", label: "Avg. Analysis Time" },
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${mounted ? "animate-slide-in-left" : "opacity-0"}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Nutrition Analysis</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="text-foreground">Know Your</span>
                <br />
                <span className="gradient-text">Food Better</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Instantly analyze nutrition labels with AI and discover how healthy your food really is. Make smarter choices, effortlessly.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group px-8"
                >
                  Analyze a Label
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-border hover:bg-secondary group"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`${mounted ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Demo Card */}
          <div className={`relative ${mounted ? "animate-slide-in-right" : "opacity-0"}`}>
            {/* Floating elements */}
            <div className="absolute -top-8 -left-8 p-4 rounded-2xl glass-card animate-bounce-gentle">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <div className="absolute -bottom-4 -right-4 p-4 rounded-2xl glass-card animate-bounce-gentle delay-200">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="absolute top-1/2 -right-12 p-4 rounded-2xl glass-card animate-bounce-gentle delay-400">
              <Zap className="h-8 w-8 text-primary" />
            </div>

            {/* Main card */}
            <div className="relative bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
              {/* Card header */}
              <div className="bg-secondary/50 px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <span className="ml-4 text-sm text-muted-foreground">NutriScan Analysis</span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 space-y-6">
                {/* Score display */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-secondary"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * 85) / 100}
                        strokeLinecap="round"
                        className="text-primary transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">85</span>
                      <span className="text-sm text-muted-foreground">Health Score</span>
                    </div>
                  </div>
                </div>

                {/* Nutrient bars */}
                <div className="space-y-4">
                  {[
                    { name: "Protein", value: 75, color: "bg-primary" },
                    { name: "Fiber", value: 60, color: "bg-chart-2" },
                    { name: "Sugar", value: 25, color: "bg-chart-4" },
                  ].map((nutrient) => (
                    <div key={nutrient.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{nutrient.name}</span>
                        <span className="font-medium text-foreground">{nutrient.value}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${nutrient.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${nutrient.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status badge */}
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Excellent Choice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
