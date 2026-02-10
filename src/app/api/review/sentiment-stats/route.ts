import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const grouped = await prisma.review.groupBy({
      by: ["sentiment"],
      _count: { _all: true },
    });

    const result = {
      positive: 0,
      negative: 0,
      neutral: 0,
    };

    grouped.forEach((item) => {
      if (item.sentiment === "positive") result.positive = item._count._all;
      if (item.sentiment === "negative") result.negative = item._count._all;
      if (item.sentiment === "neutral") result.neutral = item._count._all;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return [];
  }
}
