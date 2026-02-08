import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useHeader = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const session = useSession();
  const [mounted, setMounted] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return { open, setOpen, session, isRefreshing, handleRefresh, mounted };
};
