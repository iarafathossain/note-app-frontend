"use client";

import { createUserAction } from "@/actions/user/create-user.action";
import type { ManagedUser } from "@/actions/user/get-users.action";
import { updateUserAction } from "@/actions/user/update-user.action";
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
import { UserFormValues, userSchema } from "../_lib/user-schema";

export function AddUser({ user }: { user?: ManagedUser }) {
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
  } = useForm<UserFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
      interests: "",
    },
  });

  const onSubmit = (values: UserFormValues) => {
    clearErrors();
    const parsed = userSchema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (
          field === "name" ||
          field === "email" ||
          field === "password" ||
          field === "role" ||
          field === "interests"
        ) {
          setError(field, { message: issue.message });
        }
      });
      return;
    }
    if (!user && parsed.data.password.length < 8) {
      setError("password", {
        message: "Password must be at least 8 characters.",
      });
      return;
    }
    setFormError(null);
    const input = {
      name: parsed.data.name,
      email: parsed.data.email,
      role: parsed.data.role,
      interests: parsed.data.interests
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
    startTransition(async () => {
      try {
        const result = user
          ? await updateUserAction(
              user.id,
              parsed.data.password
                ? { ...input, password: parsed.data.password }
                : input,
            )
          : await createUserAction({
              ...input,
              password: parsed.data.password,
            });
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
            variant={user ? "ghost" : "default"}
            size={user ? "icon" : "default"}
            aria-label={user ? "Edit user" : undefined}
            title={user ? "Edit user" : undefined}
          >
            {user ? <Pencil className="size-4" /> : "Add User"}
          </Button>
        }
        onClick={() => {
          setFormError(null);
          clearErrors();
          reset(
            user
              ? {
                  name: user.name,
                  email: user.email,
                  password: "",
                  role: user.role,
                  interests: user.interests.join(", "),
                }
              : undefined,
          );
        }}
      />
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
            <DialogDescription>
              {user
                ? "Update this user account."
                : "Create a new user account."}
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
            id="user-name"
            label="Name"
            registration={register("name")}
            error={errors.name}
            disabled={isPending}
          />
          <TextInputField
            id="user-email"
            label="Email"
            type="email"
            registration={register("email")}
            error={errors.email}
            disabled={isPending}
          />
          <TextInputField
            id="user-password"
            label={user ? "New password (optional)" : "Password"}
            type="password"
            registration={register("password")}
            error={errors.password}
            disabled={isPending}
          />
          <label className="grid gap-2 text-sm font-medium" htmlFor="user-role">
            Role
            <select
              id="user-role"
              className="h-8 rounded-lg border border-input bg-transparent px-2.5"
              {...register("role")}
              disabled={isPending}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <TextInputField
            id="user-interests"
            label="Interests (comma separated)"
            registration={register("interests")}
            error={errors.interests}
            disabled={isPending}
          />
          <DialogFooter>
            <SubmitButton pending={isPending}>
              {user ? "Update User" : "Create User"}
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
