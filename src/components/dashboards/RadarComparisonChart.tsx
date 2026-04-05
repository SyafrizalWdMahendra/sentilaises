import { RadarProps } from "@/src/types";
import { radarFormat } from "@/src/utils/datas";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const RadarComparisonChart = ({ data }: RadarProps) => {
  const { chartData, colors } = radarFormat({ data });

  return (
    <div className="h-100 bg-card p-5 rounded-xl border items-center flex flex-col">
      <h3 className="text-lg font-semibold text-center">
        Perbandingan Aspek Produk
      </h3>
      <ResponsiveContainer width="100%" height="100%" className="border-none">
        <RadarChart cx="50%" cy="46%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" className="text-xs" />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tickCount={6}
            axisLine={false}
            tick={{ fontSize: 10, fill: "#94a3b8" }}
          />

          {data.map((product, index) => (
            <Radar
              key={product.name}
              name={product.name}
              dataKey={product.name}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.15}
              dot={{ r: 2, fillOpacity: 1 }}
            />
          ))}

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            iconSize={10}
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "10px",
              fontWeight: 600,
            }}
            formatter={(value) => (
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                {value}
              </span>
            )}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarComparisonChart;
