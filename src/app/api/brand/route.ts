import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const brandName = request.nextUrl.searchParams.get("name");

  if (!brandName) {
    return NextResponse.json({ error: "Brand name required" }, { status: 400 });
  }

  const brand = await prisma.brand.findFirst({
    where: { name: brandName },
    select: { brandId: true },
  });

  return NextResponse.json({ brandId: brand?.brandId ?? null });
};
