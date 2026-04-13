import prisma from "@/lib/prisma";
import { AIRecommendationResponse } from "../types";
import { aiRecommendPath, scrapePath } from "../utils/const";

export const scrapeProduct = async (
  url: string,
  options?: { signal?: AbortSignal },
) => {
  const res = await fetch(scrapePath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
    signal: options?.signal,
  });

  if (!res.ok) throw new Error(`Gagal scraping: ${url}`);
  const data = await res.json();

  if (!data.success)
    throw new Error(`Gagal mengambil data dari tautan: ${url}`);

  return data;
};

export const getAnalysisData = async (email: string) => {
  const userAnalyses = await prisma.analysis.findMany({
    where: {
      user: {
        email: email,
      },
    },
    include: {
      metric: {
        select: {
          product: {
            select: {
              productId: true,
              brand: {
                select: {
                  name: true,
                },
              },
              _count: {
                select: {
                  reviews: {
                    where: {
                      user: {
                        email: email,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return userAnalyses;
};

export const getAIRecommendation = async (
  payload: {
    user_email: string;
    candidates: { name: string; url: string; reviews: string[] }[];
    metric_id: number | 1;
    brand_id: number | 1;
  },
  options?: { signal?: AbortSignal },
): Promise<AIRecommendationResponse> => {
  console.log("Fetching to FastAPI...");
  const aiRes = await fetch(`${process.env.BACKEND_URL}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: options?.signal,
  });

  if (!aiRes.ok) {
    const errorData = await aiRes.json();

    const errorMessage =
      errorData.detail?.[0]?.msg || "Gagal melakukan analisis AI";
    throw new Error(errorMessage);
  }

  return await aiRes.json();
};
