import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(_request: Request) {
  try {
    const products = [
      { name: "ZenBook 14", brand: "ASUS" },
      { name: "Swift 3", brand: "Acer" },
      { name: "Surface Laptop 5", brand: "Microsoft" },
    ];

    const result = await prisma.product.createMany({
      data: products,
    });

    return NextResponse.json(
      {
        message: "Booking successful",
        data: result,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Create product error:", error);

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
