export default function DashboardLoading() {
  return (
    <div>
      <div className="h-7 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
