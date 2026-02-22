"use server";

import { withActionAuth } from "@/lib/withAuth";
import { getAnotherUserDataService } from "@/src/services/users.service";

export const getAnotherUserData = withActionAuth(async (session) => {
  try {
    const email = (await session.user?.email) as string;

    const userData = await getAnotherUserDataService(email);

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
});
