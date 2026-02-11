"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { EllipsisVertical, Inbox, Loader2, Pencil, Trash } from "lucide-react";
import getSentimentBadge from "./SentimentBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useReviewTable } from "@/src/hooks/useReviewTable";

export function ReviewTable() {
  const { data, isLoading } = useReviewTable();

  if (isLoading) {
    return (
      <div className="flex h-75 w-full flex-col items-center justify-center gap-2 rounded-xl border bg-card text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm">Memuat data ulasan...</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-62.5">Produk</TableHead>
            <TableHead className="w-auto min-w-75">
              Ulasan & Kata Kunci
            </TableHead>
            <TableHead className="w-30 whitespace-nowrap">Tanggal</TableHead>
            <TableHead className="w-30">Sentimen</TableHead>
            <TableHead className="w-50">Confidence Score</TableHead>
            <TableHead className="w-25">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-75 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <div className="rounded-full bg-muted p-4">
                    <Inbox className="h-8 w-8" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    Belum ada data
                  </p>
                  <p className="text-sm">
                    Belum ada ulasan yang dianalisis oleh sistem.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((review, index) => (
              <TableRow
                key={review.id || index}
                className="group animate-in fade-in transition-colors hover:bg-muted/40"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <TableCell className="align-top">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                        {review.product?.brand || "Generic"}
                      </span>
                    </div>
                    <span className="text-sm font-medium leading-tight text-foreground line-clamp-2">
                      {review.product?.name || "Unknown Product"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="align-top">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 group-hover:text-foreground transition-colors">
                      {review.content}
                    </p>

                    {review.keywords && review.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {review.keywords.slice(0, 5).map((k, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="h-5 px-1.5 text-[10px] font-normal text-muted-foreground border-border bg-muted group-hover:bg-background transition-all"
                          >
                            {k}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="align-top whitespace-nowrap">
                  <span className="text-xs text-muted-foreground font-medium">
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </span>
                </TableCell>

                <TableCell className="align-top">
                  {getSentimentBadge(review.sentiment ?? null)}
                </TableCell>

                <TableCell className="align-top">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {review.confidenceScore
                      ? `${(review.confidenceScore * 100).toFixed(1)}%`
                      : "-"}
                  </span>
                </TableCell>
                <TableCell className="align-top ">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <EllipsisVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      className={`w-max bg-card border-border shadow-md `}
                    >
                      <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-sentiment-neutral-light focus:text-sentiment-neutral transition-colors hover:text-primary">
                        <Pencil />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex cursor-pointer gap-2 text-destructive focus:bg-red-500 focus:text-white transition-colors">
                        <Trash />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
