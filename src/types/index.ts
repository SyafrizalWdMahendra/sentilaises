import { LucideIcon } from "lucide-react";
import { OS, Profession, Sentiment, Brand } from "@prisma/client";
import z from "zod";
import { profileSchema } from "../app/validation/profile.schema";

export interface ModelDB {
  modelName: string;
  description: string | null;
  accuracy: number;
  macroF1: number;
  f1Negative: number;
  f1Neutral: number;
  isActive: boolean;
}

export interface ProfileClientProps {
  name: string;
  bio?: string;
  preferenceBrand: string;
  preferenceOS: string;
  budgetMin: number;
  budgetMax: number;
  profession: string;
  id?: number;
}

// interface Brand {
//   name: string;
//   count: number;
//   logo?: string;
// }

export interface BrandFilterProps {
  // brands: Brand[];
  selectedBrand: string | null;
  onSelect: (brand: string | null) => void;
}

export type Review = {
  brand: string;
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
  sentiment: Sentiment;
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
  payload?: LegendPayloadItem[];
  label?: string;
}

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
  sentiment: Sentiment;
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

export interface CLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

export type LegendPayloadItem = {
  color?: string;
  name?: string;
  value?: string;
};

export interface ScrapeResult {
  name: string;
  url: string;
  reviews: string[];
}

export interface ProductDetail {
  name: string;
  url: string;
  general_sentiment_score: number;
  profession_compatibility_score: number;
  verdict: string;
  top_keywords: string[];
}

export interface AnalysisResults {
  profession_target: string;
  winning_product: string;
  details: ProductDetail[];
}

export interface ResultProps {
  result: AnalysisResults | null;
}

export type ProfileFormData = z.input<typeof profileSchema>;

export type ProfileModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  professionItems: { value: string; label: string; icon: any }[];
  brandItems: { value: string; label: string; icon: any }[];
  OSItems: { value: string; label: string; icon: any }[];
};

export interface WordCLoud {
  topKeywords: string;
}

export interface ModalProps extends ProfileModalProps {
  userData: {
    name: string;
    bio: string;
    preference: {
      profession: Profession;
      preferredBrand: Brand;
      preferredOS: OS;
      budgetMin: number;
      budgetMax: number;
    };
  };
}

export interface ExtendedModalProps extends ProfileModalProps {
  userData: any;
  onOptimisticUpdate: (data: ProfileFormData) => void;
  router: any;
}

export interface ProfileState {
  name: string;
  bio: string;
  preference: {
    profession: Profession | string;
    preferredBrand: Brand | string;
    preferredOS: OS | string;
    budgetMin: number;
    budgetMax: number;
  };
}

export type UseProfileModalProps = Pick<
  ExtendedModalProps,
  "userData" | "router" | "onOptimisticUpdate" | "setShowModal"
>;
