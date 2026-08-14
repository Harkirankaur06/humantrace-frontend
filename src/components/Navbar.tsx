"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <Link
          href="/"
          className="text-2xl font-bold gradientText"
        >
          HumanTrace
        </Link>

        <div className="flex items-center gap-8 text-sm">

          <Link href="/">Home</Link>

          <Link href="/detect">Detect</Link>

          <Link href="/about">About</Link>

        </div>

      </div>
    </motion.nav>
  );
}