"use client";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
  pending: boolean;
};

export function SubmitButton({ children, pending }: SubmitButtonProps) {
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <LoaderCircle className="animate-spin" />}
      {pending ? "Please wait..." : children}
    </Button>
  );
}
