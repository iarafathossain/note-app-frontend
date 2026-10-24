import {
  canAccessNavigation,
  navigationItems,
  UserRole,
} from "@/lib/route-config";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    } catch (error) {
      console.error("Failed to decode token for sidebar");
    }
  }

  const visibleLinks = navigationItems.filter((item) =>
    canAccessNavigation(item, role),
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <nav className="flex flex-col gap-2">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
