import { Navbar } from "@/components/Navbar";

export default function PrivacyLoading() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <div className="w-full max-w-lg mx-auto space-y-5">
          <h1 className="text-[28px] sm:text-[34px] font-bold text-center tracking-tight">
            <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Privacy
            </span>
          </h1>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-6">
            {[0, 1, 2].map((i) => (
              <section key={i} className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded-full w-2/5 animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-3 bg-zinc-800/60 rounded-full w-full animate-pulse" />
                  <div className="h-3 bg-zinc-800/60 rounded-full w-full animate-pulse" />
                  <div className="h-3 bg-zinc-800/60 rounded-full w-3/4 animate-pulse" />
                </div>
              </section>
            ))}

            <div className="pt-4 border-t border-zinc-800">
              <div className="h-3 bg-zinc-800/60 rounded-full w-2/5 animate-pulse" />
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </>
  );
}
