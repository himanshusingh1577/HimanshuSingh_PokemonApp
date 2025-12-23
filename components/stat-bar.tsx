interface StatBarProps {
  label: string
  value: number
  maxValue?: number
  color?: string
}

export function StatBar({ label, value, maxValue = 255, color = "#3b82f6" }: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{value}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}
