import { getCurrentUserAction } from "@/actions/auth/me.action";
import { DashboardUserSummary } from "@/app/(dashboard)/_components/dashboard-user-summary";

export default async function AdminDashboardPage() {
  const response = await getCurrentUserAction();

  if (!response.success || !response.data?.user) {
    return <p className="text-destructive">{response.message}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Welcome, {response.data.user.name}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Here&apos;s an overview of your account.
      </p>
      <DashboardUserSummary user={response.data.user} />
    </div>
  );
}
