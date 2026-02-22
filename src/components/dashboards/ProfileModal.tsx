"use client";

import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Pickaxe, Laptop, Shell, Wallet, Save, X } from "lucide-react";
import { ExtendedModalProps } from "@/src/types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useProfileModal } from "@/src/hooks/useProfileModal";

export const ProfileModal = ({
  setShowModal,
  professionItems,
  brandItems,
  OSItems,
  userData,
  onOptimisticUpdate,
  router,
}: ExtendedModalProps) => {
  const { control, errors, isSubmitting, onSubmit, register, handleSubmit } =
    useProfileModal({
      userData,
      router,
      onOptimisticUpdate,
      setShowModal,
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "circOut" }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-1"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-card w-xs sm:w-sm lg:w-lg md:w-md p-6 rounded-2xl border relative gap-4 "
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <Label htmlFor="name" className="font-semibold">
              Nama Lengkap
            </Label>
          </div>
          <Input
            id="name"
            placeholder="Masukkan nama lengkap Anda"
            {...register("name")}
            className="border rounded-md focus:ring-2 focus:ring-primary"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <Label htmlFor="bio" className="font-semibold">
              Bio
            </Label>
          </div>
          <textarea
            {...register("bio")}
            placeholder="Masukkan bio Anda"
            className="border rounded-md focus:ring-2 focus:ring-primary p-2 resize-none"
          />
          {errors.bio && (
            <p className="text-red-500 text-xs">{errors.bio.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Pickaxe className="w-4 h-4" />
            <Label className="font-semibold">Profesi</Label>
          </div>
          <Controller
            control={control}
            name="profession"
            render={({ field }) => (
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className={`w-full ${!field.value ? "text-gray-500" : "text-black"}`}
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
                          <PIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{item.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
          {errors.profession && (
            <p className="text-red-500 text-xs">{errors.profession.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4" />
            <Label className="font-semibold">Merek Laptop</Label>
          </div>
          <Controller
            control={control}
            name="preferredBrand"
            render={({ field }) => (
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className={`w-full ${
                    !field.value ? "text-gray-500" : "text-black"
                  }`}
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
                          <PIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{item.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
          {errors.preferredBrand && (
            <p className="text-red-500 text-xs">
              {errors.preferredBrand.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Shell className="w-4 h-4" />
            <Label className="font-semibold">Sistem Operasi</Label>
          </div>
          <Controller
            control={control}
            name="preferredOS"
            render={({ field }) => (
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className={`w-full ${
                    !field.value ? "text-gray-500" : "text-black"
                  }`}
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
                          <PIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{item.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
          {errors.preferredOS && (
            <p className="text-red-500 text-xs">{errors.preferredOS.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            <Label className="font-semibold">Rentang Anggaran</Label>
          </div>
          <div className="flex gap-4">
            <div className="flex-col w-1/2">
              <Label className="text-xs mt-2">Rp (Minimal)</Label>
              <Input
                type="number"
                {...register("budgetMin", { valueAsNumber: true })}
                placeholder="Rp 0"
                className="border rounded-md focus:ring-2 focus:ring-primary mt-1"
              />
              {errors.budgetMin && (
                <p className="text-red-500 text-xs">
                  {errors.budgetMin.message}
                </p>
              )}
            </div>
            <div className="flex-col w-1/2">
              <Label className="text-xs mt-2">Rp (Maksimal)</Label>
              <Input
                type="number"
                {...register("budgetMax", { valueAsNumber: true })}
                placeholder="Rp 0"
                className="border rounded-md focus:ring-2 focus:ring-primary mt-1"
              />
              {errors.budgetMax && (
                <p className="text-red-500 text-xs">
                  {errors.budgetMax.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-col-reverse sm:flex-row justify-start gap-4">
          <Button
            type="button"
            onClick={() => setShowModal(false)}
            variant="outline"
          >
            <X className="mr-2" />
            <span>Cancel</span>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2" />
            <span>Simpan</span>
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
