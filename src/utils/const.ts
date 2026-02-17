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
  { value: "programmer", label: "Programmer", icon: Code },
  { value: "designer", label: "Designer", icon: Palette },
  { value: "student", label: "Student", icon: Book },
  { value: "gamer", label: "Gamer", icon: GamepadDirectional },
];

export const brandItems = [
  { value: "asus", label: "Asus", icon: SiAsus },
  { value: "acer", label: "Acer", icon: SiAcer },
  { value: "lenovo", label: "Lenovo", icon: SiLenovo },
  { value: "other", label: "Other", icon: LucideCircleEllipsis },
];

export const OSItems = [
  { value: "windows", label: "Windows", icon: FaWindows },
  { value: "macos", label: "Macos", icon: SiMacos },
  { value: "linux", label: "Linux", icon: SiLinux },
  { value: "other", label: "Other", icon: LucideCircleEllipsis },
];
