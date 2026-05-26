"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Info,
  Database,
  Brain,
  Eye,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AspectScoreInfoProps {
  isDark: boolean;
  aspectScores: Record<string, number>;
  totalReviews: number;
  positiveCount: number;
  negativeCount: number;
}

const ASPECT_KEYWORD_SAMPLES: Record<string, string[]> = {
  performa: ["cepat", "kencang", "lancar", "lag", "lemot", "gaming", "render"],
  layar: [
    "jernih",
    "tajam",
    "cerah",
    "resolusi",
    "oled",
    "refresh rate",
    "dead pixel",
  ],
  baterai: [
    "awet",
    "tahan lama",
    "boros",
    "cepat habis",
    "cas",
    "charging",
    "mah",
  ],
  harga: [
    "murah",
    "mahal",
    "worth it",
    "terjangkau",
    "promo",
    "diskon",
    "budget",
  ],
};

const ASPECT_ICONS: Record<string, string> = {
  performa: "⚡",
  layar: "🖥️",
  baterai: "🔋",
  harga: "💰",
};

function ScoreBar({ score, isDark }: { score: number; isDark: boolean }) {
  const barColor =
    score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500";
  const textColor =
    score >= 80
      ? "text-green-500"
      : score >= 60
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="flex items-center gap-2 w-full">
      <div
        className={`flex-1 h-1.5 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <div
          className={`h-1.5 rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span
        className={`text-xs font-mono font-semibold w-9 text-right ${textColor}`}
      >
        {score.toFixed(0)}%
      </span>
    </div>
  );
}

function StatusBadge({ score, isDark }: { score: number; isDark: boolean }) {
  if (score >= 80)
    return (
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isDark ? "bg-green-900/40 text-green-400" : "bg-green-50 text-green-600"}`}
      >
        ✓ Unggul
      </span>
    );
  if (score >= 60)
    return (
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isDark ? "bg-yellow-900/40 text-yellow-400" : "bg-yellow-50 text-yellow-600"}`}
      >
        ⚠ Perhatian
      </span>
    );
  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isDark ? "bg-red-900/40 text-red-400" : "bg-red-50 text-red-600"}`}
    >
      ✗ Lemah
    </span>
  );
}

function Divider({ isDark }: { isDark: boolean }) {
  return (
    <div className={`h-px w-full ${isDark ? "bg-gray-700" : "bg-gray-100"}`} />
  );
}

function SectionLabel({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <p
      className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}
    >
      {children}
    </p>
  );
}

export default function AspectScoreInfo({
  isDark,
  aspectScores,
  totalReviews,
  positiveCount,
  negativeCount,
}: AspectScoreInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveStep(null);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  const generalScore =
    totalReviews > 0 ? ((positiveCount / totalReviews) * 100).toFixed(1) : "0";

  const steps = [
    {
      title: "Ulasan dipindai kata kunci per aspek",
      description:
        "Sistem mencari kata-kata tertentu di setiap ulasan, seperti 'awet' untuk baterai atau 'lag' untuk performa. Ulasan yang mengandung kata tersebut akan dianalisis lebih lanjut oleh sistem.",
    },
    {
      title: "Model XGBoost mengklasifikasikan sentimen",
      description:
        "Ulasan yang menyebut aspek tersebut kemudian diklasifikasi oleh model prediksi. Apakah bernada positif, negatif, atau netral?",
    },
    {
      title: "Skor dihitung dari rasio positif",
      description:
        "Semakin banyak pembeli yang puas terhadap suatu aspek, semakin tinggi skornya. Misalnya jika 8 dari 10 pembeli senang dengan baterai produk ini, maka skor baterainya 80%.",
    },
  ];

  const trustReasons = [
    {
      icon: Database,
      title: "Berbasis ulasan nyata pembeli",
      desc: "Data diambil langsung dari halaman ulasan Tokopedia via scraping, bukan dari spesifikasi produk atau klaim penjual.",
    },
    {
      icon: Brain,
      title: "Model XGBoost Optimized (akurasi 73%)",
      desc: "Dilatih dengan pipeline SMOTE + seleksi fitur Chi-Square + Grid Search, divalidasi pada data terpisah.",
    },
    {
      icon: Eye,
      title: "Cara kerja sistem dapat ditelusuri",
      desc: "Setiap aspek punya daftar kata kunci tetap yang bisa diaudit. Sistem hanya menghitung proporsi dari apa yang pembeli tulis.",
    },
  ];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-10 flex items-center justify-center p-4"
          style={{ isolation: "isolate" }}
        >
          <div
            className={`absolute inset-0 backdrop-blur-sm ${isDark ? "bg-black/60" : "bg-black/40"}`}
            onClick={close}
            aria-hidden="true"
          />
          ``
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative w-full max-w-md max-h-[85vh] overflow-hidden rounded-2xl border shadow-2xl flex flex-col ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Transparansi metodologi skor aspek"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`shrink-0 flex items-center justify-between px-5 py-4 border-b ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Info
                  className={`w-4 h-4 ${isDark ? "text-blue-400" : "text-primary"}`}
                />
                <div>
                  <p
                    className={`text-sm font-semibold leading-tight ${isDark ? "text-white" : "text-gray-800"}`}
                  >
                    Transparansi Metodologi
                  </p>
                  <p
                    className={`text-[11px] leading-tight ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Dari mana angka persentase ini berasal?
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Tutup"
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isDark
                    ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                    : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              <div>
                <SectionLabel isDark={isDark}>
                  Skor aspek pada produk ini
                </SectionLabel>
                <div className="space-y-3">
                  {Object.entries(aspectScores).map(([aspect, score]) => (
                    <div key={aspect} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">
                            {ASPECT_ICONS[aspect] ?? "📊"}
                          </span>
                          <span
                            className={`text-xs font-medium capitalize ${isDark ? "text-gray-300" : "text-gray-600"}`}
                          >
                            {aspect}
                          </span>
                        </div>
                        <StatusBadge score={score} isDark={isDark} />
                      </div>
                      <ScoreBar score={score} isDark={isDark} />
                      <div className="flex flex-wrap gap-1">
                        {(ASPECT_KEYWORD_SAMPLES[aspect] ?? [])
                          .slice(0, 4)
                          .map((kw) => (
                            <span
                              key={kw}
                              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                                isDark
                                  ? "bg-gray-700 text-gray-400"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {kw}
                            </span>
                          ))}
                        <span
                          className={`text-[10px] px-1 py-0.5 ${isDark ? "text-gray-600" : "text-gray-400"}`}
                        >
                          + lainnya
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Divider isDark={isDark} />

              <div>
                <SectionLabel isDark={isDark}>
                  Statistik ulasan produk ini
                </SectionLabel>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      label: "Total",
                      value: totalReviews,
                      cls: isDark
                        ? "bg-gray-700 text-white"
                        : "bg-gray-50 text-gray-700",
                    },
                    {
                      label: "Positif",
                      value: `${positiveCount} (${generalScore}%)`,
                      cls: isDark
                        ? "bg-green-900/40 text-green-400"
                        : "bg-green-50 text-green-700",
                    },
                    {
                      label: "Negatif",
                      value: `${negativeCount} (${(100 - parseFloat(generalScore)).toFixed(1)}%)`,
                      cls: isDark
                        ? "bg-red-900/40 text-red-400"
                        : "bg-red-50 text-red-700",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={`rounded-lg p-3 text-center ${s.cls}`}
                    >
                      <p className="text-sm font-semibold leading-tight">
                        {s.value}
                      </p>
                      <p className="text-[10px] mt-0.5 opacity-75">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div
                  className={`flex items-start gap-1.5 mt-2.5 p-2.5 rounded-lg ${isDark ? "bg-gray-700/50" : "bg-amber-50"}`}
                >
                  <AlertCircle
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isDark ? "text-gray-400" : "text-amber-500"}`}
                  />
                  <p
                    className={`text-[11px] leading-relaxed ${isDark ? "text-gray-400" : "text-amber-700"}`}
                  >
                    Aspek yang jarang disebut dalam ulasan cenderung memiliki
                    skor yang kurang representatif. Semakin banyak ulasan
                    menyebut aspek tersebut, semakin valid skornya.
                  </p>
                </div>
              </div>

              <Divider isDark={isDark} />

              <div>
                <SectionLabel isDark={isDark}>Cara skor dihitung</SectionLabel>
                <div className="space-y-2">
                  {steps.map((step, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveStep(activeStep === i ? null : i)}
                      className={`w-full text-left rounded-lg p-3 border transition-all duration-200 cursor-pointer ${
                        activeStep === i
                          ? isDark
                            ? "bg-blue-900/30 border-blue-700"
                            : "bg-blue-50 border-blue-200"
                          : isDark
                            ? "border-gray-700 hover:bg-gray-700"
                            : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            activeStep === i
                              ? "bg-blue-500 text-white"
                              : isDark
                                ? "bg-gray-600 text-gray-300"
                                : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                          >
                            {step.title}
                          </p>
                          <AnimatePresence>
                            {activeStep === i && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.18 }}
                                className={`text-[11px] mt-1.5 leading-relaxed overflow-hidden ${isDark ? "text-gray-400" : "text-gray-500"}`}
                              >
                                {step.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        <ChevronDown
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-transform duration-200 ${
                            activeStep === i ? "rotate-180" : ""
                          } ${isDark ? "text-gray-500" : "text-gray-400"}`}
                        />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <p
                    className={`text-[11px] mb-1.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Formula yang digunakan:
                  </p>
                  <div
                    className={`rounded-lg p-3 font-mono text-[11px] leading-relaxed border ${
                      isDark
                        ? "bg-gray-900 text-gray-300 border-gray-700"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    <span
                      className={isDark ? "text-blue-400" : "text-blue-600"}
                    >
                      Skor Aspek
                    </span>
                    {" = ("}
                    <span
                      className={isDark ? "text-green-400" : "text-green-600"}
                    >
                      ulasan positif menyebut aspek
                    </span>
                    {" ÷ "}
                    <span
                      className={isDark ? "text-yellow-400" : "text-yellow-600"}
                    >
                      total ulasan menyebut aspek
                    </span>
                    {") × 100%"}
                  </div>
                </div>
              </div>

              <Divider isDark={isDark} />

              <div>
                <SectionLabel isDark={isDark}>
                  Mengapa angka ini bisa dipercaya?
                </SectionLabel>
                <div className="space-y-3">
                  {trustReasons.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-3 items-start">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isDark ? "bg-blue-900/40" : "bg-blue-50"}`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 ${isDark ? "text-blue-400" : "text-blue-500"}`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-xs font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                        >
                          {title}
                        </p>
                        <p
                          className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? "text-gray-500" : "text-gray-400"}`}
                        >
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-1" />
            </div>

            <div
              className={`shrink-0 px-5 py-3 border-t ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
            >
              <button
                type="button"
                onClick={close}
                className={`w-full py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isDark
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Mengerti, tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 mt-3 ${
          isDark
            ? "border-gray-700 text-gray-400 hover:bg-blue-900/30 hover:text-blue-400 hover:border-blue-800"
            : "border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
        }`}
      >
        <Info className="w-3.5 h-3.5" />
        <span>Dari mana angka ini berasal?</span>
      </button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
