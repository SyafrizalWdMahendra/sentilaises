import ProfileClient from "@/src/components/dashboards/ProfileClient";
import { getAnotherUserData } from "./lib/action";

export default async function ProfilePage() {
  const user = await getAnotherUserData();
  return (
    <ProfileClient
      name={user?.name || ""}
      bio={user?.bio || "None"}
      profession={user?.preference?.profession || ""}
      preferenceBrand={user?.preference?.brand?.name || ""}
      preferenceOS={user?.preference?.preferredOS || ""}
      budgetMax={user?.preference?.budgetMax || 0}
      budgetMin={user?.preference?.budgetMin || 0}
    />
  );
}
