import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
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

    const grouped = await prisma.review.groupBy({
      by: ["sentiment"],
      where: {
        userId: user.id,
      },
      _count: {
        _all: true,
      },
    });

    const result = {
      positive: 0,
      negative: 0,
      neutral: 0,
    };

    grouped.forEach((item) => {
      if (item.sentiment === "POSITIVE") result.positive = item._count._all;
      if (item.sentiment === "NEGATIVE") result.negative = item._count._all;
      if (item.sentiment === "NEUTRAL") result.neutral = item._count._all;
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil data sentimen:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
