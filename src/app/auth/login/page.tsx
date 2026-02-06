import { redirect } from "next/navigation";
import { LoginForm } from "@/src/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm className={className} {...props} />;
}
