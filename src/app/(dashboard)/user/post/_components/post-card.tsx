"use client";

import { deletePostAction } from "@/actions/post/delete-post.action";
import type { Post } from "@/actions/post/get-posts.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AddPost } from "./add-post-form";

export default function PostCard({ post }: { post: Post }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deletePostAction(post._id);
      if (!result.success) {
        setError(result.message);
        return;
      }
      router.refresh();
    });
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{post.title}</CardTitle>
        <div className="flex gap-1">
          <AddPost post={post} />
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Delete post"
            title="Delete post"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      {error && (
        <p className="px-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <CardFooter>{post.createdAt}</CardFooter>
    </Card>
  );
}
