"use client"

import { FileText, Download, Calendar, TrendingUp, AlertTriangle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HealthScoreCircle } from "@/components/dashboard/health-score-circle"

const reports = [
  {
    id: 1,
    title: "Weekly Nutrition Report",
    date: "Jan 8 - Jan 15, 2024",
    avgScore: 78,
    productsAnalyzed: 12,
    alerts: 3,
    status: "ready",
  },
  {
    id: 2,
    title: "Weekly Nutrition Report",
    date: "Jan 1 - Jan 7, 2024",
    avgScore: 72,
    productsAnalyzed: 8,
    alerts: 5,
    status: "ready",
  },
  {
    id: 3,
    title: "Monthly Summary",
    date: "December 2023",
    avgScore: 75,
    productsAnalyzed: 45,
    alerts: 12,
    status: "ready",
  },
]

const reportHighlights = [
  {
    title: "Average Health Score",
    value: "78",
    change: "+6%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "Products Analyzed",
    value: "24",
    change: "This Month",
    positive: true,
    icon: FileText,
  },
  {
    title: "Active Alerts",
    value: "3",
    change: "-40%",
    positive: true,
    icon: AlertTriangle,
  },
  {
    title: "Goals Met",
    value: "85%",
    change: "+12%",
    positive: true,
    icon: Check,
  },
]

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and download your nutrition health reports
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
          <FileText className="h-5 w-5 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Report Highlights */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {reportHighlights.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    item.positive ? "text-success" : "text-destructive"
                  }`}
                >
                  {item.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.title}</p>
            </div>
          )
        })}
      </div>

      {/* Current Report Preview */}
      <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Current Week Report</h2>
            <p className="text-sm text-muted-foreground">Jan 8 - Jan 15, 2024</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Score Summary */}
          <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-secondary/30">
            <HealthScoreCircle score={78} category="Good" size="md" />
            <p className="text-sm text-muted-foreground mt-4">Average Health Score</p>
          </div>

          {/* Stats */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-1">Products Analyzed</p>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-success mt-2">+4 from last week</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-1">Avg. Calories</p>
              <p className="text-2xl font-bold text-foreground">1,920</p>
              <p className="text-xs text-muted-foreground mt-2">per day</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-1">Avg. Sugar</p>
              <p className="text-2xl font-bold text-foreground">42g</p>
              <p className="text-xs text-success mt-2">-8% from last week</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-1">Health Alerts</p>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-success mt-2">-2 from last week</p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Download a detailed PDF report with all your nutrition data and insights.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Download className="h-4 w-4 mr-2" />
            Download PDF Report
          </Button>
        </div>
      </div>

      {/* Past Reports */}
      <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Past Reports</h2>
            <p className="text-sm text-muted-foreground">Download previous reports</p>
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{report.title}</h3>
                <p className="text-sm text-muted-foreground">{report.date}</p>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">Score</p>
                  <p className="font-medium text-foreground">{report.avgScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Products</p>
                  <p className="font-medium text-foreground">{report.productsAnalyzed}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Alerts</p>
                  <p className="font-medium text-foreground">{report.alerts}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
