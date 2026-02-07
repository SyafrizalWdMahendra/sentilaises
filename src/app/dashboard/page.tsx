import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardClient from "@/src/components/dashboards/DashboardClient";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <DashboardClient />;
}
