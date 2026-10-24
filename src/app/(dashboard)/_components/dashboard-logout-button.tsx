"use client";

import { logoutAction } from "@/actions/auth/logout.action";
import { ROUTES } from "@/lib/route-config";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function DashboardLogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await logoutAction();
        if (!result.success) {
          setError(result.message);
          return;
        }

        router.push(ROUTES.login);
        router.refresh();
      } catch {
        setError("Unable to reach the server. Please try again.");
      }
    });
  };

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        className="flex w-full items-center gap-2 rounded px-2 py-2 text-left hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut className="size-4" />
        {isPending ? "Logging out..." : "Logout"}
      </button>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
