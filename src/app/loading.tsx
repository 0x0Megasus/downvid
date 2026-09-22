import { Skeleton } from "@/components/ui/Skeleton";
import { Navbar } from "@/components/Navbar";

export default function Loading() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <div className="w-full max-w-lg mx-auto" aria-busy="true" aria-label="Loading">
          <div className="flex items-center gap-2.5 mb-5">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-7 w-44 rounded-sm" />
          </div>

          <div className="bg-panel border border-hairline rounded-sm p-4 sm:p-5">
            <div className="flex gap-2">
              <Skeleton className="h-11 flex-1 rounded-sm" />
              <Skeleton className="h-11 w-[100px] rounded-sm" />
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-2/5" />
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </>
  );
}
