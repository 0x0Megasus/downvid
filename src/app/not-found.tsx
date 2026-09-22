import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-5">
      <div className="w-full max-w-lg rounded-sm border border-hairline bg-panel p-6 animate-rise">
        <p className="font-mono text-[13px] font-medium text-zinc-500">404</p>
        <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-white">
          Nothing here
        </h2>
        <p className="mt-1 text-[13px] text-zinc-500">
          This address has no screen. Head back to download something.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-sm bg-signal-deep px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-signal active:scale-[0.98]"
        >
          Back to Downvid
        </Link>
      </div>
    </div>
  );
}
