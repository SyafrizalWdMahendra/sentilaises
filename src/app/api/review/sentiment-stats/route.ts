import { NextResponse } from "next/server";
import { withAuth } from "@/lib/withAuth";
import { sentimentStatsService } from "@/src/services/sentimentStats.service";

export const GET = withAuth(async (_req, _context, session) => {
  try {
    const email = session.user?.email as string;

    const result = await sentimentStatsService(email);

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil data sentimen:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
});
