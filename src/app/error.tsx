"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center px-5">
      <div className="w-full max-w-lg rounded-sm border border-hairline bg-panel p-6 animate-rise">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />
          <p className="text-[13px] font-semibold text-zinc-300">Downvid</p>
        </div>
        <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-white">
          This screen broke
        </h2>
        <p className="mt-1 text-[13px] text-zinc-500">
          {error.message || "Reload the view and continue where you left off."}
        </p>
        <button
          onClick={reset}
          className="mt-4 rounded-sm bg-signal-deep px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-signal active:scale-[0.98]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
