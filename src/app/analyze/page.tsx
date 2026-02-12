"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useAnalyseText } from "@/src/hooks/useAnalyzeText";
import { CheckCircle2, Sparkles, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalysisPage() {
  const {
    url1,
    url2,
    profession,
    loading,
    result,
    disabled,
    handleAnalyze,
    setProfession,
    setUrl1,
    setUrl2,
    setDisabled,
  } = useAnalyseText();

  const getSentimentTone = (score: number) => {
    if (score >= 80) return "strong";
    if (score >= 60) return "light";
    return "neutral";
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white p-6 rounded-lg border">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Analisis Sentimen Real-time</h3>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Pilih Profesi/Kebutuhan:
            </label>
            <Select value={profession} onValueChange={setProfession} required>
              <SelectTrigger
                className={`w-full mb-6 ${!profession ? "text-gray-500" : "text-black"}`}
              >
                <SelectValue placeholder="-- Pilih Profesi/Kebutuhan --" />
              </SelectTrigger>

              <SelectContent
                className="bg-card border-border shadow-lg"
                position="popper"
              >
                <SelectItem className="cursor-pointer" value="programmer">
                  Programmer
                </SelectItem>
                <SelectItem className="cursor-pointer" value="designer">
                  Designer
                </SelectItem>
                <SelectItem className="cursor-pointer" value="student">
                  Student
                </SelectItem>
                <SelectItem className="cursor-pointer" value="gamer">
                  Gamer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Link Produk Utama
            </label>
            <Input
              type="text"
              placeholder="Contoh: https://www.tokopedia.com/lenovo/thinkpad-x1-carbon"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              className="border p-2 rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>
        <div className="flex w-full gap-4 items-end">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Link Produk Pembanding
            </label>
            <Input
              type="text"
              placeholder="Contoh: https://www.tokopedia.com/lenovo/thinkpad-x1-carbon"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              className="border p-2 rounded-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="w-1/2 h-max">
            <Button className="w-full bg-[#F2F8FF] text-primary hover:text-white">
              + Tambah Tautan Produk Lainnya
            </Button>
          </div>
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={!url1 || !url2 || !profession || loading}
          className={`bg-primary cursor-pointer text-white px-6 py-3 mt-6 rounded-md w-max transition-colors disabled:bg-gray-400`}
        >
          <Sparkles className="h-4 w-4 text-white" />
          {loading
            ? "Sedang Mengambil Ulasan & Menganalisis..."
            : "Bandingkan Sekarang"}
        </Button>
      </div>

      {result && (
        <motion.div
          className="mt-12 mx-auto"
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
          {/* ================= HEADER WINNER ================= */}
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
            className="bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-900 text-white p-8 rounded-2xl text-center mb-12 relative overflow-hidden shadow-2xl shadow-emerald-900/30"
          >
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full border border-white/20 mb-4">
                <Trophy className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Rekomendasi Terbaik
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
                {result.winning_product}
              </h2>

              <p className="text-emerald-200 text-lg">
                Pilihan paling tepat untuk{" "}
                <span className="font-bold capitalize border-b border-emerald-400">
                  {result.profession_target}
                </span>
              </p>
            </div>
          </motion.div>

          {/* ================= CARDS GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {result.details.map((item, index) => {
              const isWinner = item.name === result.winning_product;

              const getSentimentTone = (score: number) => {
                if (score >= 80) return "strong";
                if (score >= 60) return "light";
                return "neutral";
              };

              const sentimentTone = getSentimentTone(
                item.general_sentiment_score,
              );

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
                  className={`relative group rounded-2xl border transition-all duration-500 backdrop-blur-sm hover:scale-[1.02] ${
                    isWinner
                      ? "bg-gradient-to-br from-emerald-900 to-green-800 border-emerald-700 shadow-2xl shadow-emerald-900/30 text-white"
                      : sentimentTone === "strong"
                        ? "bg-emerald-800 border-emerald-700 shadow-lg shadow-emerald-900/20 text-white"
                        : sentimentTone === "light"
                          ? "bg-emerald-50 border-emerald-200 hover:shadow-lg"
                          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg"
                  }`}
                >
                  {/* WINNER BADGE */}
                  {isWinner && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-green-300 text-emerald-900 px-4 py-1 rounded-full shadow-xl flex items-center gap-1.5 z-20 font-bold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span className="text-xs uppercase tracking-wider">
                        Top Choice
                      </span>
                    </div>
                  )}

                  <div className="p-6 md:p-8 h-full flex flex-col">
                    {/* PRODUCT NAME */}
                    <div className="mb-6">
                      <h3
                        className={`font-bold text-xl leading-snug line-clamp-2 ${
                          sentimentTone === "strong" || isWinner
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {item.name}
                      </h3>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs mt-2 inline-block transition-colors ${
                          sentimentTone === "strong" || isWinner
                            ? "text-emerald-200 hover:text-white"
                            : "text-gray-400 hover:text-green-600"
                        }`}
                      >
                        Lihat di Tokopedia ↗
                      </a>
                    </div>

                    {/* COMPATIBILITY SCORE */}
                    <div className="mb-6">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium opacity-70">
                          Kecocokan Profesi
                        </span>
                        <span className="text-lg font-bold">
                          {item.profession_compatibility_score}%
                        </span>
                      </div>

                      <div className="w-full bg-black/10 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${item.profession_compatibility_score}%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            isWinner
                              ? "bg-gradient-to-r from-emerald-400 to-green-300"
                              : "bg-gradient-to-r from-emerald-500 to-emerald-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* SENTIMENT SCORE */}
                    <div className="mb-6">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium opacity-70">
                          Sentimen Publik
                        </span>
                        <span className="text-sm font-semibold">
                          {item.general_sentiment_score}% Positif
                        </span>
                      </div>

                      <div
                        className={`w-full rounded-full h-2 overflow-hidden ${
                          sentimentTone === "strong"
                            ? "bg-emerald-900/40"
                            : sentimentTone === "light"
                              ? "bg-emerald-100"
                              : "bg-gray-100"
                        }`}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${item.general_sentiment_score}%`,
                          }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full rounded-full ${
                            sentimentTone === "strong"
                              ? "bg-gradient-to-r from-emerald-400 to-emerald-300"
                              : sentimentTone === "light"
                                ? "bg-emerald-400"
                                : "bg-gray-300"
                          }`}
                        />
                      </div>
                    </div>

                    {/* KEYWORDS */}
                    <div className="mt-auto pt-6 border-t border-black/10">
                      <p className="text-xs font-semibold opacity-60 uppercase tracking-wider mb-3">
                        Kata Kunci Dominan
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.top_keywords.map((kw, i) => (
                          <span
                            key={i}
                            className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                              sentimentTone === "strong"
                                ? "bg-white/10 text-emerald-200 border border-white/20"
                                : sentimentTone === "light"
                                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                  : "bg-gray-50 text-gray-600 border border-gray-100"
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
      )}
    </div>
  );
}
