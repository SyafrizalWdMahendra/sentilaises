import { useEffect, useState, useMemo } from "react";
import { ApiResponse, ReviewItem } from "../types";
import { PaginationService } from "../services/review.service";

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
