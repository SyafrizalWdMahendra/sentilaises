"use client";

import { useAnalyseText } from "@/src/hooks/useAnalyzeText";
import { Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ResultSection from "./ResultSection";
import { professionItems } from "@/src/utils/const";
import { Controller } from "react-hook-form";

export default function AnalysisClient() {
  const {
    control,
    register,
    handleSubmit,
    onSubmit,
    setValue,
    errors,
    isValid,
    loading,
    result,
    showField,
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
          <div className="flex w-full gap-4">
            {/* Field Profesi */}
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Pilih Profesi
              </label>
              <Controller
                name="profession"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`w-full ${errors.profession ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Pilih Profesi" />
                    </SelectTrigger>
                    <SelectContent className="bg-card" position="popper">
                      {professionItems.map((item) => (
                        <SelectItem key={item.value} value={item.value} className="focus:bg-primary focus:text-card">
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.profession.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tautan Produk 1
              </label>
              <Input
                type="text"
                placeholder="Contoh: https://www.tokopedia.com/lenovo/thinkpad-x1-carbon"
                className={`${errors.url1 ? "border-red-500 focus:ring-red-500" : "focus:ring-primary"}`}
                {...register("url1")}
              />
              {errors.url1 && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.url1.message}
                </p>
              )}
            </div>

            {/* Field Merek Laptop (Sekarang bernama preferredBrand) */}
            {/* <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Pilih Merek
              </label>
              <Controller
                name="brands"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`w-full ${errors.brands ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Pilih Merek Laptop" />
                    </SelectTrigger>
                    <SelectContent className="bg-card" position="popper">
                      {brandItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
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
              {errors.brands && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.brands.message}
                </p>
              )}
            </div> */}
          </div>

          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tautan Produk 2
              </label>
              <Input
                type="text"
                placeholder="Contoh: https://www.tokopedia.com/lenovo/thinkpad-x1-carbon"
                className={`w-full ${errors.url2 ? "border-red-500 focus:ring-red-500" : "focus:ring-primary"}`}
                {...register("url2")}
              />
              {errors.url2 && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.url2.message}
                </p>
              )}
            </div>

            {/* {showField ? (
              <div className="w-1/2 mr-auto animate-in fade-in">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Tautan Produk 3
                </label>
                <div className="flex gap-2">
                  <div className="w-full flex flex-col">
                    <Input
                      type="text"
                        placeholder="Contoh: https://www.tokopedia.com/lenovo/thinkpad-x1-carbon"
                      className={`w-full ${errors.url3 ? "border-red-500 focus:ring-red-500" : "focus:ring-primary"}`}
                      {...register("url3")}
                    />
                    {errors.url3 && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.url3.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowField(false);
                      setValue("url3", "");
                    }}
                    className="text-red-500"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-max mt-4">
                <Button
                  type="button"
                  onClick={() => setShowField(true)}
                  variant="outline"
                >
                  + Tambah Tautan Produk Lainnya
                </Button>
              </div>
            )} */}

            {showField ? (
              <div className="w-1/2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Tautan Produk 3
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Contoh: https://www.tokopedia.com/lenovo/thinkpad-x1-carbon"
                    className={`w-full ${errors.url3 ? "border-red-500 focus:ring-red-500" : "focus:ring-primary"}`}
                    {...register("url3")}
                  />
                  {errors.url3 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.url3.message}
                    </p>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowField(false);
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-1/2 items-end flex">
                <Button
                  type="button"
                  onClick={() => setShowField(true)}
                  className="w-full bg-card text-primary hover:bg-[#F8FBFF] border-dashed border border-primary/20 transition-all shadow-xs"
                >
                  + Tambah Tautan Produk Lainnya
                </Button>
              </div>
            )}
          </div>

          {/* <div className="flex w-full gap-4 justify-center">
           
          </div> */}
        </div>

        <Button
          type="submit"
          disabled={!isValid || loading}
          className="bg-primary text-white px-6 py-3 mt-6 rounded-md transition-colors disabled:bg-gray-400"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {loading ? "Menganalisis..." : "Bandingkan Sekarang"}
        </Button>
      </form>

      <ResultSection result={result} />
    </div>
  );
}
