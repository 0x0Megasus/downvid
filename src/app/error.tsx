"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
        <p className="text-sm text-zinc-400">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
