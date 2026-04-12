"use client";

import { Header } from "./Header";
import {
  ChartNoAxesGantt,
  FileLock,
  Frown,
  Meh,
  MessageSquareText,
  Moon,
  Smile,
  Sparkles,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { ModelInfoSkeleton } from "../skeletons/ModelInfoSkeleton";
import { ModelInfo } from "./ModelInfo";
import { BrandFilter } from "./BrandFilter";
import { ReviewTable } from "./ReviewTable";
import { useDashboards } from "@/src/hooks/useDashboard";
import { WordCloud } from "./WordCloud";
import AnalysisClient from "./AnalysisClient";
import Footer from "./Footer";
import { Button } from "../ui/button";
import ExportExcel from "./ExportExcel";

export default function DashboardClient() {
  const {
    totalReviews,
    positiveCount,
    negativeCount,
    neutralCount,
    loading,
    modelData,
    darkMode,
    setDarkMode,
    percentage,
    scrollToResult,
  } = useDashboards();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#F8FBFF]"}  suppressHydrationWarning} transition-all duration-500`}
    >
      <Header onToggle={toggleDarkMode} isDark={darkMode} />

      <main className="container mx-auto px-4 py-8">
        <div
          className="mb-8 rounded-2xl p-8 text-center"
          style={{ background: "hsl(var(--primary))" }}
        >
          <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Analisis Sentimen Ulasan Laptop
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Sistem klasifikasi sentimen menggunakan algoritma XGBoost untuk
            menganalisis ulasan produk laptop pada platform Tokopedia
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/70">
            <Button
              onClick={scrollToResult}
              className="bg-[#F8FBFF] cursor-pointer hover:bg-card hover:text-primary text-black mt-4"
            >
              <Sparkles className="h-5 w-5" />
              <span>Coba Analisis Sentimen</span>
            </Button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Ulasan"
            value={totalReviews}
            icon={MessageSquareText}
            delay={0}
            isDark={darkMode}
          />

          <StatCard
            title="Sentimen Positif"
            value={positiveCount}
            suffix={`(${percentage(positiveCount, totalReviews)}%)`}
            icon={Smile}
            variant="positive"
            delay={100}
            isDark={darkMode}
          />

          <StatCard
            title="Sentimen Negatif"
            value={negativeCount}
            suffix={`(${percentage(negativeCount, totalReviews)}%)`}
            icon={Frown}
            variant="negative"
            delay={200}
            isDark={darkMode}
          />

          <StatCard
            title="Sentimen Netral"
            value={neutralCount}
            suffix={`(${percentage(neutralCount, totalReviews)}%)`}
            icon={Meh}
            variant="neutral"
            delay={300}
            isDark={darkMode}
          />
        </div>

        {/* <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">
              Tren Sentimen Bulanan
            </h3>
            <TrendChart data={trendData} />
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">Distribusi Sentimen</h3>
            <SentimentChart data={sentimentDistribution} />
          </div>
        </div> */}

        <div className="mb-8 grid gap-4 lg:grid-cols-2">
          <div
            className={`rounded-xl border ${darkMode ? "border-transparent" : "border-gray-200"} bg-card p-6 ${darkMode ? "bg-gray-800" : "bg-white"}  transition-all duration-500`}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileLock
                className={`h-5 w-5 text-primary ${darkMode ? "text-white" : "text-black"} transition-all duration-500`}
              />
              <h3
                className={`text-lg font-semibold ${darkMode ? "text-white" : "text-neutral"} transition-all duration-500`}
              >
                Kata Kunci Populer
              </h3>
            </div>
            <p
              className={`mb-4 text-sm ${darkMode ? "text-white" : "text-neutral"} transition-all duration-500`}
            >
              Kata-kata yang sering muncul dalam ulasan berdasarkan kategori
              sentimen
            </p>
            <WordCloud isDark={darkMode} />
          </div>

          {loading ? (
            <ModelInfoSkeleton />
          ) : modelData.length > 0 ? (
            <ModelInfo data={modelData} isDark={darkMode} />
          ) : (
            <div className="rounded-xl border border-gray-200 bg-card p-6 text-center text-muted-foreground">
              Data model tidak tersedia.
            </div>
          )}
        </div>

        <section id="analysis-form" className="scroll-mt-60">
          <div className="mb-8 ">
            <AnalysisClient isDark={darkMode} />
          </div>
        </section>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ChartNoAxesGantt className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Ulasan Terbaru</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Hasil klasifikasi sentimen ulasan produk laptop
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <BrandFilter />
              <ExportExcel />
            </div>
          </div>
          <ReviewTable />
        </div>

        <Footer />
      </main>
    </div>
  );
}
