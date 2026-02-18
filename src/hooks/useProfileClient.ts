"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProfileClientProps, ProfileFormData, ProfileState } from "@/src/types";
import { Brand, OS, Profession } from "@prisma/client";
import { brandFormat } from "../utils/datas";

export const useProfileClient = (props: ProfileClientProps) => {
  const session = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [profileDatas, setProfileDatas] = useState<ProfileState>({
    name: props.name || "",
    bio: props.bio || "",
    preference: {
      profession: props.profession || "",
      preferredBrand: props.preferenceBrand || "",
      preferredOS: props.preferenceOS || "",
      budgetMin: props.budgetMin ?? 0,
      budgetMax: props.budgetMax ?? 0,
    },
  });

  useEffect(() => {
    setProfileDatas({
      name: props.name || "",
      bio: props.bio || "",
      preference: {
        profession: props.profession || "",
        preferredBrand: props.preferenceBrand || "",
        preferredOS: props.preferenceOS || "",
        budgetMin: props.budgetMin ?? 0,
        budgetMax: props.budgetMax ?? 0,
      },
    });
  }, [props]);

  const handleOptimisticUpdate = (newData: ProfileFormData) => {
    setProfileDatas((prev) => {
      const updatedPreference = {
        ...prev.preference,

        profession:
          (newData.profession as Profession) || prev.preference.profession,

        preferredBrand:
          (newData.preferredBrand as Brand) || prev.preference.preferredBrand,

        preferredOS: (newData.preferredOS as OS) || prev.preference.preferredOS,

        budgetMin: newData.budgetMin ? Number(newData.budgetMin) : 0,
        budgetMax: newData.budgetMax ? Number(newData.budgetMax) : 0,
      };

      return {
        ...prev,
        name: newData.name,
        bio: newData.bio,
        preference: updatedPreference,
      };
    });
  };

  const { name, bio, preference } = profileDatas;

  const {
    preferredBrand: preferenceBrand,
    preferredOS: preferenceOS,
    budgetMin,
    budgetMax,
    profession,
  } = preference;

  const { brands } = brandFormat({ preferenceBrand });

  return {
    session,
    router,
    showModal,
    name,
    bio,
    profession,
    brands,
    preferenceBrand,
    preferenceOS,
    profileDatas,
    budgetMin,
    budgetMax,
    handleOptimisticUpdate,
    setShowModal,
  };
};
