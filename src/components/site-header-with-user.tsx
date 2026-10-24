import { getCurrentUserAction } from "@/actions/auth/me.action";
import { SiteHeader } from "@/components/site-header";

export async function SiteHeaderWithUser() {
  const response = await getCurrentUserAction();
  const user = response.success ? response.data?.user : null;

  return <SiteHeader user={user} />;
}
