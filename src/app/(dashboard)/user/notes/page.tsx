import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { AddNote } from "./_components/add-note-form";
import { NotesList } from "./_components/note-list";
import SearchNote from "./_components/search-note";

type SearchParams = Promise<{
  search?: string;
  page?: string;
  limit?: string;
}>;

export default function NotePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div>
      {/* search note + add note */}
      <div className="flex items-center gap-2">
        <Suspense
          fallback={
            <Input
              placeholder="Search notes..."
              disabled
              aria-label="Search notes"
            />
          }
        >
          <SearchNote />
        </Suspense>
        <AddNote />
      </div>

      {/* note list (dynamic, streamed) */}
      <Suspense fallback={<NotesSkeleton />}>
        <NotesList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function NotesSkeleton() {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="h-16 animate-pulse rounded bg-gray-200" />
      ))}
    </ul>
  );
}
