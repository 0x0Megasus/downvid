import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-extrabold text-zinc-800">404</h2>
        <p className="text-zinc-400">Page not found</p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
