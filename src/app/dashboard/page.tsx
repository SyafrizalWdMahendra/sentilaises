"use client";
import React, { useState } from "react";
import {
  brandData,
  reviewData,
  sentimentDistribution,
  trendData,
  wordCloudData,
} from "./lib/data";
import { Header } from "@/components/dashboard/Header";
import {
  MessageSquareText,
  Minus,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { WordCloud } from "@/components/dashboard/WordCloud";
import { ModelInfo } from "@/components/dashboard/ModelInfo";
import { SentimentAnalyzer } from "@/components/dashboard/SentimentAnalyzer";
import { BrandFilter } from "@/components/dashboard/BrandFilter";
import { ReviewTable } from "@/components/dashboard/ReviewTable";

export default function DashboardPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const totalReviews = sentimentDistribution.reduce(
    (sum, s) => sum + s.value,
    0,
  );
  const positiveCount =
    sentimentDistribution.find((s) => s.name === "Positif")?.value || 0;
  const negativeCount =
    sentimentDistribution.find((s) => s.name === "Negatif")?.value || 0;
  const neutralCount =
    sentimentDistribution.find((s) => s.name === "Netral")?.value || 0;

  const filteredReviews = selectedBrand
    ? reviewData.filter((r) => r.brand === selectedBrand)
    : reviewData;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
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

        {/* Stats Grid */}
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
            suffix={`(${((positiveCount / totalReviews) * 100).toFixed(1)}%)`}
            icon={ThumbsUp}
            variant="positive"
            delay={100}
          />
          <StatCard
            title="Sentimen Negatif"
            value={negativeCount}
            suffix={`(${((negativeCount / totalReviews) * 100).toFixed(1)}%)`}
            icon={ThumbsDown}
            variant="negative"
            delay={200}
          />
          <StatCard
            title="Sentimen Netral"
            value={neutralCount}
            suffix={`(${((neutralCount / totalReviews) * 100).toFixed(1)}%)`}
            icon={Minus}
            variant="neutral"
            delay={300}
          />
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
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
        </div>

        {/* Word Cloud & Model Info */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">Kata Kunci Populer</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Kata-kata yang sering muncul dalam ulasan berdasarkan kategori
              sentimen
            </p>
            <WordCloud words={wordCloudData} />
          </div>
          <ModelInfo />
        </div>

        {/* Sentiment Analyzer */}
        <div className="mb-8">
          <SentimentAnalyzer />
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Ulasan Terbaru</h3>
              <p className="text-sm text-muted-foreground">
                Hasil klasifikasi sentimen ulasan produk laptop
              </p>
            </div>
            <BrandFilter
              brands={brandData}
              selectedBrand={selectedBrand}
              onSelect={setSelectedBrand}
            />
          </div>
          <ReviewTable reviews={filteredReviews} />
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <div>
              <p className="font-medium text-foreground">
                SentiLaptop - Analisis Sentimen
              </p>
              <p>Skripsi oleh Syafrizal Wd Mahendra (E41222719)</p>
            </div>
            <div className="text-right">
              <p>Politeknik Negeri Jember</p>
              <p>PSDKU Teknik Informatika Kampus 3 Nganjuk</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
