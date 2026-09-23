import { PrivacySkeleton } from "@/components/PrivacySkeleton";
import { Navbar } from "@/components/Navbar";

export default function PrivacyLoading() {
  return (
    <>
      <main className="flex-1 flex items-center justify-center px-5 pb-24 pt-4">
        <PrivacySkeleton />
      </main>

      <Navbar />
    </>
  );
}
