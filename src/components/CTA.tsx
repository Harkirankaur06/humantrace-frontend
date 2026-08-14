"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 py-32">

      <motion.div

        initial={{ opacity: 0, scale: .95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}

        transition={{ duration: .7 }}

        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-indigo-600 via-[#5A4BFF] to-cyan-500"

      >

        {/* Glow */}

        <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-cyan-400 blur-[150px] opacity-30"/>

        <div className="absolute -right-40 -bottom-40 w-96 h-96 rounded-full bg-indigo-500 blur-[150px] opacity-30"/>

        <div className="relative z-10 px-10 lg:px-24 py-24">

          <div className="flex justify-center">

            <div className="glass px-5 py-2 rounded-full flex items-center gap-2">

              <Sparkles
                size={18}
              />

              Ready to Analyze?

            </div>

          </div>

          <h2 className="text-center text-5xl lg:text-6xl font-bold mt-10 leading-tight">

            Detect AI Text

            <br/>

            In Seconds.

          </h2>

          <p className="max-w-3xl mx-auto text-center text-lg text-slate-200 mt-8 leading-8">

            Paste your content, let HumanTrace analyze it,
            and receive a prediction powered by a fine-tuned
            transformer model with confidence scoring.

          </p>

          <div className="flex justify-center mt-14">

            <Link

              href="/detect"

              className="bg-white text-black px-8 py-5 rounded-2xl flex items-center gap-3 font-semibold hover:scale-105 transition"

            >

              Start Detecting

              <ArrowRight size={18}/>

            </Link>

          </div>

        </div>

      </motion.div>

    </section>
  );
}