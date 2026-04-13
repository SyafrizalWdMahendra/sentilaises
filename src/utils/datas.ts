import { Minus, ThumbsDown, ThumbsUp } from "lucide-react";
import {
  AnalysisResult,
  RadarProps,
  ScrapeResult,
  VisiblePageProps,
  WordCloudConfig,
  WordItem,
} from "../types";
import { Brand } from "@prisma/client";

export const setWordCloud = ({ maxValue, minValue }: WordCloudConfig) => {
  const getSize = (value: number) => {
    if (maxValue === minValue) return 1.5;
    const normalized = (value - minValue) / (maxValue - minValue);
    return 0.75 + normalized * 1.5;
  };

  const getColor = (sentiment: WordItem["sentiment"]) => {
    switch (sentiment) {
      case "POSITIVE":
        return "text-sentiment-positive hover:bg-sentiment-positive/10";
      case "NEGATIVE":
        return "text-sentiment-negative hover:bg-sentiment-negative/10";
      case "NEUTRAL":
        return "text-sentiment-neutral hover:bg-sentiment-neutral/10";
      default:
        return "hover:bg-primary hover:text-card";
    }
  };

  return { getSize, getColor };
};

export const getFallbackData = (url: string): ScrapeResult => {
  return {
    name: "Produk (Data Sampel)",
    url: url,
    reviews: [
      "Laptop ini performanya sangat kencang untuk coding backend dan docker.",
      "Layar OLED-nya juara banget, warnanya tajam cocok buat desain di Illustrator.",
      "Keyboard travel distance-nya pas, enak buat ngetik skripsi berjam-jam.",
      "Sayang port-nya agak sedikit, butuh dongle tambahan.",
      "Baterai lumayan awet bisa tahan 6-7 jam pemakaian normal office.",
      "Buat main game ringan seperti Valorant masih oke, fps stabil.",
      "Build quality kokoh, terasa premium walau body plastik.",
      "Pengiriman cepat dan packing kayu sangat aman.",
    ],
  };
};

export const formatRupiah = (value: number | string) => {
  if (!value) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
};

export const brandFormat = ({
  preferenceBrand,
}: {
  preferenceBrand: Brand | string;
}) => {
  const brands = Array.isArray(preferenceBrand)
    ? preferenceBrand
    : preferenceBrand
      ? [preferenceBrand]
      : [];
  return { brands };
};

export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getVisiblePages = (data: VisiblePageProps) => {
  if (data.totalPages <= 6) {
    return Array.from({ length: data.totalPages }, (_, i) => i + 1);
  }

  if (data.currentPage <= 3) {
    return [1, 2, 3, 4, 5, "...", data.totalPages];
  }

  if (data.currentPage >= data.totalPages - 2) {
    return [
      1,
      "...",
      data.totalPages - 4,
      data.totalPages - 3,
      data.totalPages - 2,
      data.totalPages - 1,
      data.totalPages,
    ];
  }

  return [
    1,
    "...",
    data.currentPage - 1,
    data.currentPage,
    data.currentPage + 1,
    "...",
    data.totalPages,
  ];
};

export const getGridClass = (count: number) => {
  if (count === 1) return "max-w-md mx-auto";
  if (count === 2) return "grid-cols-1 md:grid-cols-2";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
};

export const getHighlights = (aspectScores: Record<string, number>) => {
  const entries = Object.entries(aspectScores);
  if (entries.length === 0)
    return { strongest: ["N/A", 0], weakest: ["N/A", 0] };

  const strongest = entries.reduce((a, b) => (a[1] > b[1] ? a : b));
  const weakest = entries.reduce((a, b) => (a[1] < b[1] ? a : b));

  return { strongest, weakest };
};

export const radarFormat = ({ data }: RadarProps) => {
  const subjects = ["performa", "layar", "baterai", "harga"];

  const chartData = subjects.map((subject) => {
    const entry: any = { subject: subject.toUpperCase() };
    data.forEach((product) => {
      entry[product.name] = product.aspect_scores[subject];
    });
    return entry;
  });

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

  return { chartData, colors };
};

export const configDisplay = (sentiment: AnalysisResult["sentiment"]) => {
  const config = {
    POSITIVE: {
      icon: ThumbsUp,
      label: "Positif",
      bgClass: "bg-sentiment-positive-light",
      textClass: "text-sentiment-positive",
      borderClass: "border-sentiment-positive/30",
    },
    NEGATIVE: {
      icon: ThumbsDown,
      label: "Negatif",
      bgClass: "bg-sentiment-negative-light",
      textClass: "text-sentiment-negative",
      borderClass: "border-sentiment-negative/30",
    },
    NEUTRAL: {
      icon: Minus,
      label: "Netral",
      bgClass: "bg-sentiment-neutral-light",
      textClass: "text-sentiment-neutral",
      borderClass: "border-sentiment-neutral/30",
    },
  };
  return config[sentiment];
};
