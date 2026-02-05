import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TrendData {
  date: string;
  positif: number;
  negatif: number;
  netral: number;
}

interface TrendChartProps {
  data: TrendData[];
}

export function TrendChart({ data }: TrendChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-card px-4 py-3 shadow-lg">
          <p className="mb-2 font-semibold text-foreground">{label}</p>
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}:</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPositif" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(158, 64%, 42%)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(158, 64%, 42%)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorNegatif" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(0, 72%, 51%)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(0, 72%, 51%)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorNetral" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(43, 74%, 49%)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(43, 74%, 49%)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value: string) => (
              <span className="text-sm capitalize text-foreground">{value}</span>
            )}
          />
          <Area
            type="monotone"
            dataKey="positif"
            name="Positif"
            stroke="hsl(158, 64%, 42%)"
            fillOpacity={1}
            fill="url(#colorPositif)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="negatif"
            name="Negatif"
            stroke="hsl(0, 72%, 51%)"
            fillOpacity={1}
            fill="url(#colorNegatif)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="netral"
            name="Netral"
            stroke="hsl(43, 74%, 49%)"
            fillOpacity={1}
            fill="url(#colorNetral)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
