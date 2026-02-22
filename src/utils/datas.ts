import { useReviewTable } from "../hooks/useReviewTable";
import {
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
        return "text-sentiment-positive hover:bg-sentiment-positive-light";
      case "NEGATIVE":
        return "text-sentiment-negative hover:bg-sentiment-negative-light";
      case "NEUTRAL":
        return "text-sentiment-neutral hover:bg-sentiment-neutral-light";
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
