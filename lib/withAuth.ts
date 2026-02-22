import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { ApiHandler, ServerActionHandler } from "@/src/types";
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

export function withActionAuth<T, Args extends any[] = any[]>(
  handler: ServerActionHandler<T, Args>,
) {
  return async (...args: Args): Promise<T | null> => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log("Unauthorized: User belum login");
      return null;
    }

    return handler(session, ...args);
  };
}
