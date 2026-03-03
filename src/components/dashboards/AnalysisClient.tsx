"use client";

import { useAnalyseText } from "@/src/hooks/useAnalyzeText";
import { Sparkles } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ResultSection from "./ResultSection";

export default function AnalysisClient() {
  const {
    errors,
    isValid,
    loading,
    result,
    showField,
    resultRef,
    register,
    handleSubmit,
    onSubmit,
    setShowField,
  } = useAnalyseText();

  return (
    <div className="w-full mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg border mb-8"
      >
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Analisis Sentimen Real-time</h3>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Pilih Profesi
              </label>
              <Controller
                name="profession"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`w-full ${errors.profession ? "border-sentiment-negative" : ""}`}
                    >
                      <SelectValue placeholder="Pilih Profesi" />
                    </SelectTrigger>
                    <SelectContent className="bg-card" position="popper">
                      {professionItems.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="focus:bg-primary focus:text-card"
                        >
                          <div className="flex gap-2 items-center">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.profession && (
                <p className="text-sentiment-negative text-xs mt-1">
                  {errors.profession.message}
                </p>
              )}
            </div> */}

            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tautan Produk 1
              </label>
              <Input
                type="text"
                placeholder="Contoh: https://tokopedia.com/..."
                className={`${errors.url1 ? "border-sentiment-negative" : "focus:ring-primary"}`}
                {...register("url1")}
              />
              {errors.url1 && (
                <p className="text-sentiment-negative text-xs mt-1">
                  {errors.url1.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tautan Produk 2
              </label>
              <Input
                type="text"
                placeholder="Contoh: https://tokopedia.com/..."
                className={`w-full ${errors.url2 ? "border-sentiment-negative" : "focus:ring-primary"}`}
                {...register("url2")}
              />
              {errors.url2 && (
                <p className="text-sentiment-negative text-xs mt-1">
                  {errors.url2.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tautan Produk 3
              </label>
              <Input
                type="text"
                placeholder="Contoh: https://tokopedia.com/..."
                className={`w-full ${errors.url3 ? "border-sentiment-negative" : "focus:ring-primary"}`}
                {...register("url3")}
              />
              {errors.url3 && (
                <p className="text-sentiment-negative text-xs mt-1">
                  {errors.url3.message}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col justify-end">
              {showField ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Tautan Produk 4
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Contoh: https://tokopedia.com/..."
                        className={`${errors.url4 ? "border-sentiment-negative" : "focus:ring-primary"}`}
                        {...register("url4")}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowField(false)}
                      className="text-sentiment-negative hover:text-sentiment-negative hover:bg-sentiment-negative-light shrink-0"
                    >
                      ✕
                    </Button>
                  </div>
                  {errors.url4 && (
                    <p className="text-sentiment-negative text-xs mt-1">
                      {errors.url4.message}
                    </p>
                  )}
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => setShowField(true)}
                  className="w-full h-max bg-card text-primary hover:bg-[#F8FBFF] border-dashed border border-primary/20 transition-all shadow-xs"
                >
                  + Tambah Tautan Produk Lainnya
                </Button>
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid || loading}
          className="w-full md:w-max bg-primary text-white px-6 py-3 mt-6 rounded-md transition-colors disabled:bg-gray-400"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Menganalisis..." : "Analisis Sekarang"}
        </Button>
      </form>

      <div ref={resultRef} id="result-section" className="scroll-mt-20">
        {result && <ResultSection result={result} />}
      </div>
    </div>
  );
}
