import { useEffect, useState, useMemo } from "react";
import { ApiResponse, ReviewItem } from "../types";

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
        const req = await fetch("/api/review");
        const res: ApiResponse = await req.json();

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
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrand]);

  const { currentData, totalPages } = useMemo(() => {
    const filteredData = selectedBrand
      ? data.filter(
          (review) =>
            review.product?.brand?.toLowerCase() ===
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
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return {
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
