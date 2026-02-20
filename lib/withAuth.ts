import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { ApiHandler } from "@/src/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export function withAuth(handler: ApiHandler) {
  return async (req: Request, context: any) => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. User belum login." },
        { status: 401 },
      );
    }

    return handler(req, context, session);
  };
}
