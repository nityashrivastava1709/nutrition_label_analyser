"use client"

import { Activity, TrendingUp, AlertTriangle, History, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useEffect, useState } from "react"
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


export default function OverviewPage() {
  const [result, setResult] = useState<any>(null)
  const [historyData, setHistoryData] = useState<any[]>([])
  useEffect(() => {
  fetch("http://127.0.0.1:5000/history")
    .then((res) => res.json())
    .then((data) => {
      setHistoryData(data.reverse())
    })
}, [])

 const handleUpload = async (event: any) => {
  const file = event.target.files[0]

  if (!file) return

  const formData = new FormData()
  formData.append("image", file)

  try {
    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    setResult(data)
  } catch (error) {
    console.error("Upload error:", error)
  }
}  
     const recentAnalyses = historyData.slice(0, 5)
       const stats = [
  {
    label: "Total Scans",
    value: historyData.length,
    change: "+12%",
    positive: true,
    icon: History,
  },

  {
    label: "Average Score",
    value:
      historyData.length > 0
        ? Math.round(
            historyData.reduce(
              (sum: number, item: any) =>
                sum + item.health_score,
              0
            ) / historyData.length
          )
        : 0,
    change: "+5%",
    positive: true,
    icon: Activity,
  },

  {
    label: "High Score",
    value:
      historyData.length > 0
        ? Math.max(
            ...historyData.map(
              (i: any) => i.health_score
            )
          )
        : 0,
    change: "+8%",
    positive: true,
    icon: TrendingUp,
  },

  {
    label: "Alerts",
    value: historyData.reduce(
      (sum: number, item: any) =>
        sum + (item.alerts?.length || 0),
      0
    ),
    change: "-2%",
    positive: false,
    icon: AlertTriangle,
  },
]
     
     
      const weeklyData = historyData.map((item: any, index: number) => ({
        day: `Scan ${index + 1}`,
       score: item.health_score || 0,
       calories: item.data?.calories || 0,
     }))
  return (
    
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Your nutrition overview and health insights
        </p>
      </div>

      {/* 🔥 Upload Section */}
<div className="bg-card rounded-2xl border border-border p-6">
  <h3 className="text-lg font-semibold text-foreground mb-4">Upload Food Label</h3>

  <input
    type="file"
    onChange={handleUpload}
    className="mb-4"
  />

  {result && (
    <div className="mt-4">
      <h4 className="font-semibold">Health Score: {result.health_score}</h4>

      <h5 className="mt-3 font-medium">Alerts:</h5>
      <ul className="list-disc ml-5">
        {result.alerts.map((a: string, i: number) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      <h5 className="mt-3 font-medium">Recommendations:</h5>
      <ul className="list-disc ml-5">
        {result.recommendations.map((r: string, i: number) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  )}
</div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.positive ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Health Score Trend */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Health Score Trend</h3>
              <p className="text-sm text-muted-foreground">Your weekly performance</p>
            </div>
            <select className="px-3 py-1.5 bg-secondary rounded-lg text-sm text-foreground border-none outline-none">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  domain={[50, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Score */}
        <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Average Score</h3>
          <p className="text-sm text-muted-foreground mb-6">Based on last 7 days</p>
          <HealthScoreCircle score={78} category="Good" size="lg" />
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Your nutrition choices are on track. Keep it up!
          </p>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Analyses</h3>
            <p className="text-sm text-muted-foreground">Your latest scanned products</p>
          </div>
          <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentAnalyses.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{item.health_score}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.timestamp}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.category === "Excellent"
                    ? "bg-success/10 text-success"
                    : item.category === "Good"
                    ? "bg-primary/10 text-primary"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calorie Intake */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Calorie Intake</h3>
            <p className="text-sm text-muted-foreground">Weekly calorie consumption</p>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line
                type="monotone"
                dataKey="calories"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
