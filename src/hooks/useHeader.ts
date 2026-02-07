import { useSession } from "next-auth/react";
import { useState } from "react";

export const useHeader = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const session = useSession();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return { open, setOpen, session };
};
