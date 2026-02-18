import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../app/validation/profile.schema";
import { updateProfileService } from "../services/profile.service";
import { ProfileFormData, UseProfileModalProps } from "../types";

export const useProfileModal = ({
  userData,
  router,
  onOptimisticUpdate,
  setShowModal,
}: UseProfileModalProps) => {
  const pref = userData?.preference || {};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData?.name,
      bio: userData?.bio,
      profession: pref.profession ?? "OTHER",
      preferredBrand: pref.preferredBrand ?? "OTHER",
      preferredOS: pref.preferredOS ?? "OTHER",
      budgetMin: pref.budgetMin ?? 0,
      budgetMax: pref.budgetMax ?? 0,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setShowModal(false);
    onOptimisticUpdate(data);

    await updateProfileService(data)
      .then(() => router.refresh())
      .catch((err) => console.error("Update failed:", err));
  };

  return { register, handleSubmit, control, errors, isSubmitting, onSubmit };
};
