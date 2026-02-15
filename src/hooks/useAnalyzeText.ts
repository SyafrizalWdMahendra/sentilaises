import { useState } from "react";
import { useSession } from "next-auth/react";
import { AnalysisResults } from "../types";

export const useAnalyseText = () => {
  const { data: session } = useSession();

  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResults | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [showField, setShowField] = useState(false);

  const handleAnalyze = async () => {
    if (!session?.user?.email) {
      alert(
        "Anda harus login terlebih dahulu untuk menyimpan riwayat analisis.",
      );
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const urlsToScrape = [url1, url2, url3].filter(
        (url) => url && url.trim() !== "",
      );

      if (urlsToScrape.length < 2) {
        alert("Produk Utama dan minimal 1 Produk Pembanding wajib diisi!");
        setLoading(false);
        return;
      }

      const scrapePromises = urlsToScrape.map((u) =>
        fetch("/api/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: u }),
        }).then((res) => {
          if (!res.ok) throw new Error(`Gagal scraping: ${u}`);
          return res.json();
        }),
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
        user_email: session.user.email,
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
    setUrl3,
    setDisabled,
    setShowField,
  };
};
