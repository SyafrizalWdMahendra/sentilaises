import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const analyses = await prisma.analysis.findMany({
      where: { userId: user.id },
      select: { topKeywords: true },
    });

    const allKeywords: string[] = analyses.flatMap((a) => {
      if (Array.isArray(a.topKeywords)) {
        return a.topKeywords.filter((k): k is string => typeof k === "string");
      }
      return [];
    });

    return NextResponse.json(
      { success: true, data: allKeywords },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch word cloud data:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
