import prisma from "@/lib/prisma";

export const productService = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) return null;

  const totalProducts = await prisma.analysis.count({
    where: {
      userId: user.id,
    },
  });

  return totalProducts;
};
