import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { ReviewTableProps } from "@/src/types";
import getSentimentBadge from "./SentimentBadge";

export function ReviewTable({ reviews }: ReviewTableProps) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-50">Produk</TableHead>
            <TableHead className="min-w-75">Ulasan</TableHead>
            <TableHead className="w-25">Rating</TableHead>
            <TableHead className="w-25">Sentimen</TableHead>
            <TableHead className="w-25 text-right">Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review, index) => (
            <TableRow
              key={review.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="max-w-40 overflow-hidden">
                <div className="max-w-40">
                  <p className="font-medium text-foreground">{review.brand}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {review.product}
                  </p>
                </div>
              </TableCell>

              <TableCell className="max-w-60 overflow-hidden">
                <p className="text-sm line-clamp-2 wrap-break-word truncate">
                  {review.review}
                </p>
                <p className="mt-1 text-xs text-muted-foreground truncate">
                  {review.date}
                </p>
              </TableCell>

              {/* <TableCell>{renderStars(review.rating)}</TableCell> */}
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
