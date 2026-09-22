import { Skeleton } from "@/components/ui/Skeleton";
import { Navbar } from "@/components/Navbar";

export default function AboutLoading() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <div
          className="w-full max-w-lg mx-auto space-y-5"
          aria-busy="true"
          aria-label="Loading about page"
        >
          <Skeleton className="h-8 w-36 rounded-sm" />

          <div className="bg-panel border border-hairline rounded-sm p-5 space-y-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-2.5">
                <Skeleton className="h-4 w-1/3" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}

            <div className="space-y-2.5">
              <Skeleton className="h-4 w-2/5" />
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-7 w-[72px] rounded-sm" />
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
