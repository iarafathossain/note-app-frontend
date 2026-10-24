"use client";

import { loginAction } from "@/actions/auth/login.action";
import { SubmitButton } from "@/components/shared/submit-button";
import { TextInputField } from "@/components/shared/text-input-field";
import { ROUTES } from "@/lib/route-config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "../../_lib/auth-schemas";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginFormValues) => {
    clearErrors();
    const parsed = loginSchema.safeParse(values);

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field === "email" || field === "password") {
          setError(field as "email" | "password", { message: issue.message });
        }
      });
      return;
    }

    setFormError(null);
    startTransition(async () => {
      try {
        const result = await loginAction(parsed.data);

        if (!result.success || !result.data?.user) {
          setFormError(result.message);
          return;
        }

        const targetRoute =
          result.data.user.role === "ADMIN"
            ? ROUTES.adminDashboard
            : ROUTES.userDashboard;

        router.push(targetRoute);
        router.refresh();
      } catch {
        setFormError("Unable to reach the server. Please try again.");
      }
    });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {formError && (
        <p
          className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
          role="alert"
        >
          {formError}
        </p>
      )}
      <TextInputField
        id="login-email"
        label="Email"
        type="email"
        autoComplete="email"
        registration={register("email")}
        error={errors.email}
        disabled={isPending}
      />
      <TextInputField
        id="login-password"
        label="Password"
        type="password"
        autoComplete="current-password"
        registration={register("password")}
        error={errors.password}
        disabled={isPending}
      />
      <SubmitButton pending={isPending}>Go ahead</SubmitButton>
      <Link
        href={ROUTES.register}
        className="text-center text-sm text-muted-foreground hover:text-foreground"
      >
        Need an account? Register
      </Link>
    </form>
  );
}
