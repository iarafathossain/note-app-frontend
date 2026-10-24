import { getPostsAction } from "@/actions/post/get-posts.action";
import PostCard from "./post-card";

export async function PostsList({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string; limit?: string }>;
}) {
  const sp = await searchParams;
  const search = sp.search?.trim() || undefined;
  const page = Math.max(1, Number(sp.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(sp.limit) || 10));
  const response = await getPostsAction({ search, page, limit });
  const posts = response.data?.posts ?? [];

  if (!response.success) {
    return <p className="mt-4 text-red-600">{response.message}</p>;
  }

  if (posts.length === 0) {
    return <p className="mt-4">No posts found.</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
