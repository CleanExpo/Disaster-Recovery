import { Skeleton } from '@/components/ui/skeleton';

/** Skeleton shown while the applications list fetches from the DB */
export default function ApplicationsLoading() {
  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-lg" />
        ))}
        <Skeleton className="h-9 w-48 rounded-lg ml-auto" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
          {['Applicant', 'Business', 'Status', 'Submitted', 'Action'].map((col) => (
            <Skeleton key={col} className="h-4 w-20" />
          ))}
        </div>
        {/* Table rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-100 last:border-b-0"
          >
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-4 w-36 self-center" />
            <Skeleton className="h-6 w-20 rounded-full self-center" />
            <Skeleton className="h-4 w-16 self-center" />
            <Skeleton className="h-8 w-20 rounded-lg self-center" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-9 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
