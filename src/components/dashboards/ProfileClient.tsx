import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAnotherUserData } from "@/src/app/profile/lib/action";
import ProfileCard from "./ProfileCard";

export default async function ProfileClient() {
  const user = await getAnotherUserData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex max-w-xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-md text-primary max-w-xl w-max mr-auto hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <ProfileCard
        name={user?.name || ""}
        profession={user?.preference?.profession || "OTHER"}
        bio={user?.bio || "None"}
        preferenceBrand={user?.preference?.preferredBrand || "OTHER"}
        preferenceOS={user?.preference?.preferredOS || "OTHER"}
        budgetMax={user?.preference?.budgetMax || 0}
        budgetMin={user?.preference?.budgetMin || 0}
      />
    </div>
  );
}
