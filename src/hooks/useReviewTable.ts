import { useEffect, useState, useMemo } from "react";
import { ApiResponse, ReviewItem } from "../types";
import { PaginationService } from "../services/review.service";
import { reviewPath } from "../utils/const";

export const useReviewTable = (
  itemsPerPage: number = 10,
  selectedBrand: string | null = null,
) => {
  const [data, setData] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getReviewData = async () => {
      try {
        setIsLoading(true);
        // 1. CEK URL SEBELUM FETCH: Pastikan tidak ada kata "undefined" di console browser
        console.log("Menembak ke URL:", reviewPath);

        const req = await fetch(reviewPath);

        // 2. CEK STATUS HTTP: Pastikan statusnya 200 OK, bukan 404 atau 500
        console.log("HTTP Status:", req.status);

        const res: ApiResponse = await req.json();

        // 3. CEK STRUKTUR PAYLOAD: Lihat isi JSON asli dari FastAPI di deploy mode
        console.log("Raw Response dari Backend:", res);

        if (res.data && Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getReviewData();
    window.addEventListener("analysis-complete", getReviewData);
    return () => window.removeEventListener("analysis-complete", getReviewData);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand]);

  const { currentData, totalPages } = useMemo(() => {
    const filteredData = selectedBrand
      ? data.filter(
          (review) =>
            review.product?.brand?.name.toLowerCase() ===
            selectedBrand.toLowerCase(),
        )
      : data;

    const total = Math.ceil(filteredData.length / itemsPerPage) || 1;

    const safePage = currentPage > total ? total : currentPage;

    const start = (safePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return {
      currentData: filteredData.slice(start, end),
      totalPages: total,
    };
  }, [data, currentPage, itemsPerPage, selectedBrand]);

  const nextPage = () => {
    setCurrentPage((prev) => PaginationService.getNextPage(prev, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => PaginationService.getPrevPage(prev));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(PaginationService.getValidPage(pageNumber, totalPages));
  };

  return {
    data,
    currentData,
    isLoading,
    pagination: {
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      goToPage,
    },
  };
};
