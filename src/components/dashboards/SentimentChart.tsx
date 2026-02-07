import { SentimentChartProps } from "@/src/types";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import renderCustomLabel from "./CustomLabel";
import CustomTooltip from "./CustomToolTip";

export function SentimentChart({ data }: SentimentChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-75 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={110}
            innerRadius={60}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={2}
            stroke="hsl(var(--card))"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip total={total} />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value: string) => (
              <span className="text-sm text-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
