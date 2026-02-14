"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Pencil, Briefcase, Wallet, Laptop, User, Monitor, Fan } from "lucide-react";
import { ProfileClientProps } from "@/src/types";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { brandFormat, formatRupiah } from "@/src/utils/datas";

export default function ProfileCard({
  bio,
  preferenceBrand,
  preferenceOS,
  budgetMax,
  budgetMin,
  profession,
}: ProfileClientProps) {
  const session = useSession();
  const { brands } = brandFormat({ preferenceBrand });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border bg-card mt-4"
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
                className="h-20 w-20 rounded-full border-4 border-background object-cover shadow-sm"
              />
              <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-background bg-sentiment-positive"></div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-card-foreground tracking-tight">
                {session?.data?.user?.name || "Guest User"}
              </h1>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {session?.data?.user?.email || "Belum ada email"}
              </p>

              {profession && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  <Fan className="w-3.5 h-3.5" />
                  <span className="capitalize">{profession}</span>
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            className="w-full sm:w-auto gap-2 rounded-full shadow-sm"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <Separator />

      <div className="p-6 sm:p-8 space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            <User className="w-4 h-4" />
            Tentang Saya
          </div>
          <div className="rounded-xl bg-muted/50 p-4 border border-muted">
            <p className="text-sm leading-relaxed text-foreground/90 italic">
              {bio
                ? `"${bio}"`
                : "Belum ada deskripsi profil. Ceritakan sedikit tentang aktivitas dan kebutuhan laptop Anda."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5 rounded-xl border p-5">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                <Laptop className="w-4 h-4 text-primary" />
                Preferensi Merek
              </div>
              <div className="flex flex-wrap gap-2">
                {brands.length > 0 ? (
                  brands.map((brand, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground border"
                    >
                      {brand}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Tidak ada preferensi
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                <Monitor className="w-4 h-4 text-primary" />
                Sistem Operasi
              </div>
              <div>
                {preferenceOS ? (
                  <span className="inline-flex items-center rounded-md bg-[#F8FBFF] px-2.5 py-1 text-xs font-bold text-primary border border-primary">
                    {preferenceOS}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Bebas / Semua OS
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
                <p className="text-xl font-bold">
                  {formatRupiah(budgetMin)}
                </p>

                <div className="my-2 h-px w-full bg-border"></div>

                <p className="text-sm text-muted-foreground mb-1">Hingga</p>
                <p className="text-xl font-bold text-sentiment-positive">
                  {formatRupiah(budgetMax)}
                </p>
              </div>
            ) : (
              <div className="flex h-[calc(100%-2rem)] items-center">
                <p className="text-sm text-muted-foreground">
                  Budget belum diatur.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
