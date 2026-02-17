"use client";

import { Header } from "./Header";
import { Frown, Meh, MessageSquareText, Smile, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";
import { sentimentDistribution, trendData } from "@/src/app/dashboard/lib/data";
import { ModelInfoSkeleton } from "../skeletons/ModelInfoSkeleton";
import { ModelInfo } from "./ModelInfo";
import { BrandFilter } from "./BrandFilter";
import { ReviewTable } from "./ReviewTable";
import { SentimentChart, TrendChart } from "@/src/utils/dImports";
import { useDashboards } from "@/src/hooks/useDashboard";
import { WordCloud } from "./WordCloud";
import AnalysisClient from "./AnalysisClient";
import Footer from "./Footer";

export default function DashboardClient() {
  const {
    totalReviews,
    positiveCount,
    negativeCount,
    neutralCount,
    loading,
    modelData,
    percentage,
  } = useDashboards();

  return (
    <div className="min-h-screen bg-[#F8FBFF]">
      <Header />

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
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Akurasi 92.4%
            </span>
            <span>•</span>
            <span>XGBoost + TF-IDF</span>
            <span>•</span>
            <span>Real-time Analysis</span>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Ulasan"
            value={totalReviews}
            icon={MessageSquareText}
            trend={{ value: 12.5, isPositive: true }}
            delay={0}
          />

          <StatCard
            title="Sentimen Positif"
            value={positiveCount}
            suffix={`(${percentage(positiveCount, totalReviews)}%)`}
            icon={Smile}
            variant="positive"
            delay={100}
          />

          <StatCard
            title="Sentimen Negatif"
            value={negativeCount}
            suffix={`(${percentage(negativeCount, totalReviews)}%)`}
            icon={Frown}
            variant="negative"
            delay={200}
          />

          <StatCard
            title="Sentimen Netral"
            value={neutralCount}
            suffix={`(${percentage(neutralCount, totalReviews)}%)`}
            icon={Meh}
            variant="neutral"
            delay={300}
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

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">Kata Kunci Populer</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Kata-kata yang sering muncul dalam ulasan berdasarkan kategori
              sentimen
            </p>
            <WordCloud />
          </div>

          {loading ? (
            <ModelInfoSkeleton />
          ) : modelData.length > 0 ? (
            <ModelInfo data={modelData} />
          ) : (
            <div className="rounded-xl border bg-card p-6 text-center text-muted-foreground">
              Data model tidak tersedia.
            </div>
          )}
        </div>

        <div className="mb-8">
          <AnalysisClient />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Ulasan Terbaru</h3>
              <p className="text-sm text-muted-foreground">
                Hasil klasifikasi sentimen ulasan produk laptop
              </p>
            </div>
            <BrandFilter />
          </div>
          <ReviewTable />
        </div>

        <Footer />
      </main>
    </div>
  );
}
