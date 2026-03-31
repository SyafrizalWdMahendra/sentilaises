"use client";

import { useBrandFilter } from "@/src/hooks/useBrandFilter";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function BrandFilter() {
  const { isLoading, totalCount, selectedBrand, validBrands, handleSelect } =
    useBrandFilter();

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground animate-pulse">
        Memuat brand...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "circOut" }}
    >
      <Select
        value={selectedBrand ?? "__all__"}
        onValueChange={(val) => handleSelect(val === "__all__" ? null : val)}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Pilih Brand" />
        </SelectTrigger>
        <SelectContent
          className="bg-card border-border shadow-lg"
          position="popper"
        >
          <SelectItem
            value="__all__"
            className="cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card"
          >
            Semua ({totalCount.toLocaleString()})
          </SelectItem>
          {validBrands.map((brand) => (
            <SelectItem
              key={brand.name}
              value={brand.name}
              className="cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card"
            >
              {brand.name} ({brand.count.toLocaleString()})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}
