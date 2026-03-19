import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useReviewTable } from "@/src/hooks/useReviewTable";
import { useSearchParams } from "next/navigation";
import { downloadAllData } from "@/src/services/report.service";

export default function ExportExcel() {
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get("brand");
  const { isLoading, data } = useReviewTable(10, selectedBrand);

  return (
    <Button
      onClick={() => downloadAllData(data)}
      variant="outline"
      className="flex items-center gap-2 border-primary/20 text-primary hover:bg-primary/5"
      disabled={isLoading}
    >
      <Download className="h-4 w-4" />
      Export Excel
    </Button>
  );
}
