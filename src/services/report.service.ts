import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import * as XLSX from "xlsx";
import { ReviewItem } from "../types";

export const reportService = async () => {
  const response = await prisma.model.findMany({
    select: {
      modelName: true,
      description: true,
      accuracy: true,
      macroF1: true,
      f1Negative: true,
      f1Neutral: true,
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!response || response.length === 0) {
    return notFound();
  }

  return response;
};

export const exportToExcel = (data: ReviewItem[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sentiment Analysis");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const downloadAllData = (data: ReviewItem[]) => {
  if (data.length === 0) return;

  const headers = [
    "ID",
    "Product Name",
    "Brand",
    "Review Text",
    "Sentiment",
    "Rating",
    "Date",
  ];

  const csvRows = data.map((item) => [
    item.id,
    `"${item.product?.name || ""}"`,
    item.product?.brand?.name || "",
    `"${item.content?.replace(/"/g, '""') || ""}"`,
    item.sentiment || "",
    item.confidenceScore || 0,
    item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "",
  ]);

  const csvContent = [
    headers.join(","),
    ...csvRows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `all_reviews_${new Date().getTime()}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
