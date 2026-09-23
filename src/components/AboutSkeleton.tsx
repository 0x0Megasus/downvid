import { Skeleton } from "@/components/ui/Skeleton";

function TextBlock({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-2">
      {lines.map((w, i) => (
        <Skeleton key={i} className={`h-3 rounded-sm ${w}`} />
      ))}
    </div>
  );
}

/**
 * Mirror of /about content. Shared by loading.tsx and the
 * navigation overlay so both always fit.
 */
export function AboutSkeleton() {
  return (
    <div
      className="w-full max-w-lg mx-auto space-y-5"
      aria-busy="true"
      aria-label="Loading about page"
    >
      <Skeleton className="h-8 w-28 rounded-sm" />

      <div className="bg-panel border border-hairline rounded-sm p-5 space-y-5">
        {/* What is Downvid? — one paragraph */}
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-1/3 rounded-sm" />
          <TextBlock lines={["w-full", "w-11/12", "w-2/3"]} />
        </div>

        {/* Video & Image Downloads — 4 steps */}
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-2/5 rounded-sm" />
          <TextBlock lines={["w-11/12", "w-10/12", "w-3/4", "w-2/3"]} />
        </div>

        {/* Music Downloads — 4 steps + note */}
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-1/3 rounded-sm" />
          <TextBlock
            lines={["w-11/12", "w-10/12", "w-3/4", "w-2/3", "w-full", "w-4/6"]}
          />
        </div>

        {/* Supported Platforms — 6 chips */}
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-2/5 rounded-sm" />
          <div className="flex flex-wrap gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-7 w-[72px] rounded-sm" />
            ))}
          </div>
        </div>

        {/* Why Downvid? — bullet list */}
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-1/4 rounded-sm" />
          <TextBlock lines={["w-1/2", "w-3/5", "w-2/5", "w-11/12", "w-1/2"]} />
        </div>
      </div>
    </div>
  );
}
