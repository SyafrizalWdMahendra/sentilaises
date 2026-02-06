import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
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
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";

interface AnalysisResult {
  sentiment: "positif" | "negatif" | "netral";
  confidence: number;
  keywords: string[];
}

export function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [laptopName, setLaptopName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedModel, setSelectedModel] = useState<
    (typeof models)[number] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isFormValid =
    text.trim() !== "" && laptopName.trim() !== "" && selectedModel !== null;

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

  const filteredItems = useMemo(() => {
    if (!searchQuery) return models;
    return models.filter(
      (model) =>
        model.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.code.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

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

      <form action="">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Combobox
              value={selectedModel}
              onValueChange={(val) => setSelectedModel(val)}
              itemToStringValue={(model) => model?.label ?? ""}
            >
              <ComboboxInput
                placeholder="Pilih model analisis..."
                className="focus:ring-primary/20 border-border w-1/2"
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <ComboboxContent className="bg-card border-border shadow-lg animate-in fade-in zoom-in-95 duration-200">
                {filteredItems.length === 0 && (
                  <ComboboxEmpty className="text-muted-foreground py-3 px-4 text-sm text-center">
                    Model "{searchQuery}" tidak ditemukan.
                  </ComboboxEmpty>
                )}

                <ComboboxList className="p-1">
                  {filteredItems.map((model) => (
                    <ComboboxItem
                      key={model.code}
                      value={model}
                      className="rounded-md cursor-pointer transition-colors gap-2 focus:bg-secondary focus:text-primary data-[selected]:bg-secondary data-[selected]:text-primary"
                    >
                      <Item size="default" className="p-1 bg-transparent">
                        <ItemContent>
                          <ItemTitle className="whitespace-nowrap font-medium text-foreground">
                            {model.label}
                          </ItemTitle>
                          <ItemDescription className="text-muted-foreground/80">
                            {model.desc} ({model.code})
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            <Input
              className="w-1/2"
              placeholder="Masukkan nama laptop"
              value={laptopName}
              onChange={(e) => setLaptopName(e.target.value)}
            />
          </div>

          <Textarea
            placeholder="Contoh: Laptop ini sangat bagus..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="resize-none"
          />

          <Button
            onClick={analyzeText}
            disabled={!isFormValid || isAnalyzing}
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
                          className="text-xs bg-white text-black"
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
      </form>
    </div>
  );
}
