"use client"

import { UploadSection } from "@/components/dashboard/upload-section"
import { AnalysisPanel } from "@/components/dashboard/analysis-panel"
import { useState } from "react"

export interface NutritionData {
  calories: number
  protein: number
  carbohydrates: number
  totalFat: number
  saturatedFat: number
  sugar: number
  fiber: number
  sodium: number
  cholesterol: number
}

export interface AnalysisResult {
  score: number
  category: "Excellent" | "Good" | "Moderate" | "Poor"
  nutrients: NutritionData
  alerts: string[]
  productName: string
}

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))
    
    // Mock result
    const mockResult: AnalysisResult = {
      score: Math.floor(Math.random() * 40) + 60, // 60-100
      category: "Good",
      productName: file.name.replace(/\.[^/.]+$/, "") || "Analyzed Product",
      nutrients: {
        calories: Math.floor(Math.random() * 300) + 100,
        protein: Math.floor(Math.random() * 25) + 5,
        carbohydrates: Math.floor(Math.random() * 50) + 10,
        totalFat: Math.floor(Math.random() * 20) + 5,
        saturatedFat: Math.floor(Math.random() * 10) + 2,
        sugar: Math.floor(Math.random() * 25) + 5,
        fiber: Math.floor(Math.random() * 10) + 2,
        sodium: Math.floor(Math.random() * 800) + 100,
        cholesterol: Math.floor(Math.random() * 50) + 10,
      },
      alerts: [],
    }

    // Determine category based on score
    if (mockResult.score >= 85) mockResult.category = "Excellent"
    else if (mockResult.score >= 70) mockResult.category = "Good"
    else if (mockResult.score >= 50) mockResult.category = "Moderate"
    else mockResult.category = "Poor"

    // Generate alerts
    if (mockResult.nutrients.sodium > 600) {
      mockResult.alerts.push("High sodium content detected")
    }
    if (mockResult.nutrients.sugar > 20) {
      mockResult.alerts.push("Sugar exceeds recommended daily limit")
    }
    if (mockResult.nutrients.saturatedFat > 8) {
      mockResult.alerts.push("High saturated fat content")
    }
    if (mockResult.nutrients.cholesterol > 40) {
      mockResult.alerts.push("Cholesterol above recommended limit")
    }

    setAnalysisResult(mockResult)
    setIsAnalyzing(false)
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Analyze Nutrition Label
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload a nutrition label image to get instant AI-powered analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

        {/* Analysis Panel */}
        <AnalysisPanel result={analysisResult} isAnalyzing={isAnalyzing} />
      </div>
    </div>
  )
}
