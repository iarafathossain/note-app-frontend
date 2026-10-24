import { getUsersAction } from "@/actions/user/get-users.action";
import { UserCard } from "./user-card";

export async function UserList({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string; limit?: string }>;
}) {
  const params = await searchParams;

  const response = await getUsersAction({
    search: params.search?.trim() || undefined,
    page: Math.max(1, Number(params.page) || 1),
    limit: Math.min(50, Math.max(1, Number(params.limit) || 10)),
  });

  const users = response.data?.users ?? [];

  if (!response.success)
    return <p className="mt-4 text-red-600">{response.message}</p>;

  if (users.length === 0) return <p className="mt-4">No users found.</p>;

  return (
    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
