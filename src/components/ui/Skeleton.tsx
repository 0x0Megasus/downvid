import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  animated?: boolean;
}

/**
 * Shared loading placeholder. Renders a static wash when the user
 * prefers reduced motion, shimmer otherwise.
 */
export function Skeleton({ className, animated = true }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("skeleton rounded-sm", animated && "skeleton-animated", className)}
    />
  );
}
