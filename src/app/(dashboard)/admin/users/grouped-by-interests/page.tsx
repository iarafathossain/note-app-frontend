import { Suspense } from "react";
import UserGroup from "./_components/user-group";

export default async function UsersGroupedByInterestsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Users Grouped By Interests</h1>

      <Suspense fallback={<p>Loading...</p>}>
        <UserGroup />
      </Suspense>
    </div>
  );
}
