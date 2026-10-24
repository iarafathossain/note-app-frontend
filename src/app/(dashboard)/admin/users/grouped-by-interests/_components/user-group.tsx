import { getUsersGroupedByInterestsAction } from "@/actions/user/get-users-grouped-by-interests.action";

export default async function UserGroup() {
  const response = await getUsersGroupedByInterestsAction();
  const groups = response.data?.groups ?? [];

  if (!response.success) {
    return <p className="text-red-600">{response.message}</p>;
  }

  if (groups.length === 0) {
    return <p>No users have interests assigned.</p>;
  }

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <section
          key={group.interest}
          className="rounded-xl bg-card p-4 text-card-foreground ring-1 ring-foreground/10"
        >
          <h2 className="font-medium">{group.interest}</h2>
          <ul className="mt-3 space-y-2">
            {group.users.map((user) => (
              <li key={user._id}>
                <p>{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
