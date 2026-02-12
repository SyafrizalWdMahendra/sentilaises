import { useState } from "react";
import { AnalysisResults } from "../types";

export const useAnalyseText = () => {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResults | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    try {
      const scrapePromises = [url1, url2].map((u) =>
        fetch("/api/scrape", {
          method: "POST",
          body: JSON.stringify({ url: u }),
        }).then((res) => res.json()),
      );

      const scrapeResults = await Promise.all(scrapePromises);

      for (const res of scrapeResults) {
        if (!res.success)
          throw new Error("Gagal mengambil data dari salah satu tautan.");
      }

      const candidates = scrapeResults.map((res) => ({
        name: res.data.name,
        url: res.data.url,
        reviews: res.data.reviews,
      }));

      const payload = {
        profession: profession,
        candidates: candidates,
      };

      const aiRes = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!aiRes.ok) throw new Error("Gagal melakukan analisis AI");

      const aiResult = await aiRes.json();
      setResult(aiResult);
    } catch (error: any) {
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    url1,
    url2,
    profession,
    loading,
    result,
    disabled,
    handleAnalyze,
    setProfession,
    setUrl1,
    setUrl2,
    setDisabled,
  };
};
