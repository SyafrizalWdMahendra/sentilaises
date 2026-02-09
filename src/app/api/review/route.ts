import prisma from "@/lib/prisma";
import { Sentiment } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const reviews = [
      {
        productId: 2,
        modelId: 1,
        content:
          "Laptop ini sangat ringan dan performanya cepat untuk kerja harian.",
        keywords: ["ringan", "cepat", "kerja"],
        sentiment: Sentiment.positive,
        confidenceScore: 0.92,
      },
      {
        productId: 3,
        modelId: 1,
        content: "Baterainya awet, tapi harganya cukup mahal.",
        keywords: ["baterai", "awet", "mahal"],
        sentiment: Sentiment.neutral,
        confidenceScore: 0.75,
      },
      {
        productId: 4,
        modelId: 1,
        content: "Performa kurang stabil dan sering panas.",
        keywords: ["performa", "panas", "stabil"],
        sentiment: Sentiment.negative,
        confidenceScore: 0.88,
      },
    ];

    const result = await prisma.review.createMany({
      data: reviews,
    });

    return NextResponse.json(
      {
        message: "Booking successful",
        data: result,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create product Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const review = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        confidenceScore: true,
        sentiment: true,
        content: true,
        keywords: true,
        product: {
          select: {
            name: true,
            brand: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Review data successfuly retrivied",
        data: review,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", data: [] }, { status: 500 });
  }
}
