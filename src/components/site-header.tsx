"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { logoutAction } from "@/actions/auth/logout.action";
import {
  getNavigationItems,
  ROUTES,
  type UserRole,
} from "@/lib/route-config";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  user?: { name: string; role: UserRole } | null;
};

export function SiteHeader({ user = null }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleLogout = () => {
    setLogoutError(null);
    startTransition(async () => {
      try {
        const result = await logoutAction();
        if (!result.success) {
          setLogoutError(result.message);
          return;
        }
        router.push(ROUTES.login);
        router.refresh();
      } catch {
        setLogoutError("Unable to reach the server. Please try again.");
      }
    });
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={ROUTES.home} className="font-heading text-lg font-semibold">
          Note App
        </Link>
        <nav className="flex items-center gap-2" aria-label="Main navigation">
          {getNavigationItems(user?.role ?? null)
            .map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted ${
                  pathname === item.href ? "bg-muted font-medium" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          {user ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              disabled={isPending}
            >
              <LogOut />
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          ) : (
            <Link href={ROUTES.login} className="rounded-md px-3 py-2 text-sm hover:bg-muted">
              Login
            </Link>
          )}
        </nav>
      </div>
      {logoutError && (
        <p className="mx-auto w-full max-w-6xl px-4 pb-3 text-right text-sm text-destructive sm:px-6" role="alert">
          {logoutError}
        </p>
      )}
    </header>
  );
}
