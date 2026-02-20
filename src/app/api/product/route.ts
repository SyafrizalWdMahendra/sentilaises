import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await prisma.product.count();

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("GET /product/count error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
