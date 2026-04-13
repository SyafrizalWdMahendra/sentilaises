"use client";

import { useAnalyseText } from "@/src/hooks/useAnalyzeText";
import { Sparkles, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ResultSection from "./ResultSection";
import UrlInputList from "./UrlInputList";

export default function AnalysisClient({ isDark }: { isDark: boolean }) {
  const {
    isValid,
    errors,
    loading,
    result,
    resultRef,
    progress,
    visibleFields,
    urlDatas,
    register,
    handleSubmit,
    onSubmit,
    handleCancel,
    setVisibleFields,
  } = useAnalyseText();

  return (
    <div className="w-full mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-6 rounded-lg mb-8 ${isDark ? "bg-gray-800 border-transparent" : "bg-white border border-gray-200"} transition-all duration-500`}
      >
        <div className="mb-4 flex items-center gap-2">
          <Sparkles
            className={`h-5 w-5 text-primary ${isDark ? "text-white" : "text-black"} transition-all duration-500`}
          />
          <h3
            className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"} transition-all duration-500`}
          >
            Analisis Sentimen Real-time
          </h3>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label
                className={`block mb-1 text-sm font-medium ${isDark ? "text-white" : "text-gray-700"} transition-all duration-500`}
              >
                Tautan Produk 1
              </label>
              <Input
                type="url"
                placeholder="Contoh: https://tokopedia.com/..."
                className={`${errors.url1 ? "border-sentiment-negative" : "focus:ring-primary"} ${isDark ? "bg-gray-800 text-white" : "bg-white"} transition-all duration-500 w-full`}
                {...register("url1")}
              />
              {errors.url1 && (
                <p className="text-sentiment-negative text-xs mt-1">
                  {errors.url1.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                className={`block mb-1 text-sm font-medium ${isDark ? "text-white" : "text-gray-700"} transition-all duration-500`}
              >
                Tautan Produk 2
              </label>
              <Input
                type="url"
                placeholder="Contoh: https://tokopedia.com/..."
                className={`${errors.url2 ? "border-sentiment-negative" : "focus:ring-primary"} ${isDark ? "bg-gray-800 text-white" : "bg-white"} transition-all duration-500 w-full`}
                {...register("url2")}
              />
              {errors.url2 && (
                <p className="text-sentiment-negative text-xs mt-1">
                  {errors.url2.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end transition-all duration-500">
            <UrlInputList
              urlDatas={urlDatas}
              visibleFields={visibleFields}
              setVisibleFields={setVisibleFields}
              isDark={isDark}
            />

            {visibleFields < 2 && (
              <div
                className={`
                  transition-all duration-500 ease-in-out
                  ${visibleFields === 0 ? "col-span-1 md:col-span-2 flex justify-center" : "col-span-1"}
                `}
              >
                <Button
                  type="button"
                  onClick={() => setVisibleFields((prev) => prev + 1)}
                  className={`
                    h-max bg-card text-primary
                    border-dashed border border-primary/20 shadow-xs
                    transition-all duration-500 animate-in fade-in zoom-in-95
                    ${visibleFields === 0 ? "w-full md:w-1/2" : "w-full"}
                    ${isDark ? "bg-gray-800 text-white hover:bg-gray-900 border-dashed border border-white" : "text-black hover:bg-[#F8FBFF] "}
                  `}
                >
                  {visibleFields === 0
                    ? "+ Tambah Tautan Produk"
                    : "+ Tambah Tautan Produk Lainnya"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="mt-4 bg-transparent">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{progress.status}</span>
              <span className="text-sm font-medium">{progress.percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${isDark ? "bg-gray-900" : "bg-primary"}`}
                style={{ width: `${progress.percent}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {loading && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleCancel}
              className="w-full bg-sentiment-negative/10 text-sentiment-negative md:w-max px-6 py-3 mt-6 rounded-md transition-colors disabled:bg-gray-400"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
          )}
          <Button
            type="submit"
            hidden={loading}
            disabled={!isValid}
            className={`w-full md:w-max ${isDark ? "bg-gray-900 hover:bg-card hover:text-black" : "bg-primary text-white"} px-6 py-3 mt-6 rounded-md transition-colors disabled:bg-gray-400`}
          >
            <Sparkles className="h-4 w-4" />
            {loading ? "Menganalisis..." : "Analisis Sekarang"}
          </Button>
        </div>
      </form>

      <div ref={resultRef} id="result-section" className="scroll-mt-28">
        {result && <ResultSection result={result} />}
      </div>
    </div>
  );
}
