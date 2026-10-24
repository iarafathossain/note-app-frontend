"use client";

import { deleteNoteAction } from "@/actions/note/delete-note.action";
import type { Note } from "@/actions/note/get-notes.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AddNote } from "./add-note-form";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteNoteAction(note._id);
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
        <CardTitle>{note.title}</CardTitle>
        <div className="flex gap-1">
          <AddNote note={note} />
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Delete note"
            title="Delete note"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p>{note.content}</p>
      </CardContent>
      {error && (
        <p className="px-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <CardFooter>{note.createdAt}</CardFooter>
    </Card>
  );
}
