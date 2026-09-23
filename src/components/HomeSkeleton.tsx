import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Pixel-mirror of the home screen: wordmark lockup, display headline,
 * subline, action panel with input row, platform chips.
 * Shared by loading.tsx and the Suspense fallback so both always fit.
 */
export function HomeSkeleton() {
  return (
    <div className="w-full max-w-lg mx-auto" aria-busy="true" aria-label="Loading">
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="mt-2 h-9 w-11/12 rounded-sm sm:h-10" />
        <Skeleton className="mt-2 h-4 w-full rounded-sm" />
        <Skeleton className="mt-1.5 h-4 w-2/3 rounded-sm" />
      </div>

      <div className="border border-hairline bg-panel rounded-sm p-4 sm:p-5">
        <div className="flex gap-2">
          <Skeleton className="h-11 flex-1 rounded-sm" />
          <Skeleton className="h-11 w-[100px] rounded-sm" />
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
