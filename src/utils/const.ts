import { Book, Briefcase, Code, GamepadDirectional, Laptop, Palette } from "lucide-react";

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

export const professions = [
  { value: "programmer", label: "Programmer", icon: Code },
  { value: "designer", label: "Designer", icon: Palette },
  { value: "student", label: "Student", icon: Book },
  { value: "gamer", label: "Gamer", icon: GamepadDirectional },
];
