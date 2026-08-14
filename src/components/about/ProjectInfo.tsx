"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const features = [
  "Transformer-based AI text detection",
  "Fine-tuned DistilBERT classifier",
  "Confidence score estimation",
  "Real-time prediction interface",
  "Text and file input support",
  "Responsive web application",
  "REST API integration",
  "Modern glassmorphism UI",
];

export default function ProjectInfo() {

  return (

    <section className="py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <motion.div

          initial={{opacity:0}}

          whileInView={{opacity:1}}

          viewport={{once:true}}

          className="glass rounded-[40px] p-12"

        >

          <div className="flex items-center gap-4">

            <Sparkles
              className="text-cyan-400"
            />

            <h2 className="text-4xl font-bold">

              About the Project

            </h2>

          </div>

          <p className="text-slate-300 leading-9 mt-8">

            HumanTrace is an end-to-end AI text detection platform designed
            to distinguish between human-authored and AI-generated content.
            The application combines modern web technologies with transformer-based
            natural language processing to provide fast, reliable and intuitive
            text analysis through a responsive user interface.

          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-12">

            {features.map(feature=>(

              <div

                key={feature}

                className="flex items-center gap-4"

              >

                <CheckCircle2
                  className="text-green-400"
                />

                <span>

                  {feature}

                </span>

              </div>

            ))}

          </div>

          <div className="glass rounded-3xl p-8 mt-14">

            <h3 className="text-2xl font-semibold">

              Future Scope

            </h3>

            <p className="text-slate-400 leading-8 mt-5">

              Future enhancements include support for multilingual
              detection, larger transformer models, document-level
              analytics, explainable AI visualizations, plagiarism
              integration, and batch document processing for
              enterprise-scale deployments.

            </p>

          </div>

          <div className="glass rounded-3xl p-8 mt-14">

            <h2 className="text-4xl font-bold text-white">
              Created by Harkiran Kaur
            </h2>

            <p className="mt-5 text-slate-300">
              as an end-to-end AI text detection platform.
              The project combines modern web development with
              transformer-based natural language processing to
              deliver an intuitive and accurate AI text detection experience.t
            </p>

          </div>
        </motion.div>

      </div>

    </section>

  );

}