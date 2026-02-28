import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface CardStatProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: { value: number; positive: boolean }
  className?: string
}

export function CardStat({ title, value, description, icon: Icon, trend, className }: CardStatProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{value}</p>
            {trend && (
              <p className={cn(
                "mt-1 text-xs font-medium",
                trend.positive ? "text-accent" : "text-destructive"
              )}>
                {trend.positive ? "+" : ""}{trend.value}% vs mes anterior
              </p>
            )}
            {description && !trend && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="size-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
