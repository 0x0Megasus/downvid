import { Navbar } from "@/components/Navbar";

function ShimmerLine({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 bg-[length:200%_100%] animate-shimmer rounded-full ${className ?? ""}`}
    />
  );
}

export default function AboutLoading() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <div className="w-full max-w-lg mx-auto space-y-5">
          <div className="text-center">
            <ShimmerLine className="h-[34px] w-40 mx-auto" />
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2.5">
                <ShimmerLine className="h-4 w-1/3" />
                <div className="space-y-2">
                  <ShimmerLine className="h-3 w-full" />
                  <ShimmerLine className="h-3 w-5/6" />
                  <ShimmerLine className="h-3 w-2/3" />
                </div>
              </div>
            ))}

            <div className="space-y-2.5">
              <ShimmerLine className="h-4 w-2/5" />
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <ShimmerLine key={i} className="h-7 w-[72px] rounded-md" />
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
