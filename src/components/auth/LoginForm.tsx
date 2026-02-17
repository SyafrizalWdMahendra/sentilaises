"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldGroup } from "../ui/field";
import { FcGoogle } from "react-icons/fc";
import { BarChart3 } from "lucide-react";

export function LoginForm() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <BarChart3 className="h-5 w-5" />
        </div>
        <CardTitle>Login to SENTILAISES.</CardTitle>
        <CardDescription className="mt-2">
          Masuk dengan menggunakan akun Google Anda untuk mengakses beranda
          SENTILAISES.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <Button
                variant="outline"
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              >
                <FcGoogle />
                Login with Google
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
