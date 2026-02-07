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

export interface Review {
  id: string;
  product: string;
  brand: string;
  review: string;
  rating: number;
  sentiment: "positif" | "negatif" | "netral";
  date: string;
  confidence: number;
}

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

export interface WordItem {
  text: string;
  value: number;
  sentiment: "positive" | "negative" | "neutral";
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
