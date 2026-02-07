import { cn } from "@/lib/utils";
import { useStatCard } from "@/src/hooks/useStatCard";
import { StatCardProps } from "@/src/types";
import { iconStyles, variantStyles } from "@/src/utils/styleType";

export function StatCard({
  title,
  value,
  suffix = "",
  icon: Icon,
  trend,
  variant = "default",
  delay = 0,
}: StatCardProps) {
  const { isVisible, displayValue } = useStatCard({ title, value, icon: Icon });

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 card-elevated transition-all duration-500",
        variantStyles[variant],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight">
              {displayValue.toLocaleString()}
            </span>
            {suffix && (
              <span className="text-lg font-medium text-muted-foreground">
                {suffix}
              </span>
            )}
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              <span
                className={cn(
                  "font-medium",
                  trend.isPositive
                    ? "text-sentiment-positive"
                    : "text-sentiment-negative",
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground">dari periode lalu</span>
            </div>
          )}
        </div>
        <div className={cn("rounded-xl p-3", iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
