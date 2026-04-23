"use client"

import { useEffect, useState } from "react"

interface HealthScoreCircleProps {
  score: number
  category: string
  size?: "sm" | "md" | "lg"
}

export function HealthScoreCircle({ score, category, size = "md" }: HealthScoreCircleProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const [animatedOffset, setAnimatedOffset] = useState(440)

  const sizeConfig = {
    sm: { width: 120, strokeWidth: 8, textSize: "text-2xl", labelSize: "text-xs" },
    md: { width: 160, strokeWidth: 12, textSize: "text-4xl", labelSize: "text-sm" },
    lg: { width: 200, strokeWidth: 14, textSize: "text-5xl", labelSize: "text-base" },
  }

  const config = sizeConfig[size]
  const radius = (config.width - config.strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success"
    if (score >= 70) return "text-primary"
    if (score >= 50) return "text-warning"
    return "text-destructive"
  }

  const getStrokeColor = (score: number) => {
    if (score >= 85) return "stroke-success"
    if (score >= 70) return "stroke-primary"
    if (score >= 50) return "stroke-warning"
    return "stroke-destructive"
  }

  useEffect(() => {
    // Animate score number
    const scoreInterval = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev >= score) {
          clearInterval(scoreInterval)
          return score
        }
        return prev + 1
      })
    }, 20)

    // Animate circle
    const targetOffset = circumference - (circumference * score) / 100
    const offsetStep = (animatedOffset - targetOffset) / 50
    const offsetInterval = setInterval(() => {
      setAnimatedOffset((prev) => {
        const next = prev - offsetStep
        if (offsetStep > 0 && next <= targetOffset) {
          clearInterval(offsetInterval)
          return targetOffset
        }
        return next
      })
    }, 20)

    return () => {
      clearInterval(scoreInterval)
      clearInterval(offsetInterval)
    }
  }, [score, circumference])

  return (
    <div className="relative flex-shrink-0">
      {/* Glow effect */}
      <div
        className={`absolute inset-0 blur-2xl opacity-30 ${
          score >= 85
            ? "bg-success"
            : score >= 70
            ? "bg-primary"
            : score >= 50
            ? "bg-warning"
            : "bg-destructive"
        }`}
      />

      <svg
        width={config.width}
        height={config.width}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          fill="none"
          className="text-secondary"
        />
        {/* Progress circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          strokeLinecap="round"
          className={`${getStrokeColor(score)} transition-all duration-1000`}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${config.textSize} font-bold ${getScoreColor(score)}`}>
          {animatedScore}
        </span>
        <span className={`${config.labelSize} text-muted-foreground`}>{category}</span>
      </div>
    </div>
  )
}
