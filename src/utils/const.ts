import {
  Book,
  Code,
  GamepadDirectional,
  LucideCircleEllipsis,
  Palette,
} from "lucide-react";
import { SiAcer, SiAsus, SiLenovo, SiLinux, SiMacos } from "react-icons/si";
import { FaWindows } from "react-icons/fa";

export const MODEL_OPTIONS = [
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

export const WORD_LIMIT = 15;

export const professionItems = [
  { value: "PROGRAMMER", label: "Programmer", icon: Code },
  { value: "DESIGNER", label: "Designer", icon: Palette },
  { value: "STUDENT", label: "Student", icon: Book },
  { value: "GAMER", label: "Gamer", icon: GamepadDirectional },
  { value: "OTHER", label: "Other", icon: LucideCircleEllipsis },
];

export const brandItems = [
  { value: "ASUS", label: "Asus", icon: SiAsus },
  { value: "ACER", label: "Acer", icon: SiAcer },
  { value: "LENOVO", label: "Lenovo", icon: SiLenovo },
  { value: "OTHER", label: "Other", icon: LucideCircleEllipsis },
];

export const OSItems = [
  { value: "WINDOWS", label: "Windows", icon: FaWindows },
  { value: "MACOS", label: "Macos", icon: SiMacos },
  { value: "LINUX", label: "Linux", icon: SiLinux },
  { value: "OTHER", label: "Other", icon: LucideCircleEllipsis },
];
