import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getReviewService, reviewService } from "@/src/services/review.service";
import { withAuth } from "@/lib/withAuth";

export const dynamic = "force-dynamic";

export const POST = async () => {
  try {
    const result = await reviewService();
    return NextResponse.json(
      {
        message: "Analysis successful",
        data: result,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Create analysis error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const GET = withAuth(async (_req, _context, session) => {
  try {
    const email = session.user?.email as string;

    const review = await getReviewService(email);

    return NextResponse.json(
      {
        message: "Review data successfuly retrivied",
        data: review,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", data: [] }, { status: 500 });
  }
});
