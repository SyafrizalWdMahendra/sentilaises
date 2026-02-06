import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardClient from "@/src/components/dashboards/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return <DashboardClient />;
}
