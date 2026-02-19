import { useEffect, useState } from "react";
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

export type AnalyzeFormData = z.infer<typeof analyzeSchema>;

export const useAnalyseText = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResults | null>(null);
  const [showField, setShowField] = useState(false);

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
    },
  });

  useEffect(() => {
    const fetchProfession = async () => {
      try {
        const user = await getAnotherUserData();

        const userProfession =
          user?.preference?.profession || user?.preference?.profession;

        if (userProfession) {
          setValue("profession", userProfession, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data profesi user:", error);
      }
    };

    if (session?.user) {
      fetchProfession();
    }
  }, [session, setValue]);

  const onSubmit = async (data: AnalyzeFormData) => {
    if (!session?.user?.email) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const urlsToScrape = [data.url1, data.url2, data.url3].filter(
        (url) => url && url.trim() !== "",
      ) as string[];

      const scrapePromises = urlsToScrape.map((url) => scrapeProduct(url));
      const scrapeResults = await Promise.all(scrapePromises);

      const candidates = scrapeResults.map((res) => ({
        name: res.data.name,
        url: res.data.url,
        reviews: res.data.reviews,
      }));

      const aiResult = await getAIRecommendation({
        user_email: session.user.email,
        profession: data.profession,
        candidates,
      });

      setResult(aiResult);
    } catch (error: any) {
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    isValid,
    loading,
    result,
    showField,
    setShowField,
  };
};
