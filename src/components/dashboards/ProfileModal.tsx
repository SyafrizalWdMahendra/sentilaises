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
import { useEffect } from "react";

export const ProfileModal = ({
  setShowModal,
  professionItems,
  brandItems,
  OSItems,
  userData,
  onOptimisticUpdate,
  router,
  darkMode,
}: ExtendedModalProps) => {
  const { control, errors, isSubmitting, onSubmit, register, handleSubmit } =
    useProfileModal({
      userData,
      router,
      onOptimisticUpdate,
      setShowModal,
    });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.body.style.marginRight) {
        document.body.style.marginRight = "0px";
      }
      if (document.body.style.paddingRight) {
        document.body.style.paddingRight = "0px";
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "circOut" }}
      className={`${darkMode ? "bg-gray-500/20" : "bg-primary/30"} fixed inset-0 flex items-center justify-center z-10 backdrop-blur-xs`}
      onMouseDown={(e) => e.stopPropagation()}
      style={{ isolation: "isolate" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col w-xs sm:w-sm lg:w-lg md:w-md p-6 rounded-2xl border relative gap-4 max-h-[90vh] overflow-y-auto ${darkMode ? "bg-gray-800 border-gray-600" : "bg-card border-border"}`}
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
                  className={`w-full ${!field.value ? "text-gray-500" : "text-black"} ${darkMode ? "text-card" : "bg-white"} border border-gray-200 transition-all duration-500`}
                >
                  <SelectValue placeholder="Pilih Profesi/Kebutuhan" />
                </SelectTrigger>
                <SelectContent
                  className={`${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}
                  position="popper"
                >
                  {professionItems.map((item) => {
                    const PIcon = item.icon;
                    return (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className={`cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card ${darkMode ? "text-white focus:bg-gray-800" : "text-black focus:bg-primary"} transition-all duration-500`}
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
                  className={`w-full ${!field.value ? "text-gray-500" : "text-black"} ${darkMode ? "text-card" : "bg-white"} border border-gray-200 transition-all duration-500`}
                >
                  <SelectValue placeholder="Pilih Merek Laptop" />
                </SelectTrigger>
                <SelectContent
                  className={`${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}
                  position="popper"
                >
                  {brandItems.map((item) => {
                    const PIcon = item.icon;
                    return (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className={`cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card ${darkMode ? "text-white focus:bg-gray-800" : "text-black focus:bg-primary"} transition-all duration-500`}
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
                  className={`w-full ${!field.value ? "text-gray-500" : "text-black"} ${darkMode ? "text-card" : "bg-white"} border border-gray-200 transition-all duration-500`}
                >
                  <SelectValue placeholder="Pilih Sistem Operasi" />
                </SelectTrigger>
                <SelectContent
                  className={`${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}
                  position="popper"
                >
                  {OSItems.map((item) => {
                    const PIcon = item.icon;
                    return (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className={`cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card ${darkMode ? "text-white focus:bg-gray-800" : "text-black focus:bg-primary"} transition-all duration-500`}
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
                min={0}
                max={100000000000}
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
                min={0}
                max={100000000000}
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`${darkMode ? "bg-gray-900 hover:bg-card hover:text-black" : "bg-primary text-white"} transition-all duration-500`}
          >
            <Save className="mr-2" />
            <span>Simpan</span>
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
