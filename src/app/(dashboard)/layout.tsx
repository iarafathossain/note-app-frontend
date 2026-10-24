import { DashboardLogoutButton } from "@/app/(dashboard)/_components/dashboard-logout-button";
import { Suspense } from "react";
import { Sidebar } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex min-h-screen w-64 flex-col border-r bg-gray-100 p-4">
        <Suspense fallback={<NavSkeleton />}>
          <Sidebar />
        </Suspense>
        <div className="mt-auto border-t pt-4">
          <DashboardLogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

function NavSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-9 animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}
