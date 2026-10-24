"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TextInputFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  registration: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
  autoComplete?: string;
};

export function TextInputField({
  id,
  label,
  type = "text",
  registration,
  error,
  disabled,
  autoComplete,
}: TextInputFieldProps) {
  const [visible, setVisible] = useState(false);
  const inputType = type === "password" && !visible ? "password" : "text";

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
            type === "password" && "pr-10",
            error && "border-destructive focus-visible:border-destructive",
          )}
          {...registration}
        />
        {type === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1"
            onClick={() => setVisible((current) => !current)}
            disabled={disabled}
            aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          >
            {visible ? <EyeOff /> : <Eye />}
          </Button>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
