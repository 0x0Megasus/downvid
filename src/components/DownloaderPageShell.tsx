import type { ReactNode } from "react";
import type { Mode } from "@/types";

interface DownloaderPageShellProps {
  mode: Mode;
  title: ReactNode;
  description: string;
  panelLabel: string;
  jsonLdDescription?: string;
  children: ReactNode;
}

/**
 * Shared static shell for the Media (`/`) and Music (`/music`) pages.
 * Server-component friendly: no hooks, pure layout + copy.
 * Keeps both routes visually consistent without duplicating markup.
 */
export function DownloaderPageShell({
  mode,
  title,
  description,
  panelLabel,
  children,
}: DownloaderPageShellProps) {
  void mode;
  return (
    <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
      <div className="w-full max-w-lg mx-auto">
        <header className="mb-5 animate-rise">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-signal animate-pulse-dot"
            />
            <p className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-400">
              Downvid
            </p>
          </div>
          <h1 className="mt-2 font-display text-[30px] sm:text-[38px] font-bold leading-[1.02] tracking-tight text-white text-balance">
            {title}
          </h1>{" "}
          <br />
          <p className="mt-1 text-[13px] sm:text-sm text-zinc-500">
            {description}
          </p>
        </header>

        <section
          aria-label={panelLabel}
          className="bg-panel border border-hairline rounded-sm p-4 sm:p-5 animate-rise"
          style={{ animationDelay: "90ms" }}
        >
          {children}
        </section>
      </div>
    </main>
  );
}
