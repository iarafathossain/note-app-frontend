"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { registerAction } from "@/actions/auth/register.action";
import { SubmitButton } from "@/components/shared/submit-button";
import { TextInputField } from "@/components/shared/text-input-field";
import { ROUTES } from "@/lib/route-config";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../_lib/auth-schemas";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (values: RegisterFormValues) => {
    clearErrors();
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (
          field === "name" ||
          field === "email" ||
          field === "password" ||
          field === "confirmPassword"
        ) {
          setError(field, { message: issue.message });
        }
      });
      return;
    }

    setFormError(null);
    startTransition(async () => {
      try {
        const result = await registerAction({
          name: parsed.data.name,
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (!result.success) {
          setFormError(result.message);
          return;
        }

        if (!result.data?.user) {
          setFormError("Registration succeeded, but no user data was returned.");
          return;
        }

        reset();
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
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive" role="alert">
          {formError}
        </p>
      )}
      <TextInputField
        id="register-name"
        label="Name"
        autoComplete="name"
        registration={register("name")}
        error={errors.name}
        disabled={isPending}
      />
      <TextInputField
        id="register-email"
        label="Email"
        type="email"
        autoComplete="email"
        registration={register("email")}
        error={errors.email}
        disabled={isPending}
      />
      <TextInputField
        id="register-password"
        label="Password"
        type="password"
        autoComplete="new-password"
        registration={register("password")}
        error={errors.password}
        disabled={isPending}
      />
      <TextInputField
        id="register-confirm-password"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        registration={register("confirmPassword")}
        error={errors.confirmPassword}
        disabled={isPending}
      />
      <SubmitButton pending={isPending}>Create account</SubmitButton>
    </form>
  );
}
