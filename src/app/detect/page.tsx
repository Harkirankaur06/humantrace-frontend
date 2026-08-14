import Navbar from "@/components/Navbar";
import Detector from "@/components/Detector";

export default function DetectPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 px-6">

        <div className="max-w-6xl mx-auto">

          <Detector />

        </div>

      </main>
    </>
  );
}