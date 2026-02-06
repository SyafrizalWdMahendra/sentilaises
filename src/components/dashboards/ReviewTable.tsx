import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Review {
  id: string;
  product: string;
  brand: string;
  review: string;
  rating: number;
  sentiment: "positif" | "negatif" | "netral";
  date: string;
  confidence: number;
}

interface ReviewTableProps {
  reviews: Review[];
}

export function ReviewTable({ reviews }: ReviewTableProps) {
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
      <Badge
        variant="secondary"
        className={cn("font-medium", styles[sentiment])}
      >
        {labels[sentiment]}
      </Badge>
    );
  };

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

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px]">Produk</TableHead>
            <TableHead className="min-w-[300px]">Ulasan</TableHead>
            <TableHead className="w-[100px]">Rating</TableHead>
            <TableHead className="w-[100px]">Sentimen</TableHead>
            <TableHead className="w-[100px] text-right">Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review, index) => (
            <TableRow
              key={review.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{review.brand}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {review.product}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <p className="line-clamp-2 text-sm">{review.review}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {review.date}
                </p>
              </TableCell>
              <TableCell>{renderStars(review.rating)}</TableCell>
              <TableCell>{getSentimentBadge(review.sentiment)}</TableCell>
              <TableCell className="text-right">
                <span className="font-medium">
                  {(review.confidence * 100).toFixed(1)}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
