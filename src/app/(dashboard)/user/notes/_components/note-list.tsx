import { getNotesAction } from "@/actions/note/get-notes.action";
import NoteCard from "./note-card";

export async function NotesList({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string; limit?: string }>;
}) {
  const sp = await searchParams;

  const search = sp.search?.trim() || undefined;
  const page = Math.max(1, Number(sp.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(sp.limit) || 10));

  const response = await getNotesAction({ search, page, limit });
  const notes = response.data?.notes ?? [];

  if (!response.success) {
    return <p className="mt-4 text-red-600">{response.message}</p>;
  }

  if (notes.length === 0) {
    return <p className="mt-4">No notes found.</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
}
