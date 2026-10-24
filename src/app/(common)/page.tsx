export default function Home() {
  return (
    <main className="flex flex-1 items-center px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Simple, focused note-taking
        </p>
        <h1 className="max-w-xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Keep your thoughts organized.
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Create an account or log in to access your personal dashboard.
        </p>
      </div>
    </main>
  );
}
