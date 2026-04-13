import { Review } from "@/src/types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const getSentimentBadge = (sentiment: Review["sentiment"], isDark: boolean) => {
  const styles: Record<Review["sentiment"], string> = {
    POSITIVE: ` ${isDark ? "text-sentiment-positive bg-sentiment-positive/10" : "text-sentiment-positive bg-sentiment-positive/10"}`,
    NEGATIVE: ` ${isDark ? "text-sentiment-negative bg-sentiment-negative/10" : "text-sentiment-negative bg-sentiment-negative/10"}`,
    NEUTRAL: ` ${isDark ? "text-sentiment-neutral bg-sentiment-neutral/10" : "text-sentiment-neutral bg-sentiment-neutral/10"}`,
  };

  const labels: Record<Review["sentiment"], string> = {
    POSITIVE: "Positif",
    NEGATIVE: "Negatif",
    NEUTRAL: "Netral",
  };

  return (
    <Badge variant="secondary" className={cn("font-medium", styles[sentiment])}>
      {labels[sentiment]}
    </Badge>
  );
};

export default getSentimentBadge;
