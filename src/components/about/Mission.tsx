"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";

export default function Mission() {

  return (

    <section className="py-28 px-6">

      <div className="max-w-6xl mx-auto">

        <motion.div

          initial={{ opacity:0,y:40 }}

          whileInView={{ opacity:1,y:0 }}

          viewport={{ once:true }}

          className="glass rounded-[40px] p-12"

        >

          <div className="flex items-center gap-4">

            <Target
              className="text-cyan-400"
              size={34}
            />

            <h2 className="text-4xl font-bold">

              Our Mission

            </h2>

          </div>

          <p className="text-slate-300 mt-8 leading-9 text-lg">

            As large language models become increasingly capable,
            identifying whether written content originates from a
            human or an AI system has become more important than ever.

          </p>

          <p className="text-slate-400 mt-6 leading-9">

            HumanTrace was developed to provide a transparent,
            reliable, and scalable solution for AI text detection.
            By leveraging transformer-based natural language
            processing, the platform evaluates writing patterns,
            semantic consistency, and contextual features to
            produce accurate predictions with confidence scores.

          </p>

        </motion.div>

      </div>

    </section>

  );

}