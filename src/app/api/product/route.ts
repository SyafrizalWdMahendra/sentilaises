import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // const body = await request.json();

    // const { name, brand } = body;
    // if (!name || !brand) {
    //   return NextResponse.json(
    //     { error: "Missing required fields" },
    //     { status: 400 },
    //   );
    // }

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
  } catch (error: any) {
    console.error("Create product Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
