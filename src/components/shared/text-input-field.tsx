"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TextInputFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  field?: "text" | "textarea";
  registration: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
  autoComplete?: string;
};

export function TextInputField({
  id,
  label,
  type = "text",
  field = "text",
  registration,
  error,
  disabled,
  autoComplete,
}: TextInputFieldProps) {
  const [visible, setVisible] = useState(false);
  const inputType = type === "password" && !visible ? "password" : "text";

  return (
    <FieldGroup className="grid gap-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        {field === "text" && (
          <Input
            id={id}
            type={inputType}
            autoComplete={autoComplete}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className={cn(
              type === "password" && "pr-10",
              error && "border-destructive focus-visible:border-destructive",
            )}
            {...registration}
          />
        )}

        {field === "textarea" && (
          <Textarea
            id={id}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            {...registration}
          />
        )}
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
    </FieldGroup>
  );
}
