import { BodyData } from "@/src/types";
import { NextResponse } from "next/server";

export function withBody(handler: BodyData) {
  return async (req: Request) => {
    const body = await req.json();
    const { url } = body;

    if (!url || !url.includes("tokopedia.com")) {
      return NextResponse.json({ error: "URL tidak valid" }, { status: 400 });
    }
    return handler(req, body);
  };
}
