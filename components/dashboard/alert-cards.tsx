"use client"

import { AlertTriangle, AlertCircle, Info } from "lucide-react"

interface AlertCardsProps {
  alerts: string[]
}

const getAlertConfig = (alert: string) => {
  if (alert.toLowerCase().includes("high") || alert.toLowerCase().includes("exceeds")) {
    return {
      icon: AlertTriangle,
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      iconColor: "text-destructive",
      textColor: "text-destructive",
    }
  }
  if (alert.toLowerCase().includes("low") || alert.toLowerCase().includes("below")) {
    return {
      icon: AlertCircle,
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      iconColor: "text-warning",
      textColor: "text-warning-foreground",
    }
  }
  return {
    icon: Info,
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    iconColor: "text-primary",
    textColor: "text-foreground",
  }
}

export function AlertCards({ alerts }: AlertCardsProps) {
  if (alerts.length === 0) return null

  return (
    <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h3 className="text-lg font-semibold text-foreground">Health Alerts</h3>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const config = getAlertConfig(alert)
          const Icon = config.icon

          return (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-xl border ${config.bgColor} ${config.borderColor} animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`flex-shrink-0 ${config.iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${config.textColor}`}>{alert}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Consider choosing products with lower values for better health.
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
