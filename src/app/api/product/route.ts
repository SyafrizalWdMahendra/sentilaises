import { withAuth } from "@/lib/withAuth";
import { productService } from "@/src/services/product.service";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = withAuth(async (_req, _context, session) => {
  try {
    const email = session.user?.email as string;

    const count = await productService(email);

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("GET /product/count error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
});
