"use client"

import { NutritionData } from "@/app/dashboard/page"

interface NutrientTableProps {
  nutrients: NutritionData
}

const nutrientConfig = [
  { key: "calories" as const, label: "Calories", unit: "", dailyValue: 2000, color: "bg-chart-1" },
  { key: "protein" as const, label: "Protein", unit: "g", dailyValue: 50, color: "bg-primary" },
  { key: "carbohydrates" as const, label: "Carbohydrates", unit: "g", dailyValue: 300, color: "bg-chart-3" },
  { key: "totalFat" as const, label: "Total Fat", unit: "g", dailyValue: 65, color: "bg-chart-2" },
  { key: "saturatedFat" as const, label: "Saturated Fat", unit: "g", dailyValue: 20, color: "bg-chart-4" },
  { key: "sugar" as const, label: "Sugar", unit: "g", dailyValue: 50, color: "bg-chart-4" },
  { key: "fiber" as const, label: "Fiber", unit: "g", dailyValue: 25, color: "bg-success" },
  { key: "sodium" as const, label: "Sodium", unit: "mg", dailyValue: 2300, color: "bg-chart-5" },
  { key: "cholesterol" as const, label: "Cholesterol", unit: "mg", dailyValue: 300, color: "bg-warning" },
]

export function NutrientTable({ nutrients }: NutrientTableProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
      <h3 className="text-lg font-semibold text-foreground mb-6">Nutritional Breakdown</h3>

      <div className="space-y-4">
        {nutrientConfig.map((nutrient) => {
          const value = nutrients[nutrient.key]
          const percentage = Math.min((value / nutrient.dailyValue) * 100, 100)
          const isHigh = percentage > 80

          return (
            <div key={nutrient.key} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {nutrient.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {value}
                    {nutrient.unit}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isHigh
                        ? "bg-destructive/10 text-destructive"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {percentage.toFixed(0)}% DV
                  </span>
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${nutrient.color} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        * Percent Daily Values are based on a 2,000 calorie diet.
      </p>
    </div>
  )
}
