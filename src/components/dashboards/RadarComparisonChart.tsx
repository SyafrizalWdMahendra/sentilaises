import { useDashboards } from "@/src/hooks/useDashboard";
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
  const { darkMode } = useDashboards();

  return (
    <div
      className={`h-100 ${darkMode ? "bg-gray-800 border-transparent" : "bg-card"} p-5 rounded-xl border items-center flex flex-col transition-all duration-500`}
    >
      <h3 className="text-lg font-semibold text-center transition-all duration-500">
        Perbandingan Aspek Produk
      </h3>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="border-transparent transition-all duration-500"
      >
        <RadarChart cx="50%" cy="46%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}
          />
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
              className={`${darkMode ? "animate-in fade-in duration-500 text-card" : "animate-in fade-in duration-500"}`}
            />
          ))}

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              color: darkMode ? "#e0e0e0" : "#333",
              backgroundColor: darkMode ? "#333" : "#fff",
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
              <span
                className={`${darkMode ? "text-card" : "text-gray-500"} text-[10px] uppercase tracking-wider transition-all duration-500`}
              >
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
