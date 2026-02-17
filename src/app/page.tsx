import { redirect } from "next/navigation";
import { LoginForm } from "../components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-svh w-full bg-[#F8FBFF] items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm ">
        <LoginForm />
      </div>
    </div>
  );
}
