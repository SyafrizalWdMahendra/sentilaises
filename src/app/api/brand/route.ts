import prisma from "@/lib/prisma";

export const GET = async (brandName: string) => {
  const brand = await prisma.brand.findFirst({
    where: {
      name: brandName,
    },
    select: {
      brandId: true,
    },
  });

  return brand?.brandId ?? null;
};
