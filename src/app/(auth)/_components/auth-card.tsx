import Link from "next/link";
import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  description: string;
  footerText: string;
  footerHref: string;
  footerLabel: string;
  children: ReactNode;
};

export function AuthCard({
  title,
  description,
  footerText,
  footerHref,
  footerLabel,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {children}
        <p className="text-center text-sm text-muted-foreground">
          {footerText}{" "}
          <Link href={footerHref} className="font-medium text-foreground underline underline-offset-4">
            {footerLabel}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
