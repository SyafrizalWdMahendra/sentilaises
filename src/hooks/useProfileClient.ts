"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export const useProfileClient = () => {
  const session = useSession();
  const [showModal, setShowModal] = useState(false);
  const [profession, setProfession] = useState("");
  const [brand, setBrand] = useState("");
  const [OS, setOS] = useState("");

  return {
    session,
    showModal,
    profession,
    brand,
    OS,
    setShowModal,
    setProfession,
    setBrand,
    setOS,
  };
};
