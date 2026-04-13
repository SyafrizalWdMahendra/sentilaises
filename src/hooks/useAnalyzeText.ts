import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnalysisResults, AnalyzeFormData } from "../types";
import {
  scrapeProduct,
  getAIRecommendation,
} from "../services/analyze.service";
import { analyzeSchema } from "../app/validation/analyze.schema";
import { getMetricId } from "../services/metric.service";
import { getBrandId } from "../services/brand.service";

export const useAnalyseText = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResults | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ status: "", percent: 0 });
  const abortControllerRef = useRef<AbortController | null>(null);
  const [visibleFields, setVisibleFields] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<AnalyzeFormData>({
    resolver: zodResolver(analyzeSchema),
    mode: "onChange",
    defaultValues: {
      url1: "",
      url2: "",
      url3: "",
      url4: "",
    },
  });

  // useEffect(() => {
  //   const fetchProfession = async () => {
  //     try {
  //       const user = await getAnotherUserData();

  //       const userProfession =
  //         user?.preference?.profession || user?.preference?.profession;

  //       if (userProfession) {
  //         setValue("profession", userProfession, {
  //           shouldValidate: true,
  //           shouldDirty: true,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Gagal mengambil data profesi user:", error);
  //     }
  //   };

  //   if (session?.user) {
  //     fetchProfession();
  //   }
  // }, [session, setValue]);

  // const onSubmit = async (data: AnalyzeFormData) => {
  //   if (!session?.user?.email) {
  //     alert("Anda harus login terlebih dahulu.");
  //     return;
  //   }

  //   setLoading(true);
  //   setResult(null);

  //   try {
  //     const urlsToScrape = [data.url1, data.url2, data.url3].filter(
  //       (url) => url && url.trim() !== "",
  //     ) as string[];

  //     const scrapePromises = urlsToScrape.map((url) => scrapeProduct(url));
  //     const scrapeResults = await Promise.all(scrapePromises);

  //     const candidates = scrapeResults.map((res) => ({
  //       name: res.data.name,
  //       url: res.data.url,
  //       reviews: res.data.reviews,
  //     }));

  //     const aiResult = await getAIRecommendation({
  //       user_email: session.user.email,
  //       // profession: data.profession,
  //       candidates,
  //     });

  //     setResult(aiResult);
  //   } catch (error: any) {
  //     alert("Terjadi kesalahan: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort("User cancelled the analysis");
      abortControllerRef.current = null;
    }
    setLoading(false);
    setProgress({ status: "Analisis Dibatalkan", percent: 0 });
  }, []);

  const onSubmit = async (data: AnalyzeFormData) => {
    if (!session?.user?.email) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    setLoading(true);
    setProgress({ status: "Memulai scraping...", percent: 10 });
    setResult(null);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const urlsToScrape = [data.url1, data.url2, data.url3, data.url4].filter(
        (url) => url && url.trim() !== "",
      ) as string[];

      const scrapeResults = await Promise.all(
        urlsToScrape.map(async (url) => {
          return await scrapeProduct(url, {
            signal: signal,
          });
        }),
      );

      const candidates = scrapeResults
        .filter((res) => res && res.success)
        .map((res) => ({
          name: res.data.name,
          url: res.data.url,
          reviews: res.data.reviews,
        }));

      if (candidates.length === 0) {
        throw new Error("Tidak ada data produk yang berhasil diambil.");
      }

      const metricIdValue = await getMetricId();
      // const brandId = await getBrandId(candidates[0].name);

      console.log("Payload to AI:", {
        user_email: session.user.email,
        candidateCount: candidates.length,
        totalReviews: candidates.reduce((acc, c) => acc + c.reviews.length, 0),
        metric_id: metricIdValue,
        // brand_id: brandId,
      });

      setProgress({ status: "AI sedang menganalisis ulasan...", percent: 70 });
      const aiResult = await getAIRecommendation(
        {
          user_email: session.user.email as string,
          candidates: candidates,
          metric_id: metricIdValue,
          // brand_id: brandId as number,
        },
        { signal: abortControllerRef.current?.signal },
      );

      if (!aiResult) {
        console.log("Server menghentikan proses karena pembatalan.");
        return;
      }

      setResult(aiResult);
      setProgress({ status: "Selesai", percent: 100 });

      setTimeout(() => {
        document
          .getElementById("analysis-result")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error: any) {
      if (error.name === "AbortError" || signal.aborted) {
        console.log("🛠️ Request dibatalkan secara aman.");
        return;
      }

      console.error("Analysis Error:", error);
      alert(
        "Terjadi kesalahan: " + (error.message || "Gagal menganalisis ulasan."),
      );
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    if (!loading && result) {
      const timeoutId = setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [loading, result]);

  const urlDatas = [
    {
      labels: "Tautan Produk 3",
      errors: errors.url3,
      title: { ...register("url3") },
    },
    {
      labels: "Tautan Produk 4",
      errors: errors.url4,
      title: { ...register("url4") },
    },
  ];

  return {
    control,
    errors,
    isValid,
    loading,
    result,
    visibleFields,
    resultRef,
    progress,
    urlDatas,
    register,
    handleSubmit,
    setValue,
    onSubmit,
    setVisibleFields,
    handleCancel,
  };
};
