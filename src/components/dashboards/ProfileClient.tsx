"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import { UserGender } from "@prisma/client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProfileClientProps {
  gender?: UserGender;
  productReference?: string;
}

export default function ProfileClient({
  gender,
  productReference,
}: ProfileClientProps) {
  const session = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="container mx-auto px-4 py-8"
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-md text-primary max-w-xl mx-auto"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto w-full max-w-xl rounded-xl border bg-background shadow-sm mt-4"
      >
        <div className="flex items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <Image
              src={session?.data?.user?.image ?? "file.svg"}
              alt="User Avatar"
              width={80}
              height={80}
              className="h-14 w-14 rounded-full border object-cover"
            />
            <div>
              <h1 className="text-lg font-semibold leading-tight">
                {session?.data?.user?.name || "Guest"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {session?.data?.user?.email || "Not logged in"}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-primary text-card border-none"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Gender</p>
            <p className="font-medium">{gender || "Not specified"}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Product Preference</p>
            <p className="font-medium">{productReference || "None"}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
