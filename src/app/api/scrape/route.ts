import { withBody } from "@/lib/withBody";
import { scrapeTokopediaProduct } from "@/src/services/scrape.service";
import { NextResponse } from "next/server";

export const POST = withBody(async (_req, body) => {
  try {
    const result = await scrapeTokopediaProduct(body.url);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
