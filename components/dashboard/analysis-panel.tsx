"use client"

import { Activity, AlertTriangle, Check, TrendingUp, FileText } from "lucide-react"
import { AnalysisResult } from "@/app/dashboard/page"
import { HealthScoreCircle } from "./health-score-circle"
import { NutrientTable } from "./nutrient-table"
import { AlertCards } from "./alert-cards"

interface AnalysisPanelProps {
  result: AnalysisResult | null
  isAnalyzing: boolean
}

export function AnalysisPanel({ result, isAnalyzing }: AnalysisPanelProps) {
  if (!result && !isAnalyzing) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-4">
          <Activity className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Analysis Yet</h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Upload a nutrition label image to see the AI-powered health analysis
        </p>
      </div>
    )
  }

  if (isAnalyzing) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-32 h-32 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-secondary" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
          <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Activity className="h-10 w-10 text-primary animate-pulse" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Analyzing Label</h3>
        <p className="text-sm text-muted-foreground text-center">
          Our AI is extracting nutritional data...
        </p>
      </div>
    )
  }

  if (!result) return null

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Excellent":
        return "text-success bg-success/10 border-success/20"
      case "Good":
        return "text-primary bg-primary/10 border-primary/20"
      case "Moderate":
        return "text-warning bg-warning/10 border-warning/20"
      case "Poor":
        return "text-destructive bg-destructive/10 border-destructive/20"
      default:
        return "text-muted-foreground bg-secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Health Score Card */}
      <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{result.productName}</h2>
            <p className="text-sm text-muted-foreground">Health Analysis Results</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Score Circle */}
          <HealthScoreCircle score={result.score} category={result.category} />

          {/* Quick Stats */}
          <div className="flex-1 space-y-4">
            {/* Category Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${getCategoryColor(
                result.category
              )}`}
            >
              {result.category === "Excellent" || result.category === "Good" ? (
                <Check className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              {result.category} Choice
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Calories</p>
                <p className="text-lg font-semibold text-foreground">{result.nutrients.calories}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Protein</p>
                <p className="text-lg font-semibold text-foreground">{result.nutrients.protein}g</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Carbs</p>
                <p className="text-lg font-semibold text-foreground">{result.nutrients.carbohydrates}g</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">Fat</p>
                <p className="text-lg font-semibold text-foreground">{result.nutrients.totalFat}g</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {result.alerts.length > 0 && <AlertCards alerts={result.alerts} />}

      {/* Nutrient Table */}
      <NutrientTable nutrients={result.nutrients} />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          <FileText className="h-5 w-5" />
          Generate Report
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors">
          Save to History
        </button>
      </div>
    </div>
  )
}
