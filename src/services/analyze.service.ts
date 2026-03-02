import prisma from "@/lib/prisma";
import { AIRecommendationResponse } from "../types";

export const scrapeProduct = async (url: string) => {
  const res = await fetch("/api/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error(`Gagal scraping: ${url}`);
  const data = await res.json();

  if (!data.success)
    throw new Error(`Gagal mengambil data dari tautan: ${url}`);

  return data;
};

// export const getAIRecommendation = async (payload: {
//   user_email: string;
//   // profession: string;
//   candidates: { name: string; url: string; reviews: any[] }[];
// }) => {
//   const aiRes = await fetch("http://localhost:8000/recommend", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (!aiRes.ok) throw new Error("Gagal melakukan analisis AI");

//   return await aiRes.json();
// };

export const getAnalysisData = async (email: string) => {
  const userAnalyses = await prisma.analysis.findMany({
    where: {
      user: {
        email: email,
      },
    },
    include: {
      product: {
        select: {
          id: true,
          brand: true,
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
  });
  return userAnalyses;
};

export const getAIRecommendation = async (payload: {
  user_email: string;
  candidates: { name: string; url: string; reviews: string[] }[];
}): Promise<AIRecommendationResponse> => {
  const aiRes = await fetch("http://localhost:8000/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), 
  });

  if (!aiRes.ok) {
    const errorData = await aiRes.json();
    throw new Error(errorData.detail || "Gagal melakukan analisis AI");
  }

  return await aiRes.json();
};
