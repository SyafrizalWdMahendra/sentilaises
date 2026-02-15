import prisma from "@/lib/prisma";
import { Prisma, Sentiment } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export async function POST(_request: Request) {
  try {
    const reviews = [
      {
        productId: 2,
        modelId: 1,
        content:
          "Laptop ini sangat ringan dan performanya cepat untuk kerja harian.",
        keywords: ["ringan", "cepat", "kerja"],
        sentiment: Sentiment.POSITIVE,
        confidenceScore: 0.92,
      },
      {
        productId: 3,
        modelId: 1,
        content: "Baterainya awet, tapi harganya cukup mahal.",
        keywords: ["baterai", "awet", "mahal"],
        sentiment: Sentiment.NEUTRAL,
        confidenceScore: 0.75,
      },
      {
        productId: 4,
        modelId: 1,
        content: "Performa kurang stabil dan sering panas.",
        keywords: ["performa", "panas", "stabil"],
        sentiment: Sentiment.NEGATIVE,
        confidenceScore: 0.88,
      },
    ];

    const result = await prisma.review.createMany({
      data: reviews,
    });

    return NextResponse.json(
      {
        message: "Analysis successful",
        data: result,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Create analysis error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. User belum login." },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User tidak ditemukan." },
      { status: 404 },
    );
  }

  try {
    const review = await prisma.review.findMany({
      where: { userId: user.id },
      orderBy: {
        createdAt: "asc",
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
