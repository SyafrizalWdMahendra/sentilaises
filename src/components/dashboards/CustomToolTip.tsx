import { CustomTooltipProps } from "@/src/types";

const CustomTooltip = ({ active, payload, total }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const percentage = ((item.value / total) * 100).toFixed(1);

    return (
      <div className="rounded-lg border bg-card px-4 py-3 shadow-lg">
        <p className="font-semibold" style={{ color: item.color }}>
          {item.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {item.value.toLocaleString()} ulasan ({percentage}%)
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
