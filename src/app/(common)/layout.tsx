import { SiteFooter } from "@/components/site-footer";
import { SiteHeaderSkeleton } from "@/components/site-header-skeleton";
import { SiteHeaderWithUser } from "@/components/site-header-with-user";
import React, { Suspense } from "react";

export default function PublicLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<SiteHeaderSkeleton />}>
        <SiteHeaderWithUser />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
