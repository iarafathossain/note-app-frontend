"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPost() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const trimmedSearch = search.trim();
      const currentSearch = searchParams.get("search") ?? "";

      if (trimmedSearch === currentSearch) return;

      const params = new URLSearchParams(searchParams.toString());
      if (trimmedSearch) params.set("search", trimmedSearch);
      else params.delete("search");
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [pathname, router, search, searchParams]);

  return (
    <Input
      placeholder="Search posts..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      aria-label="Search posts"
    />
  );
}
