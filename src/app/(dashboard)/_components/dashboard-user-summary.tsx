import type { CurrentUser } from "@/actions/auth/me.action";

export function DashboardUserSummary({ user }: { user: CurrentUser }) {
  return (
    <section className="mt-6 rounded-xl bg-card p-6 text-card-foreground ring-1 ring-foreground/10">
      <h2 className="text-lg font-semibold">Your account</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-muted-foreground">Name</dt>
          <dd>{user.name}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Role</dt>
          <dd>{user.role}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Member since</dt>
          <dd>{new Date(user.createdAt).toLocaleDateString()}</dd>
        </div>
      </dl>
    </section>
  );
}
