import { Review } from "@/src/types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const getSentimentBadge = (sentiment: Review["sentiment"]) => {
  const styles: Record<Review["sentiment"], string> = {
    positive: "sentiment-positive",
    negative: "sentiment-negative",
    neutral: "sentiment-neutral",
  };

  const labels: Record<Review["sentiment"], string> = {
    positive: "Positif",
    negative: "Negatif",
    neutral: "Netral",
  };

  return (
    <Badge variant="secondary" className={cn("font-medium", styles[sentiment])}>
      {labels[sentiment]}
    </Badge>
  );
};

export default getSentimentBadge;
