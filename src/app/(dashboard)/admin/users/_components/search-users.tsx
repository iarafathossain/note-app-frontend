"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchUsers() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const value = search.trim();
      if (value === (searchParams.get("search") ?? "")) return;
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set("search", value);
      else params.delete("search");
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [pathname, router, search, searchParams]);
  return (
    <Input
      placeholder="Search users..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      aria-label="Search users"
    />
  );
}
