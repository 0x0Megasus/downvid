export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce" />
      </div>
    </div>
  );
}
