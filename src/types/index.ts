import { UserGender } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export interface ModelDB {
  modelName: string;
  description: string;
  accuracy: number;
  macroF1: number;
  f1Negative: number;
  f1Neutral: number;
}

export interface ProfileClientProps {
  gender?: UserGender;
  productReference?: string;
}

interface Brand {
  name: string;
  count: number;
  logo?: string;
}

export interface BrandFilterProps {
  brands: Brand[];
  selectedBrand: string | null;
  onSelect: (brand: string | null) => void;
}

export type Review = {
  id: number;
  createdAt: string;
  sentiment: Sentiment;
  keywords: string[];
  content: string;
  product: {
    name: string;
    brand: string;
  };
};

export interface ReviewTableProps {
  reviews: Review[];
}

export interface AnalysisResult {
  sentiment: "positif" | "negatif" | "netral";
  confidence: number;
  keywords: string[];
}

interface SentimentData {
  name: string;
  value: number;
  color: string;
}

export interface SentimentChartProps {
  data: SentimentData[];
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  total: number;
}

export interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "positive" | "negative" | "neutral";
  delay?: number;
}

interface TrendData {
  date: string;
  positif: number;
  negatif: number;
  netral: number;
}

export interface TrendChartProps {
  data: TrendData[];
}

export interface TrendChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

// export type WordItem = {
//   text: string;
//   value: number;
//   sentiment: "positive" | "negative" | "neutral";
// };

export interface WordCloudProps {
  words: WordItem[];
}

export interface WordCloudItemProps {
  word: WordItem;
  index: number;
  maxValue: number;
  minValue: number;
}

export interface StatCounts {
  totalReviews: number;
  positive: number;
  negative: number;
  neutral: number;
}

export interface UseStatCardProps {
  value: number;
  delay?: number;
}

export interface ReviewItem {
  id: number;
  content: string;
  sentiment: string;
  confidenceScore: number;
  createdAt: string;
  keywords: string[];
  product: {
    name: string;
    brand?: string;
  } | null;
}

export interface ApiResponse {
  message: string;
  data: ReviewItem[];
}

export type Sentiment = "positive" | "negative" | "neutral";

export type WordItem = {
  text: string;
  value: number;
  sentiment: Sentiment;
};

export type KeywordStats = {
  count: number;
} & Record<Sentiment, number>;

export type ReviewResponse = {
  message: string;
  data: Review[];
};

export type WordCloudConfig = {
  minValue: number;
  maxValue: number;
};
