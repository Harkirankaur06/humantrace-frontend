"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  Zap,
  BarChart3,
  FileText,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Fine-Tuned DistilBERT",
    description:
      "Powered by a transformer model trained on diverse human and AI-generated writing for robust detection.",
  },
  {
    icon: Zap,
    title: "Fast Inference",
    description:
      "Receive predictions within seconds, enabling real-time analysis of essays, articles, and reports.",
  },
  {
    icon: BarChart3,
    title: "Confidence Scores",
    description:
      "Each prediction includes confidence values to help interpret model certainty.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Focused",
    description:
      "Your text is analyzed securely without unnecessary storage of submitted content.",
  },
  {
    icon: FileText,
    title: "Long Text Support",
    description:
      "Optimized preprocessing allows analysis of lengthy documents while maintaining reliable performance.",
  },
  {
    icon: Globe,
    title: "Modern Deployment",
    description:
      "Built with Next.js, Flask, and Hugging Face Transformers for scalable deployment.",
  },
];

export default function Features() {
  return (
    <section className="py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.3em] text-cyan-400 mb-4">
            FEATURES
          </p>

          <h2 className="text-5xl font-bold">
            Why Choose{" "}
            <span className="gradientText">
              HumanTrace
            </span>
          </h2>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto leading-8">
            HumanTrace combines modern NLP with an intuitive interface,
            providing reliable AI-text detection backed by transformer models
            and rigorous evaluation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="glass rounded-3xl p-8"
              >

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">

                  <Icon
                    size={28}
                    color="white"
                  />

                </div>

                <h3 className="text-2xl font-semibold mt-8">

                  {feature.title}

                </h3>

                <p className="text-slate-400 mt-5 leading-8">

                  {feature.description}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}