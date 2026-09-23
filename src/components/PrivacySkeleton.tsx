import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Mirror of /privacy content. Shared by loading.tsx and the
 * navigation overlay so both always fit.
 */
export function PrivacySkeleton() {
  return (
    <div
      className="w-full max-w-lg mx-auto space-y-5"
      aria-busy="true"
      aria-label="Loading privacy page"
    >
      <Skeleton className="h-8 w-32 rounded-sm" />

      <div className="bg-panel border border-hairline rounded-sm p-5 space-y-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-2.5">
            <Skeleton className="h-4 w-2/5 rounded-sm" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full rounded-sm" />
              <Skeleton className="h-3 w-full rounded-sm" />
              <Skeleton className="h-3 w-3/4 rounded-sm" />
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-hairline">
          <Skeleton className="h-3 w-2/5 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
