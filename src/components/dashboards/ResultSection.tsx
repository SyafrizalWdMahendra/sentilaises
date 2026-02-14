import { ResultProps } from "@/src/types";
import { motion } from "framer-motion";
import { Trophy, ExternalLink, CheckCircle2, TrendingUp } from "lucide-react";

export default function ResultSection({ result }: ResultProps) {
  if (!result) return null;

  const getGridClass = (count: number) => {
    if (count === 1) return "max-w-md mx-auto";
    if (count === 2) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

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
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20, height: 0 },
          visible: {
            opacity: 1,
            y: 0,
            height: "auto",
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
        className="bg-sentiment-positive text-card p-8 rounded-2xl text-center mb-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6 shadow-sm">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold tracking-wide uppercase text-white">
              Rekomendasi Terbaik
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            {result.winning_product}
          </h2>

          <p className="text-sentiment-positive-light/90 text-lg max-w-2xl mx-auto">
            Pilihan paling tepat dan efisien untuk kebutuhan{" "}
            <span className="font-bold capitalize text-white border-b-2 border-white/30 pb-0.5">
              {result.profession_target}
            </span>
          </p>
        </div>
      </motion.div>

      <div className={`grid gap-8 ${getGridClass(result.details.length)}`}>
        {result.details.map((item, index) => {
          const isWinner = item.name === result.winning_product;

          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 50 },
                },
              }}
              className={`relative flex flex-col justify-between rounded-2xl border transition-all duration-300 group ${
                isWinner
                  ? "bg-white border-sentiment-positive"
                  : "bg-white border-gray-200 hover:border-primary/50 hover:shadow-lg"
              }`}
            >
              {isWinner && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sentiment-positive text-white px-6 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-20">
                  <Trophy className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Pemenang
                  </span>
                </div>
              )}

              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3
                      className={`font-bold text-xl leading-snug line-clamp-2 ${
                        isWinner ? "text-sentiment-positive" : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <span
                      className={`shrink-0 px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                        item.verdict.includes("Sangat Cocok")
                          ? "bg-sentiment-positive-light/20 text-sentiment-positive border-sentiment-positive/20"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}
                    >
                      {item.verdict.split("")}{" "}
                    </span>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-primary mt-3 transition-colors w-max"
                  >
                    Lihat Produk{" "}
                    <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                <div className="space-y-5 mb-8">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                        <CheckCircle2
                          className={`w-4 h-4 ${isWinner ? "text-sentiment-positive" : "text-gray-400"}`}
                        />
                        Kecocokan
                      </span>
                      <span
                        className={`text-lg font-bold ${isWinner ? "text-sentiment-positive" : "text-gray-900"}`}
                      >
                        {item.profession_compatibility_score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${item.profession_compatibility_score}%`,
                        }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className={`h-full rounded-full ${
                          isWinner ? "bg-sentiment-positive" : "bg-primary"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        Sentimen
                      </span>
                      <span className="text-sm font-semibold text-gray-700">
                        {item.general_sentiment_score}% Positif
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.general_sentiment_score}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full rounded-full opacity-60 ${
                          isWinner ? "bg-sentiment-positive" : "bg-primary"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Kata Kunci
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.top_keywords.map((kw, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                          isWinner
                            ? "bg-sentiment-positive-light/20 text-sentiment-positive border-sentiment-positive/20"
                            : "bg-gray-50 text-gray-600 border-gray-100"
                        }`}
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
