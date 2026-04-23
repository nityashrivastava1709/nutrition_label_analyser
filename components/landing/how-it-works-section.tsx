"use client"

import { Upload, Cpu, LineChart, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Label",
    description: "Take a photo or upload an image of any nutrition facts label from your food products.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Analyzes Instantly",
    description: "Our advanced AI extracts all nutritional data and processes it against health databases.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    borderColor: "border-chart-2/20",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Get Your Insights",
    description: "View your health score, personalized recommendations, and detailed nutrient breakdown.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
  },
]

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <Cpu className="h-4 w-4" />
            <span>Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="text-foreground">How it</span>{" "}
            <span className="gradient-text">works</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Get from label to insights in seconds. Our streamlined process makes nutrition analysis effortless.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index

            return (
              <div
                key={step.number}
                className={`relative ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-border" />
                      <div
                        className={`absolute inset-y-0 left-0 bg-primary transition-all duration-500 ${
                          activeStep > index ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                    <ArrowRight
                      className={`absolute -right-3 -top-2 h-4 w-4 transition-colors duration-300 ${
                        activeStep > index ? "text-primary" : "text-border"
                      }`}
                    />
                  </div>
                )}

                {/* Card */}
                <div
                  className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    isActive
                      ? `${step.bgColor} ${step.borderColor} shadow-xl`
                      : "bg-card border-border hover:border-primary/30"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step number */}
                  <div
                    className={`absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isActive ? "bg-primary text-primary-foreground scale-110" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                      isActive ? step.bgColor : "bg-secondary"
                    }`}
                  >
                    <Icon
                      className={`h-8 w-8 transition-colors duration-300 ${
                        isActive ? step.color : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                  {/* Active indicator */}
                  <div
                    className={`absolute bottom-0 left-8 right-8 h-1 rounded-full transition-all duration-300 ${
                      isActive ? "bg-primary" : "bg-transparent"
                    }`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress dots (mobile) */}
        <div className="flex justify-center gap-3 mt-8 lg:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index ? "bg-primary w-8" : "bg-border"
              }`}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
