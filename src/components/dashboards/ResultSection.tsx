import { ResultProps } from "@/src/types";
import { motion } from "framer-motion";
import RadarComparisonChart from "./RadarComparisonChart";
import ResultDetails from "./ResultDetails";
import { useDashboards } from "@/src/hooks/useDashboard";

export default function Resultection({ result }: ResultProps) {
  const { darkMode } = useDashboards();
  return (
    <motion.div
      className="w-full mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      {result && (
        <div className="space-y-8 animate-in fade-in duration-700">
          <div
            className={`${darkMode ? "bg-gray-800" : "bg-primary"} p-8 rounded-xl text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-500`}
          >
            <div>
              <p className="mx-auto text-lg text-white/80">
                Rekomendasi Terbaik Berdasarkan Analisis
              </p>
              <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">
                {result.winning_product}
              </h2>
            </div>
            <div className="bg-card backdrop-blur-md py-2 px-4 rounded-md text-primary">
              <p className="mx-auto text-sm font-semibold">
                {result.analysis_type.replace(/_/g, " ")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <RadarComparisonChart data={result.details} />
            <ResultDetails result={result} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
