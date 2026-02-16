import { useEffect, useState, useMemo } from "react";
import { ApiResponse, ReviewItem } from "../types";

export const useReviewTable = (itemsPerPage: number = 10) => {
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

  const { currentData, totalPages } = useMemo(() => {
    const total = Math.ceil(data.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedData = data.slice(start, end);

    return {
      currentData: slicedData,
      totalPages: total,
    };
  }, [data, currentPage, itemsPerPage]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
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
