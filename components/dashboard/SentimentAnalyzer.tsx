import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Loader2,
  Send,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Minus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisResult {
  sentiment: "positif" | "negatif" | "netral";
  confidence: number;
  keywords: string[];
}

export function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Simulated analysis - in real implementation, this would call an XGBoost model API
  const analyzeText = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

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

    const lowerText = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;
    const foundKeywords: string[] = [];

    positiveWords.forEach((word) => {
      if (lowerText.includes(word)) {
        positiveScore++;
        foundKeywords.push(word);
      }
    });

    negativeWords.forEach((word) => {
      if (lowerText.includes(word)) {
        negativeScore++;
        foundKeywords.push(word);
      }
    });

    let sentiment: AnalysisResult["sentiment"];
    let confidence: number;

    if (positiveScore > negativeScore) {
      sentiment = "positif";
      confidence = 0.75 + Math.random() * 0.2;
    } else if (negativeScore > positiveScore) {
      sentiment = "negatif";
      confidence = 0.75 + Math.random() * 0.2;
    } else {
      sentiment = "netral";
      confidence = 0.6 + Math.random() * 0.2;
    }

    setResult({
      sentiment,
      confidence,
      keywords: foundKeywords,
    });
    setIsAnalyzing(false);
  };

  const getSentimentDisplay = (sentiment: AnalysisResult["sentiment"]) => {
    const config = {
      positif: {
        icon: ThumbsUp,
        label: "Positif",
        bgClass: "bg-sentiment-positive-light",
        textClass: "text-sentiment-positive",
        borderClass: "border-sentiment-positive/30",
      },
      negatif: {
        icon: ThumbsDown,
        label: "Negatif",
        bgClass: "bg-sentiment-negative-light",
        textClass: "text-sentiment-negative",
        borderClass: "border-sentiment-negative/30",
      },
      netral: {
        icon: Minus,
        label: "Netral",
        bgClass: "bg-sentiment-neutral-light",
        textClass: "text-sentiment-neutral",
        borderClass: "border-sentiment-neutral/30",
      },
    };
    return config[sentiment];
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Analisis Sentimen Real-time</h3>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Masukkan ulasan produk laptop untuk menganalisis sentimennya menggunakan
        model XGBoost
      </p>

      <div className="space-y-4">
        <Textarea
          placeholder="Contoh: Laptop ini sangat bagus, performa cepat dan layar jernih. Sangat recommended untuk pekerjaan kantoran."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="resize-none"
        />

        <Button
          onClick={analyzeText}
          disabled={!text.trim() || isAnalyzing}
          className="w-full gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Menganalisis...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Analisis Sentimen
            </>
          )}
        </Button>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "rounded-lg border p-4",
                getSentimentDisplay(result.sentiment).bgClass,
                getSentimentDisplay(result.sentiment).borderClass,
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getSentimentDisplay(result.sentiment).icon;
                    return (
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full",
                          getSentimentDisplay(result.sentiment).bgClass,
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-6 w-6",
                            getSentimentDisplay(result.sentiment).textClass,
                          )}
                        />
                      </div>
                    );
                  })()}
                  <div>
                    <p
                      className={cn(
                        "text-xl font-bold",
                        getSentimentDisplay(result.sentiment).textClass,
                      )}
                    >
                      {getSentimentDisplay(result.sentiment).label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              {result.keywords.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    Kata Kunci Terdeteksi:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
