"use client"

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { NutritionData } from "@/app/dashboard/page"

interface NutritionChartsProps {
  nutrients: NutritionData
}

export function NutritionCharts({ nutrients }: NutritionChartsProps) {
  // Macronutrient data for pie chart
  const macroData = [
    { name: "Protein", value: nutrients.protein * 4, color: "hsl(var(--primary))" },
    { name: "Carbs", value: nutrients.carbohydrates * 4, color: "hsl(var(--chart-3))" },
    { name: "Fat", value: nutrients.totalFat * 9, color: "hsl(var(--chart-2))" },
  ]

  // Sugar vs Fiber comparison
  const sugarFiberData = [
    { name: "Sugar", value: nutrients.sugar, fill: "hsl(var(--chart-4))" },
    { name: "Fiber", value: nutrients.fiber, fill: "hsl(var(--success))" },
  ]

  // Sodium comparison
  const sodiumData = [
    { name: "Current", value: nutrients.sodium, fill: "hsl(var(--chart-5))" },
    { name: "Recommended", value: 2300, fill: "hsl(var(--secondary))" },
  ]

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; color?: string }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">{payload[0].value} kcal</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Macronutrient Distribution */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Macronutrient Distribution</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sugar vs Fiber */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Sugar vs Fiber</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sugarFiberData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Ideal ratio: More fiber than sugar
        </p>
      </div>

      {/* Sodium Level */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Sodium Level</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sodiumData}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value) => [`${value}mg`, ""]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Daily limit: 2,300mg
        </p>
      </div>
    </div>
  )
}
