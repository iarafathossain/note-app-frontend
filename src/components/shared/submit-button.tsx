"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  children: React.ReactNode;
  pending: boolean;
  className?: string;
};

export function SubmitButton({
  children,
  pending,
  className = "w-full",
}: SubmitButtonProps) {
  return (
    <Button type="submit" className={className} disabled={pending}>
      {pending && <Loader2 className="animate-spin" />}
      {pending ? "Please wait..." : children}
    </Button>
  );
}
