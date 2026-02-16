import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSelectSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedBrand = searchParams.get("brand");

  const handleSelect = (brandName: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (brandName) {
      params.set("brand", brandName);
    } else {
      params.delete("brand");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { selectedBrand, handleSelect };
};
