import { Review } from "@/src/types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const getSentimentBadge = (sentiment: Review["sentiment"]) => {
  const styles = {
    positif: "sentiment-positive",
    negatif: "sentiment-negative",
    netral: "sentiment-neutral",
  };

  const labels = {
    positif: "Positif",
    negatif: "Negatif",
    netral: "Netral",
  };

  return (
    <Badge variant="secondary" className={cn("font-medium", styles[sentiment])}>
      {labels[sentiment]}
    </Badge>
  );
};

export default getSentimentBadge;
