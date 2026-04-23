"use client"

import { useState } from "react"
import { History, Search, Filter, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import { HealthScoreCircle } from "@/components/dashboard/health-score-circle"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const historyData = [
  {
    id: 1,
    name: "Organic Granola Bar",
    score: 85,
    date: "2024-01-15",
    category: "Excellent",
    calories: 180,
    protein: 6,
    sugar: 8,
  },
  {
    id: 2,
    name: "Greek Yogurt",
    score: 92,
    date: "2024-01-14",
    category: "Excellent",
    calories: 120,
    protein: 15,
    sugar: 5,
  },
  {
    id: 3,
    name: "Protein Shake",
    score: 78,
    date: "2024-01-13",
    category: "Good",
    calories: 220,
    protein: 25,
    sugar: 12,
  },
  {
    id: 4,
    name: "Whole Grain Bread",
    score: 71,
    date: "2024-01-12",
    category: "Good",
    calories: 90,
    protein: 4,
    sugar: 2,
  },
  {
    id: 5,
    name: "Energy Drink",
    score: 45,
    date: "2024-01-11",
    category: "Poor",
    calories: 110,
    protein: 0,
    sugar: 28,
  },
  {
    id: 6,
    name: "Mixed Nuts",
    score: 88,
    date: "2024-01-10",
    category: "Excellent",
    calories: 170,
    protein: 5,
    sugar: 1,
  },
]

const trendData = [
  { date: "Jan 10", calories: 1800, sugar: 45, sodium: 1800 },
  { date: "Jan 11", calories: 2200, sugar: 65, sodium: 2100 },
  { date: "Jan 12", calories: 1950, sugar: 40, sodium: 1900 },
  { date: "Jan 13", calories: 2100, sugar: 55, sodium: 2200 },
  { date: "Jan 14", calories: 1850, sugar: 35, sodium: 1700 },
  { date: "Jan 15", calories: 1920, sugar: 42, sodium: 1850 },
]

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<typeof historyData[0] | null>(null)

  const filteredHistory = historyData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Excellent":
        return "bg-success/10 text-success border-success/20"
      case "Good":
        return "bg-primary/10 text-primary border-primary/20"
      case "Moderate":
        return "bg-warning/10 text-warning border-warning/20"
      case "Poor":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-secondary text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Nutrition History</h1>
        <p className="text-muted-foreground mt-1">
          View your previously analyzed products and nutrition trends
        </p>
      </div>

      {/* Trend Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calorie Trend */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Calorie Intake</h3>
            <div className="flex items-center gap-1 text-sm text-success">
              <TrendingDown className="h-4 w-4" />
              -5%
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorCalories)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Avg: 1,970 kcal/day</p>
        </div>

        {/* Sugar Trend */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Sugar Intake</h3>
            <div className="flex items-center gap-1 text-sm text-success">
              <TrendingDown className="h-4 w-4" />
              -12%
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="sugar"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  fill="url(#colorSugar)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Avg: 47g/day</p>
        </div>

        {/* Sodium Trend */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Sodium Intake</h3>
            <div className="flex items-center gap-1 text-sm text-warning">
              <TrendingUp className="h-4 w-4" />
              +3%
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorSodium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="sodium"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={2}
                  fill="url(#colorSodium)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Avg: 1,925mg/day</p>
        </div>
      </div>

      {/* History List */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <History className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">Analyzed Products</h2>
            <p className="text-sm text-muted-foreground">{historyData.length} products scanned</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-foreground"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground hover:bg-secondary/80 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary border border-border text-foreground hover:bg-secondary/80 transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </button>
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedItem?.id === item.id
                  ? "bg-primary/5 border-primary/30"
                  : "bg-secondary/30 border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{item.score}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">Calories</p>
                    <p className="font-medium text-foreground">{item.calories}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Protein</p>
                    <p className="font-medium text-foreground">{item.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Sugar</p>
                    <p className="font-medium text-foreground">{item.sugar}g</p>
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {selectedItem?.id === item.id && (
                <div className="mt-4 pt-4 border-t border-border grid sm:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Calories</p>
                    <p className="text-lg font-semibold text-foreground">{item.calories}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Protein</p>
                    <p className="text-lg font-semibold text-foreground">{item.protein}g</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Sugar</p>
                    <p className="text-lg font-semibold text-foreground">{item.sugar}g</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
