import { NextResponse } from "next/server";
import { userService } from "@/src/services/profile.service";
import { withAuth } from "@/lib/withAuth";

export const POST = withAuth(async (req, _context, session) => {
  try {
    const email = session.user?.email as string;
    const body = await req.json();

    const updatedUser = await userService.updateProfileByEmail(email, body);

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile berhasil diupdate",
      data: updatedUser,
    });
  } catch (error) {
    console.error("[UPDATE_PROFILE_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
});

export const GET = withAuth(async (_req, _context, session) => {
  try {
    const email = session.user?.email as string;

    const user = await userService.getProfileByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("[GET_PROFILE_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 },
    );
  }
});
