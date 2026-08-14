import Link from "next/link";

export default function Footer() {

  return (

    <footer className="border-t border-white/10 mt-24">

      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>

            <h2 className="text-3xl font-bold gradientText">

              HumanTrace

            </h2>

            <p className="text-slate-400 mt-3">

              AI Text Detection Platform

            </p>

          </div>

          <div className="flex gap-8 text-slate-400">

            <Link href="/">

              Home

            </Link>

            <Link href="/detect">

              Detect

            </Link>

            <Link href="/about">

              About

            </Link>

          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-slate-500">

          © {new Date().getFullYear()} HumanTrace.
          Built using Next.js, React and DistilBERT.

        </div>

      </div>

    </footer>

  );

}