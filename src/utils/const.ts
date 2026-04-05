import {
  Book,
  Code,
  GamepadDirectional,
  LucideCircleEllipsis,
  Palette,
} from "lucide-react";
import { SiAcer, SiAsus, SiLenovo, SiLinux, SiMacos } from "react-icons/si";
import { FaWindows } from "react-icons/fa";
import { Sentiment } from "@prisma/client";

const MODEL_OPTIONS = [
  {
    label: "Model XGBoost (Baseline)",
    code: "baseline",
    desc: "Raw Data (Imbalanced)",
  },
  {
    label: "Model XGBoost (Tuned)",
    code: "tuned",
    desc: "Hyperparameter Tuned",
  },
  {
    label: "Model XGBoost (Optimized)",
    code: "optimized",
    desc: "Pipeline (SMOTE + Chi2)",
  },
];

const WORD_LIMIT = 30;

const professionItems = [
  { value: "PROGRAMMER", label: "Programmer", icon: Code },
  { value: "DESIGNER", label: "Designer", icon: Palette },
  { value: "STUDENT", label: "Student", icon: Book },
  { value: "GAMER", label: "Gamer", icon: GamepadDirectional },
  { value: "OTHER", label: "Other", icon: LucideCircleEllipsis },
];

const brandItems = [
  { value: "ASUS", label: "Asus", icon: SiAsus },
  { value: "ACER", label: "Acer", icon: SiAcer },
  { value: "LENOVO", label: "Lenovo", icon: SiLenovo },
  { value: "OTHER", label: "Other", icon: LucideCircleEllipsis },
];

const OSItems = [
  { value: "WINDOWS", label: "Windows", icon: FaWindows },
  { value: "MACOS", label: "Macos", icon: SiMacos },
  { value: "LINUX", label: "Linux", icon: SiLinux },
  { value: "OTHER", label: "Other", icon: LucideCircleEllipsis },
];

const reviewDatas = [
  {
    productId: 2,
    modelId: 1,
    content:
      "Laptop ini sangat ringan dan performanya cepat untuk kerja harian.",
    keywords: ["ringan", "cepat", "kerja"],
    sentiment: Sentiment.POSITIVE,
    confidenceScore: 0.92,
  },
  {
    productId: 3,
    modelId: 1,
    content: "Baterainya awet, tapi harganya cukup mahal.",
    keywords: ["baterai", "awet", "mahal"],
    sentiment: Sentiment.NEUTRAL,
    confidenceScore: 0.75,
  },
  {
    productId: 4,
    modelId: 1,
    content: "Performa kurang stabil dan sering panas.",
    keywords: ["performa", "panas", "stabil"],
    sentiment: Sentiment.NEGATIVE,
    confidenceScore: 0.88,
  },
];

const scrapePath = "/api/scrape";
const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
const aiRecommendPath = `${backendUrl}/recommend`;
const userMetricPath = "/api/user-metric";
const profilePath = "/api/profile";
const chromiumUrl =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";
const sentimentStatsPath = "/api/review/sentiment-stats";
const productPath = "/api/product";
const reviewPath = "/api/review";
const positiveWords = [
  "bagus",
  "cepat",
  "aman",
  "baik",
  "mulus",
  "moga",
  "awet",
  "mantap",
  "sangat",
  "fungsi",
];

const negativeWords = [
  "lebih",
  "jual",
  "baru",
  "lalu",
  "tahun",
  "masalah",
  "rusak",
  "garansi",
  "layar",
  "kecewa",
];

const models = [
  {
    code: "none",
    value: "xgboost",
    label: "XGBoost (Baseline)",
    desc: "Model 1",
  },
  {
    code: "Grid Search",
    value: "xgboost",
    label: "XGBoost (Tuned)",
    desc: "Model 2",
  },
  {
    code: "recommended",
    value: "xgboost",
    label: "XGBoost (Fully Optimized)",
    desc: "Model 3",
  },
];

const predictPath = `${backendUrl}/predict`;
const socketPath = "/api/socket";
const wordCloudPath = "/api/word-cloud";

export {
  scrapePath,
  aiRecommendPath,
  userMetricPath,
  profilePath,
  chromiumUrl,
  sentimentStatsPath,
  productPath,
  reviewPath,
  positiveWords,
  negativeWords,
  models,
  predictPath,
  MODEL_OPTIONS,
  WORD_LIMIT,
  professionItems,
  brandItems,
  OSItems,
  reviewDatas,
  socketPath,
  wordCloudPath,
};
