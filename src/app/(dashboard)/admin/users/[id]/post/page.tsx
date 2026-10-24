import { getUserPostsAction } from "@/actions/post/get-user-posts.action";
import PostCard from "@/app/(dashboard)/user/post/_components/post-card";

type SearchParams = Promise<{ page?: string; limit?: string }>;

export default async function UserPostsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 10));
  const response = await getUserPostsAction(id, { page, limit });
  const posts = response.data?.posts ?? [];

  if (!response.success) {
    return <p className="text-red-600">{response.message}</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">
        Posts by {response.data?.user.name ?? "User"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {response.data?.user.email}
      </p>
      {posts.length === 0 ? (
        <p className="mt-4">This user has no posts.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
