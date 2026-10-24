"use client";

import { createPostAction } from "@/actions/post/create-post.action";
import type { Post } from "@/actions/post/get-posts.action";
import { updatePostAction } from "@/actions/post/update-post.action";
import { SubmitButton } from "@/components/shared/submit-button";
import { TextInputField } from "@/components/shared/text-input-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PostFormValues, postSchema } from "../_lib/post-schema";

export function AddPost({ post }: { post?: Post }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    formState: { errors },
  } = useForm<PostFormValues>({
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = (values: PostFormValues) => {
    clearErrors();
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field === "title" || field === "content") {
          setError(field, { message: issue.message });
        }
      });
      return;
    }

    setFormError(null);
    startTransition(async () => {
      try {
        const result = post
          ? await updatePostAction(post._id, parsed.data)
          : await createPostAction(parsed.data);

        if (!result.success) {
          setFormError(result.message);
          return;
        }

        reset();
        setOpen(false);
        router.refresh();
      } catch {
        setFormError("Unable to reach the server. Please try again.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant={post ? "ghost" : "default"}
            size={post ? "icon" : "default"}
            aria-label={post ? "Edit post" : undefined}
            title={post ? "Edit post" : undefined}
          >
            {post ? <Pencil className="size-4" /> : "Add Post"}
          </Button>
        }
        onClick={() => {
          setFormError(null);
          clearErrors();
          reset(post ? { title: post.title, content: post.content } : undefined);
        }}
      />
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-x-0 space-y-4"
        >
          <DialogHeader>
            <DialogTitle>{post ? "Edit Post" : "Add Post"}</DialogTitle>
            <DialogDescription>
              {post
                ? "Update your post here. Click save when you&apos;re done."
                : "Add a new post here. Click save when you&apos;re done."}
            </DialogDescription>
          </DialogHeader>
          {formError && (
            <p
              className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
              role="alert"
            >
              {formError}
            </p>
          )}
          <TextInputField
            id={post ? `edit-post-title-${post._id}` : "post-title"}
            label="Title"
            registration={register("title")}
            error={errors.title}
            disabled={isPending}
          />
          <TextInputField
            id={post ? `edit-post-content-${post._id}` : "post-content"}
            label="Content"
            field="textarea"
            registration={register("content")}
            error={errors.content}
            disabled={isPending}
          />
          <DialogFooter>
            <SubmitButton pending={isPending}>
              {post ? "Update Post" : "Create Post"}
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
