import {
  canAccessNavigation,
  navigationItems,
  UserRole,
} from "@/lib/route-config";
import { cookies } from "next/headers";
import Link from "next/link";

export async function Sidebar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  let role: UserRole | null = null;

  if (token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const normalizedBase64 = payloadBase64
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      role = JSON.parse(atob(normalizedBase64)).role as UserRole;
    } catch {
      console.error("Failed to decode token for sidebar");
    }
  }

  const visibleLinks = navigationItems.filter((item) =>
    canAccessNavigation(item, role),
  );

  return (
    <nav className="flex flex-col gap-2">
      {visibleLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded p-2 transition-colors hover:bg-gray-200"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
