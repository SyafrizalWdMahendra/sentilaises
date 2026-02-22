import Footer from "@/src/components/dashboards/Footer";
import { Header } from "@/src/components/dashboards/Header";
import ProfileClient from "@/src/components/dashboards/ProfileClient";

export default async function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F8FBFF]">
      <Header />
      <ProfileClient />
     
    </div>
  );
}
