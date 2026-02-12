import { scrapeTokopediaProduct } from "@/src/services/scrape.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || !url.includes("tokopedia.com")) {
      return NextResponse.json({ error: "URL tidak valid" }, { status: 400 });
    }

    const result = await scrapeTokopediaProduct(url);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
