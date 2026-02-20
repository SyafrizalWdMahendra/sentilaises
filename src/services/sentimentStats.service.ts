import prisma from "@/lib/prisma";

export const sentimentStatsService = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) return null;

  const grouped = await prisma.review.groupBy({
    by: ["sentiment"],
    where: {
      userId: user.id,
    },
    _count: {
      _all: true,
    },
  });

  const result = {
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  };

  grouped.forEach((item) => {
    const count = item._count._all;

    if (count) {
      result.total += count;
    }

    if (item.sentiment === "POSITIVE") result.positive = count;
    if (item.sentiment === "NEGATIVE") result.negative = count;
    if (item.sentiment === "NEUTRAL") result.neutral = count;
  });

  return result;
};
