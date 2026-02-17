"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Pencil,
  Wallet,
  Laptop,
  User,
  Monitor,
  Fan,
  X,
  Pickaxe,
  Shell,
  Save,
} from "lucide-react";
import { ProfileClientProps } from "@/src/types";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { brandFormat, formatRupiah } from "@/src/utils/datas";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { brandItems, OSItems, professionItems } from "@/src/utils/const";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ProfileCard({
  bio,
  preferenceBrand,
  preferenceOS,
  budgetMax,
  budgetMin,
}: ProfileClientProps) {
  const session = useSession();
  const { brands } = brandFormat({ preferenceBrand });
  const [showModal, setShowModal] = useState(false);
  const [profession, setProfession] = useState("");
  const [brand, setBrand] = useState("");
  const [OS, setOS] = useState("");

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
            <p className="text-sm leading-relaxed text-foreground/90">
              {bio
                ? `${bio}`
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
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground border"
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
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground border">
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
                <p className="text-xl font-semibold">
                  {formatRupiah(budgetMin)}
                </p>

                <div className="my-2 h-px w-full bg-border"></div>

                <p className="text-sm text-muted-foreground mb-1">Hingga</p>
                <p className="text-xl font-semibold text-sentiment-positive">
                  {formatRupiah(budgetMax)}
                </p>
              </div>
            ) : (
              <div className="flex h-[calc(100%-2rem)] justify-center items-center">
                <p className="text-sm text-muted-foreground">
                  Anggaran Belum Diatur.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "circOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <form
            action=""
            className=" flex flex-col bg-card w-1/3 p-6 rounded-2xl border relative"
          >
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <Label htmlFor="username" className="font-semibold">
                  Nama Lengkap
                </Label>
              </div>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                className="border rounded-md focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-2">
                <Pickaxe className="w-4 h-4" />
                <Label htmlFor="profession" className="font-semibold">
                  Profesi
                </Label>
              </div>
              <Select
                name="profession"
                value={profession}
                onValueChange={setProfession}
                required
              >
                <SelectTrigger
                  className={`w-full ${!profession ? "text-gray-500" : "text-black"}`}
                >
                  <SelectValue placeholder="Pilih Profesi/Kebutuhan" />
                </SelectTrigger>

                <SelectContent
                  className="bg-card border-border shadow-lg"
                  position="popper"
                >
                  {professionItems.map((item) => {
                    const PIcon = item.icon;
                    return (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card"
                      >
                        <div className="flex gap-2 items-center">
                          <span>
                            <PIcon className="h-4 w-4 text-muted-foreground" />
                          </span>
                          <span>{item.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4" />
                <Label htmlFor="brand" className="font-semibold">
                  Merek Laptop
                </Label>
              </div>
              <Select
                name="brand"
                value={brand}
                onValueChange={setBrand}
                required
              >
                <SelectTrigger
                  className={`w-full ${!brand ? "text-gray-500" : "text-black"}`}
                >
                  <SelectValue placeholder="Pilih Merek Laptop" />
                </SelectTrigger>

                <SelectContent
                  className="bg-card border-border shadow-lg"
                  position="popper"
                >
                  {brandItems.map((item) => {
                    const PIcon = item.icon;
                    return (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card"
                      >
                        <div className="flex gap-2 items-center">
                          <span>
                            <PIcon className="h-4 w-4 text-muted-foreground" />
                          </span>
                          <span>{item.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Shell className="w-4 h-4" />
                <Label htmlFor="OS" className="font-semibold">
                  Sistem Operasi
                </Label>
              </div>
              <Select name="OS" value={OS} onValueChange={setOS} required>
                <SelectTrigger
                  className={`w-full -mt-1 ${!profession ? "text-gray-500" : "text-black"}`}
                >
                  <SelectValue placeholder="Pilih Sistem Operasi" />
                </SelectTrigger>

                <SelectContent
                  className="bg-card border-border shadow-lg"
                  position="popper"
                >
                  {OSItems.map((item) => {
                    const PIcon = item.icon;
                    return (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card"
                      >
                        <div className="flex gap-2 items-center">
                          <span>
                            <PIcon className="h-4 w-4 text-muted-foreground" />
                          </span>
                          <span>{item.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <Label htmlFor="budget" className="font-semibold">
                  Rentang Anggaran
                </Label>
              </div>
              <div className="flex gap-4">
                <div className="flex-col w-1/2">
                  <Label htmlFor="budget" className="text-xs mt-2">
                    Rp (Minimal)
                  </Label>
                  <Input
                    id="budget"
                    type="text"
                    placeholder="Rp 0"
                    className="border rounded-md focus:ring-2 focus:ring-primary mt-1"
                    required
                  />
                </div>
                <div className="flex-col w-1/2">
                  <Label htmlFor="budget" className="text-xs mt-2">
                    Rp (Maksimal)
                  </Label>
                  <Input
                    id="budget"
                    type="text"
                    placeholder="Rp 0"
                    className="border rounded-md focus:ring-2 focus:ring-primary mt-1"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-start gap-4">
              <Button onClick={() => setShowModal(false)} variant={"outline"}>
                <X />
                <span>Cancel</span>
              </Button>
              <Button type="submit">
                <Save />
                <span>Simpan</span>
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
}
