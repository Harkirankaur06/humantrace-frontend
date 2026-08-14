"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6">

      <div className="heroBlob blob1 -top-20 left-0" />
      <div className="heroBlob blob2 bottom-0 right-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
        className="relative z-10 max-w-5xl text-center"
      >

        <p className="uppercase tracking-[0.35em] text-cyan-400 mb-5">

          ABOUT HUMANTRACE

        </p>

        <h1 className="text-6xl lg:text-7xl font-bold leading-tight">

          Detecting the Difference Between

          <span className="gradientText">

            {" "}Human Creativity{" "}

          </span>

          and Artificial Intelligence.

        </h1>

        <p className="text-slate-300 text-xl leading-9 mt-10 max-w-3xl mx-auto">

          HumanTrace is an AI-powered text detection platform built on modern
          transformer architectures. It analyzes linguistic patterns to
          distinguish between human-authored and AI-generated content with
          high accuracy.

        </p>

        <Link
          href="/detect"
          className="inline-flex mt-14 bg-indigo-600 px-8 py-5 rounded-2xl items-center gap-3 hover:scale-105 transition"
        >

          Try HumanTrace

          <ArrowRight size={18}/>

        </Link>

      </motion.div>

    </section>
  );
}