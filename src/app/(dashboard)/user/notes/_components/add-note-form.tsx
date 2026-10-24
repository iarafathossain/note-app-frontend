"use client";

import { createNoteAction } from "@/actions/note/create-note.action";
import { updateNoteAction } from "@/actions/note/update-note.action";
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
import type { Note } from "@/actions/note/get-notes.action";
import { NoteFormValues, noteSchema } from "../_lib/note-schema";

export function AddNote({ note }: { note?: Note }) {
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
  } = useForm<NoteFormValues>({
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = (values: NoteFormValues) => {
    clearErrors();
    const parsed = noteSchema.safeParse(values);

    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (field === "title" || field === "content") {
          setError(field as "title" | "content", { message: issue.message });
        }
      });
      return;
    }

    setFormError(null);
    startTransition(async () => {
      try {
        const result = note
          ? await updateNoteAction(note._id, parsed.data)
          : await createNoteAction(parsed.data);

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
            variant={note ? "ghost" : "default"}
            size={note ? "icon" : "default"}
            aria-label={note ? "Edit note" : undefined}
            title={note ? "Edit note" : undefined}
          >
            {note ? <Pencil className="size-4" /> : "Add Note"}
          </Button>
        }
        onClick={() => {
          setFormError(null);
          clearErrors();
          reset(note ? { title: note.title, content: note.content } : undefined);
        }}
      />
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-x-0 space-y-4"
        >
          <DialogHeader>
            <DialogTitle>{note ? "Edit Note" : "Add Note"}</DialogTitle>
            <DialogDescription>
              {note
                ? "Update your note here. Click save when you&apos;re done."
                : "Add a new note here. Click save when you&apos;re done."}
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
            id="title"
            label="Title"
            registration={register("title")}
            error={errors.title}
            disabled={isPending}
          />

          <TextInputField
            id="content"
            label="Content"
            field="textarea"
            registration={register("content")}
            error={errors.content}
            disabled={isPending}
          />

          <DialogFooter>
            <SubmitButton pending={isPending}>
              {note ? "Update Note" : "Create Note"}
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
