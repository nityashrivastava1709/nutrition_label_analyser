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
    try {
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch(
      "http://127.0.0.1:5000/analyze",
     {
        method: "POST",
       body: formData,
      }
    )

     const data = await response.json()

     const formattedResult: AnalysisResult = {
       score: data.health_score,

       category:
       data.health_score >= 85
        ? "Excellent"
        : data.health_score >= 70
        ? "Good"
        : data.health_score >= 50
        ? "Moderate"
        : "Poor",

       productName: data.name,

       nutrients: {
         calories: data.data.calories || 0,
         protein: data.data.protein || 0,
         carbohydrates: data.data.carbs || 0,
         totalFat: data.data.fat || 0,
         saturatedFat: 0,
         sugar: data.data.sugar || 0,
         fiber: data.data.fiber || 0,
         sodium: data.data.sodium || 0,
         cholesterol: 0,
        },

       alerts: data.alerts || [],
      }

     setAnalysisResult(formattedResult)

     }     catch (error) {
     console.error("Upload error:", error)
      }

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
