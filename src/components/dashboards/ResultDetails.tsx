import { useResultDetails } from "@/src/hooks/useResultDetails";
import { ResultProps } from "@/src/types";
import { getHighlights, toTitleCase } from "@/src/utils/datas";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Trophy,
} from "lucide-react";

export default function ResultDetails({ result }: ResultProps) {
  const {
    activeProductIndex = 0,
    totalProducts = 0,
    nextProduct,
    prevProduct,
  } = useResultDetails({ result }) || {};

  if (!result || !result.details || result.details.length === 0) return null;

  return (
    <div className="space-y-6 w-1/2">
      <div className="relative group border p-8 rounded-xl bg-card h-100 overflow-hidden">
        {activeProductIndex > 0 && (
          <button
            onClick={prevProduct}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer bg-secondary text-primary hover:bg-primary hover:text-white transition-all z-2 shadow-md animate-in fade-in zoom-in duration-300"
            aria-label="Previous Product"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {[...result.details]
          .sort((a, b) => {
            if (a.name === result.winning_product) return -1;
            if (b.name === result.winning_product) return 1;
            return 0;
          })
          .map((item: any, index: number) => {
            if (index !== activeProductIndex) return null;

            const { strongest, weakest } = getHighlights(item.aspect_scores);
            const isPositive = item.general_score > 70;
            const isNegative = item.general_score < 40;

            let bgClass = isPositive
              ? "bg-sentiment-positive-light text-sentiment-positive border-sentiment-positive/20"
              : isNegative
                ? "bg-sentiment-negative-light text-sentiment-negative border-sentiment-negative/20"
                : "bg-sentiment-neutral-light text-sentiment-neutral border-sentiment-neutral/20";

            return (
              <div
                key={`${item.name}-${index}`}
                className="animate-in slide-in-from-right-5 fade-in duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="max-w-[70%]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                      Produk {index + 1} dari {totalProducts}
                    </span>
                    <h4 className="font-bold text-2xl text-gray-800 mt-1 line-clamp-2">
                      {toTitleCase(item.name)}
                    </h4>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-xs font-semibold inline-flex items-center mt-2 hover:underline gap-1"
                    >
                      Buka di Tokopedia <ExternalLink size={12} />
                    </a>
                  </div>
                  <div
                    className={`px-5 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest border shrink-0 ${bgClass}`}
                  >
                    {item.verdict}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-4">
                    <div className="p-2 bg-white rounded-xl text-blue-500 shadow-sm shrink-0">
                      <Trophy size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-black text-blue-500 truncate">
                        Kekuatan Utama
                      </p>
                      <p className="text-base font-bold text-gray-700 capitalize truncate">
                        {strongest[0]}: {strongest[1]}%
                      </p>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center gap-4">
                    <div className="p-2 bg-white rounded-xl text-orange-500 shadow-sm shrink-0">
                      <AlertCircle size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-black text-orange-500 truncate">
                        Perlu Diperhatikan
                      </p>
                      <p className="text-base font-bold text-gray-700 capitalize truncate">
                        {weakest[0]}: {weakest[1]}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 p-5 rounded-2xl border border-blue-50 italic text-gray-600 text-sm leading-relaxed mb-4">
                  &ldquo;{item.description}&rdquo;
                </div>
              </div>
            );
          })}

        {activeProductIndex < totalProducts - 1 && (
          <button
            onClick={nextProduct}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer bg-secondary text-primary hover:bg-primary hover:text-white transition-all z-2 shadow-md animate-in fade-in zoom-in duration-300"
            aria-label="Next Product"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
