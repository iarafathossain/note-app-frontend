import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { AddUser } from "./_components/add-user-form";
import { SearchUsers } from "./_components/search-users";
import { UserList } from "./_components/user-list";

type SearchParams = Promise<{ search?: string; page?: string; limit?: string }>;

export default function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Suspense
          fallback={
            <Input
              placeholder="Search users..."
              disabled
              aria-label="Search users"
            />
          }
        >
          <SearchUsers />
        </Suspense>
        <AddUser />
      </div>
      <Suspense
        fallback={
          <ul className="mt-4 flex flex-col gap-3">
            <li className="h-16 animate-pulse rounded bg-gray-200" />
          </ul>
        }
      >
        <UserList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
