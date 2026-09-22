import { Skeleton } from "@/components/ui/Skeleton";
import { Navbar } from "@/components/Navbar";

export default function PrivacyLoading() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <div
          className="w-full max-w-lg mx-auto space-y-5"
          aria-busy="true"
          aria-label="Loading privacy page"
        >
          <Skeleton className="h-8 w-32 rounded-sm" />

          <div className="bg-panel border border-hairline rounded-sm p-5 space-y-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2.5">
                <Skeleton className="h-4 w-2/5" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-hairline">
              <Skeleton className="h-3 w-2/5" />
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </>
  );
}
