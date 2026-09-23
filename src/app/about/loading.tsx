import { AboutSkeleton } from "@/components/AboutSkeleton";
import { Navbar } from "@/components/Navbar";

export default function AboutLoading() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <AboutSkeleton />
      </main>

      <Navbar />
    </>
  );
}
