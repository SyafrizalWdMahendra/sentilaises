import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "positive" | "negative" | "neutral";
  delay?: number;
}

export function StatCard({
  title,
  value,
  suffix = "",
  icon: Icon,
  trend,
  variant = "default",
  delay = 0,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 1200;
    const steps = 40;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      // Easing function for smooth animation
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = value * eased;
      
      if (step >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const variantStyles = {
    default: "bg-card border-border",
    positive: "bg-sentiment-positive-light border-sentiment-positive/20",
    negative: "bg-sentiment-negative-light border-sentiment-negative/20",
    neutral: "bg-sentiment-neutral-light border-sentiment-neutral/20",
  };

  const iconStyles = {
    default: "bg-primary/10 text-primary",
    positive: "bg-sentiment-positive/10 text-sentiment-positive",
    negative: "bg-sentiment-negative/10 text-sentiment-negative",
    neutral: "bg-sentiment-neutral/10 text-sentiment-neutral",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 card-elevated transition-all duration-500",
        variantStyles[variant],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
                  trend.isPositive ? "text-sentiment-positive" : "text-sentiment-negative"
                )}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
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
