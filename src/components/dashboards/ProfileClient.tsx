"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Footer from "./Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Pencil, Wallet, Laptop, User, Monitor, Fan } from "lucide-react";
import { ProfileClientProps } from "@/src/types";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { formatRupiah, toTitleCase } from "@/src/utils/datas";
import { brandItems, OSItems, professionItems } from "@/src/utils/const";
import { ProfileModal } from "./ProfileModal";
import { useProfileClient } from "@/src/hooks/useProfileClient";
import { Header } from "./Header";
import { useDashboards } from "@/src/hooks/useDashboard";
import { useTheme } from "@/src/context/ThemeContext";

export default function ProfileClient(props: ProfileClientProps) {
  const {
    session,
    router,
    showModal,
    name,
    bio,
    profession,
    brands,
    preferenceOS,
    profileDatas,
    budgetMin,
    budgetMax,
    setShowModal,
    handleOptimisticUpdate,
  } = useProfileClient(props);
  const { darkMode, toggleDarkMode, mounted } = useTheme();

  const isDark = mounted && darkMode;

  return (
    <div
      className={`min-h-screen bg-[#F8FBFF] ${isDark ? "bg-gray-900 text-white" : "bg-[#F8FBFF]"} transition-all duration-500`}
    >
      <Header onToggle={toggleDarkMode} isDark={isDark} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex max-w-xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-md text-primary max-w-xl w-max mr-auto hover:text-primary/80 transition-all duration-500"
          >
            <ArrowLeft
              className={`w-4 h-4 ${isDark ? "text-white" : "text-primary"} transition-all duration-500`}
            />
            <span
              className={`text-md ${isDark ? "text-white" : "text-primary"} transition-all duration-500`}
            >
              Back to Dashboard
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className={`${isDark ? "bg-gray-800" : "bg-card"} mx-auto w-full max-w-xl overflow-hidden rounded-2xl border mt-4 transition-all duration-500`}
        >
          <div className="relative bg-linier-to-r from-primary/5 via-primary/10 to-transparent p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Image
                    src={session?.data?.user?.image ?? "/default-avatar.svg"}
                    alt="User Avatar"
                    width={88}
                    height={88}
                    className={`h-20 w-20 rounded-full border-4 object-cover shadow-sm ${isDark ? "border-gray-900" : "border-card"} transition-all duration-500`}
                  />
                  <div
                    className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 bg-green-500 ${isDark ? "border-gray-900" : "border-card"} transition-all duration-500s`}
                  ></div>
                </div>

                <div>
                  {name && (
                    <h1
                      className={`text-2xl font-bold ${isDark ? "text-white" : "text-card-foreground"} tracking-tight transition-all duration-500`}
                    >
                      {name || "Guest User"}
                    </h1>
                  )}
                  <p
                    className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-muted-foreground"} mb-2 transition-all duration-500`}
                  >
                    {session?.data?.user?.email || "Belum ada email"}
                  </p>

                  {profession && (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full ${isDark ? "bg-gray-900 text-white" : "bg-primary/10"} px-2.5 py-0.5 text-xs font-semibold ${isDark ? "text-primary" : "text-primary"} transition-all duration-500`}
                    >
                      <Fan className="w-3.5 h-3.5" />
                      <span className="capitalize">
                        {toTitleCase(profession)}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              <Button
                size="sm"
                className={`${isDark ? "bg-gray-900 hover:bg-gray-200 hover:text-black" : "bg-primary hover:bg-primary/80"} w-full sm:w-auto gap-2 shadow-sm`}
                onClick={() => setShowModal(true)}
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          <Separator />

          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2 -mt-2">
              <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                <User className="w-4 h-4" />
                Tentang Saya
              </div>
              <div className="rounded-xl bg-muted/50 p-4 border border-muted">
                <p
                  className={`text-sm  ${!bio ? "text-gray-400" : "text-card-foreground"} ${isDark ? "text-gray-400" : "text-card-foreground"} transition-all duration-500`}
                >
                  {bio ||
                    "Belum ada deskripsi profil. Ceritakan sedikit tentang aktivitas dan kebutuhan laptop Anda."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5 rounded-xl border p-5">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                    <Laptop
                      className={`w-4 h-4 text-primary ${isDark ? "text-white" : "text-muted-foreground"} transition-all duration-500`}
                    />
                    Preferensi Merek
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {brands.length > 0 ? (
                      brands.map((brand, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground border"
                        >
                          {brand}
                        </span>
                      ))
                    ) : (
                      <span className="bg-card rounded-full text-sm text-gray-400 border px-3 py-1">
                        None
                      </span>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                    <Monitor
                      className={`w-4 h-4 text-primary ${isDark ? "text-white" : "text-muted-foreground"} transition-all duration-500`}
                    />
                    Sistem Operasi
                  </div>
                  <div>
                    {preferenceOS ? (
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground border">
                        {preferenceOS}
                      </span>
                    ) : (
                      <span className="bg-card rounded-full text-sm text-gray-400 border px-3 py-1">
                        None
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border bg-linier-to-br from-green-50 to-emerald-50/30 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Wallet className="w-4 h-4" />
                  Rentang Anggaran
                </div>

                {budgetMin || budgetMax ? (
                  <div className="flex flex-col justify-center h-[calc(100%-2rem)]">
                    <p className="text-sm text-muted-foreground mb-1">Dari</p>
                    <p className="text-xl font-semibold">
                      {formatRupiah(budgetMin)}
                    </p>
                    <div className="my-2 h-px w-full bg-border"></div>
                    <p className="text-sm text-muted-foreground mb-1">Hingga</p>
                    <p className="text-xl font-semibold text-green-600">
                      {formatRupiah(budgetMax)}
                    </p>
                  </div>
                ) : (
                  <div className="flex h-[calc(100%-2rem)] justify-center items-center">
                    <p className="text-sm text-gray-400">
                      Anggaran Belum Diatur.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showModal && (
            <ProfileModal
              setShowModal={setShowModal}
              professionItems={professionItems}
              brandItems={brandItems}
              OSItems={OSItems}
              userData={profileDatas}
              onOptimisticUpdate={handleOptimisticUpdate}
              router={router}
              darkMode={isDark}
            />
          )}
        </motion.div>
        <Footer />
      </div>
    </div>
  );
}
