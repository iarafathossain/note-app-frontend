"use client";

import { deleteUserAction } from "@/actions/user/delete-user.action";
import type { ManagedUser } from "@/actions/user/get-users.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AddUser } from "./add-user-form";

export function UserCard({ user }: { user: ManagedUser }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteUserAction(user.id);
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
        <CardTitle>{user.name}</CardTitle>
        <div className="flex gap-1">
          <AddUser user={user} />
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Delete user"
            title="Delete user"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <p>{user.email}</p>
        <p className="text-sm text-muted-foreground">{user.role}</p>
        {user.interests.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {user.interests.join(", ")}
          </p>
        )}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
