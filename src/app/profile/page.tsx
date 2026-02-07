import { Header } from "@/src/components/dashboards/Header";
import { getAnotherUserData } from "./lib/action";
import ProfileClient from "@/src/components/dashboards/ProfileClient";
import { UserGender } from "@prisma/client";

export default async function ProfilePage() {
  const user = await getAnotherUserData();

  return (
    <>
      <Header />
      <ProfileClient
        gender={user?.gender as UserGender}
        productReference={user?.productReference || "None"}
      />
    </>
  );
}
