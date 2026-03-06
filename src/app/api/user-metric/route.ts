import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { AnalysisWithMetric } from "@/src/hooks/useAnalyzeText";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userAnalysis = (await prisma.analysis.findFirst({
    where: {
      user: { email: session.user.email },
    },
    select: {
      metric: {
        select: {
          metricId: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })) as AnalysisWithMetric | null;

  return NextResponse.json({ metricId: userAnalysis?.metric?.metricId });
}
