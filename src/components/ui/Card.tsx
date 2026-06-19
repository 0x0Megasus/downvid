import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ className, glow, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6",
        glow && "shadow-lg shadow-red-600/5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
