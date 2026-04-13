"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { BarChart3, Moon, Sun } from "lucide-react";
import { useTheme } from "@/src/context/ThemeContext";

export function LoginForm() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div
      className={`${darkMode ? "min-h-screen bg-gray-900" : "min-h-screen bg-[#F8FBFF]"} flex items-center justify-center p-4 w-full mx-auto transition-all duration-500`}
    >
      <div className="w-full max-w-md">
        <div
          className={`rounded-3xl border border-border overflow-hidden ${darkMode ? "bg-gray-800 text-white border-transparent shadow-lg" : "bg-card shadow-sm"} transition-all duration-500`}
        >
          <div
            className={`h-1 w-full bg-linear-to-r from-primary via-primary/60 to-primary/20 ${darkMode ? "from-white via-white/60 to-white/20" : ""} transition-all duration-500`}
          />

          <div className="px-4 py-8 sm:py-8 sm:px-4">
            <div className="flex flex-col items-center text-center mb-8">
              {darkMode ? (
                <Sun
                  onClick={toggleDarkMode}
                  className={`h-5 w-5 ml-auto -mt-4 sm:-mt-4 cursor-pointer ${darkMode ? "text-white" : "text-black"} transition-all duration-500`}
                />
              ) : (
                <Moon
                  onClick={toggleDarkMode}
                  className={`h-5 w-5 ml-auto -mt-4 sm:-mt-4 cursor-pointer ${darkMode ? "text-white" : "text-black"} transition-all duration-500`}
                />
              )}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-md mb-4  ${darkMode ? "bg-gray-900" : "text-primary-foreground bg-primary"} transition-all duration-500`}
              >
                <BarChart3 className="h-7 w-7" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                SENTILAISES<span className="text-primary">.</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs leading-relaxed">
                Platform analisis sentimen ulasan laptop berbasis AI. Masuk
                untuk mulai mengeksplorasi data.
              </p>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span
                  className={`bg-muted-background px-3 text-muted-foreground ${darkMode ? "bg-gray-800" : "bg-[#F8FBFF]"} transition-all duration-500`}
                >
                  Masuk dengan
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className={`w-full h-11 rounded-xl border-border transition-all duration-200 font-medium text-sm gap-3 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} transition-all duration-500`}
            >
              <FcGoogle className="w-5 h-5" />
              Lanjutkan dengan Google
            </Button>

            <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
              Dengan masuk, kamu menyetujui{" "}
              <span
                className={`${darkMode ? "text-white hover:text-white/80" : "text-primary hover:text-primary/80"} underline underline-offset-2 cursor-pointer transition-all duration-500`}
              >
                Syarat & Ketentuan
              </span>{" "}
              dan{" "}
              <span
                className={`${darkMode ? "text-white hover:text-white/80" : "text-primary hover:text-primary/80"} underline underline-offset-2 cursor-pointertransition-all duration-500`}
              >
                Kebijakan Privasi
              </span>{" "}
              kami.
            </p>
          </div>
        </div>

        <p
          className={`text-center text-xs text-muted-foreground mt-5 ${darkMode ? "text-card" : ""} transition-all duration-500`}
        >
          © {new Date().getFullYear()} SENTILAISES. Dibuat untuk analisis yang
          lebih cerdas.
        </p>
      </div>
    </div>
  );
}
