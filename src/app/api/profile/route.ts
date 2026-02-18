import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. User belum login." },
      { status: 401 },
    );
  }

  const body = await req.json();

  const {
    name,
    bio,
    profession,
    preferredBrand,
    preferredOS,
    budgetMin,
    budgetMax,
  } = body;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User tidak ditemukan." },
      { status: 404 },
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        bio,
        preference: {
          upsert: {
            update: {
              profession,
              preferredBrand,
              preferredOS,
              budgetMin: budgetMin ? Number(budgetMin) : null,
              budgetMax: budgetMax ? Number(budgetMax) : null,
            },
            create: {
              profession,
              preferredBrand,
              preferredOS,
              budgetMin: budgetMin ? Number(budgetMin) : null,
              budgetMax: budgetMax ? Number(budgetMax) : null,
            },
          },
        },
      },
      include: {
        preference: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile berhasil diupdate",
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      preference: {
        select: {
          preferredBrand: true,
          preferredOS: true,
          profession: true,
          budgetMax: true,
          budgetMin: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(user);
}
