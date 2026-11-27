"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/auth/signin");
      return;
    }

    const role = session.user.role;

    switch (role) {
      case "ORGANIZER":
        router.replace("/dashboard/organizer");
        break;

      case "VOLUNTEER":
        router.replace("/dashboard/volunteer");
        break;

      case "USER":
      default:
        router.replace("/dashboard/user");
        break;
    }
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Redirecting...</p>
    </div>
  );
}
