import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const renderStars = (rating: number) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating
              ? "fill-sentiment-neutral text-sentiment-neutral"
              : "fill-muted text-muted",
          )}
        />
      ))}
    </div>
  );
};

export default renderStars;
