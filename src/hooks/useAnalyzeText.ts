import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnalysisResults } from "../types";
import {
  scrapeProduct,
  getAIRecommendation,
} from "../services/analyze.service";
import { analyzeSchema } from "../app/validation/analyze.schema"; // Sesuaikan path-nya
import { getAnotherUserData } from "../app/profile/lib/action";
import prisma from "@/lib/prisma";
import { getMetricId } from "../services/metric.service";

export type AnalyzeFormData = z.infer<typeof analyzeSchema>;

export interface AnalysisWithMetric {
  metric: {
    metricId: number;
    name: string;
  } | null;
}

export const useAnalyseText = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResults | null>(null);
  const [showField, setShowField] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

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

  const onSubmit = async (data: AnalyzeFormData) => {
    if (!session?.user?.email) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const urlsToScrape = [data.url1, data.url2, data.url3, data.url4].filter(
        (url) => url && url.trim() !== "",
      ) as string[];

      const scrapePromises = urlsToScrape.map((url) => scrapeProduct(url));
      const scrapeResults = await Promise.all(scrapePromises);

      const candidates = scrapeResults.map((res) => ({
        name: res.data.name,
        url: res.data.url,
        reviews: res.data.reviews,
      }));

      const metricIdValue = await getMetricId();
      
      console.log("Payload to AI:", {
        user_email: session.user.email,
        metric_id: metricIdValue,
        candidateCount: candidates.length,
        totalReviews: candidates.reduce((acc, c) => acc + c.reviews.length, 0),
      });

      const aiResult = await getAIRecommendation({
        user_email: session.user.email as string,
        candidates: candidates,
        metric_id: metricIdValue,
      });

      setResult(aiResult);

      setTimeout(() => {
        document
          .getElementById("analysis-result")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error: any) {
      console.error("Analysis Error:", error);
      alert(
        "Terjadi kesalahan: " + (error.message || "Gagal menganalisis ulasan."),
      );
    } finally {
      setLoading(false);
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

  return {
    control,
    errors,
    isValid,
    loading,
    result,
    showField,
    resultRef,
    register,
    handleSubmit,
    setValue,
    onSubmit,
    setShowField,
  };
};
