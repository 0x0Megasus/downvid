import { HomeSkeleton } from "@/components/HomeSkeleton";
import { Navbar } from "@/components/Navbar";

export default function MusicLoading() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <HomeSkeleton />
      </main>

      <Navbar activeMode="music" />
    </>
  );
}
