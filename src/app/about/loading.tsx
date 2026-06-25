import { Navbar } from "@/components/Navbar";

export default function AboutLoading() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <div className="w-full max-w-lg mx-auto space-y-5">
          <h1 className="text-[28px] sm:text-[34px] font-bold text-center tracking-tight">
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              About
            </span>
          </h1>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-5">
            {[0, 1, 2, 3].map((i) => (
              <section key={i} className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded-full w-1/3 animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-3 bg-zinc-800/60 rounded-full w-full animate-pulse" />
                  <div className="h-3 bg-zinc-800/60 rounded-full w-5/6 animate-pulse" />
                  <div className="h-3 bg-zinc-800/60 rounded-full w-4/6 animate-pulse" />
                </div>
              </section>
            ))}

            <section className="space-y-2">
              <div className="h-4 bg-zinc-800 rounded-full w-2/5 animate-pulse" />
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-7 bg-zinc-800 rounded-md w-[72px] animate-pulse"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Navbar />
    </>
  );
}
