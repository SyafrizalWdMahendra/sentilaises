import { ProfileFormData } from "../types";

export const updateProfileService = async (formData: ProfileFormData) => {
  const response = await fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result;
};
