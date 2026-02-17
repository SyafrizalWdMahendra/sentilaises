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

export default function AnalysisClient() {
  const {
    url1,
    url2,
    url3,
    profession,
    loading,
    result,
    disabled,
    showField,
    handleAnalyze,
    setProfession,
    setUrl1,
    setUrl2,
    setDisabled,
    setUrl3,
    setShowField,
  } = useAnalyseText();

  return (
    <div className="w-full mx-auto">
      <div className="bg-white p-6 rounded-lg border mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Analisis Sentimen Real-time</h3>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Pilih Profesi/Kebutuhan:
            </label>
            <Select value={profession} onValueChange={setProfession} required>
              <SelectTrigger
                className={`w-full mb-6 ${!profession ? "text-gray-500" : "text-black"}`}
              >
                <SelectValue placeholder="Pilih Profesi/Kebutuhan" />
              </SelectTrigger>

              <SelectContent
                className="bg-card border-border shadow-lg"
                position="popper"
              >
                {professionItems.map((item) => {
                  const PIcon = item.icon;
                  return (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card"
                    >
                      <div className="flex gap-2 items-center">
                        <span>
                          <PIcon className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <span>{item.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tautan Produk 1
            </label>
            <Input
              type="text"
              placeholder="Contoh: https://www.tokopedia.com/lenovo/thinkpad-x1-carbon"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              className="border rounded-md focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <div className="flex w-full gap-4 items-end">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tautan Produk 2
            </label>
            <Input
              type="text"
              placeholder="Contoh: https://www.tokopedia.com/..."
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              className="border rounded-md focus:ring-2 focus:ring-primary w-full"
              required
            />
          </div>

          {showField ? (
            <div className="w-1/2 animate-in fade-in slide-in-from-left-2 duration-300">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tautan Produk 3
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Contoh: https://www.tokopedia.com/..."
                  value={url3}
                  onChange={(e) => setUrl3(e.target.value)}
                  className="border p-2 rounded-md focus:ring-2 focus:ring-primary w-full"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowField(false);
                    setUrl3("");
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                >
                  ✕
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-1/2 ">
              <Button
                type="button"
                onClick={() => setShowField(true)}
                className="w-full bg-[#F8FBFF] text-primary hover:text-white border-dashed border border-primary/20 hover:bg-primary transition-all"
              >
                + Tambah Tautan Produk Lainnya
              </Button>
            </div>
          )}
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={!url1 || !url2 || !profession || loading}
          className={`bg-primary cursor-pointer text-white px-6 py-3 mt-6 rounded-md w-max transition-colors disabled:bg-gray-400`}
        >
          <Sparkles className="h-4 w-4 text-white" />
          {loading
            ? "Sedang Mengambil Ulasan & Menganalisis..."
            : "Bandingkan Sekarang"}
        </Button>
      </div>

      <ResultSection result={result} />
    </div>
  );
}
