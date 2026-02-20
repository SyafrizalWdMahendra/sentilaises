import { NextResponse } from "next/server";
import { withAuth } from "@/lib/withAuth";
import { wordCloudService } from "@/src/services/wordCloud.service";

export const GET = withAuth(async (_req, _context, session) => {
  try {
    const email = session.user?.email as string;

    const allKeywords = await wordCloudService(email);

    console.log(allKeywords);

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
});
