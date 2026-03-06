"use server";

import { withActionAuth } from "@/lib/withAuth";
import { getAnotherUserDataService } from "@/src/services/users.service";

export const getAnotherUserData = withActionAuth(async (session) => {
  try {
    const email = session.user?.email;

    if (!email) {
      console.warn("No email found in session");
      return null;
    }

    const userData = await getAnotherUserDataService(email);

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
});
