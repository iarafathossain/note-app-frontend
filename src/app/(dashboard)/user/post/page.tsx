import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { AddPost } from "./_components/add-post-form";
import { PostsList } from "./_components/post-list";
import SearchPost from "./_components/search-post";

type SearchParams = Promise<{
  search?: string;
  page?: string;
  limit?: string;
}>;

export default function PostPage({
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
              placeholder="Search posts..."
              disabled
              aria-label="Search posts"
            />
          }
        >
          <SearchPost />
        </Suspense>
        <AddPost />
      </div>
      <Suspense fallback={<PostsSkeleton />}>
        <PostsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function PostsSkeleton() {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index} className="h-16 animate-pulse rounded bg-gray-200" />
      ))}
    </ul>
  );
}
