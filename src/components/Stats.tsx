"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Database,
  Gauge,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: Gauge,
    value: "98.82%",
    label: "Accuracy",
  },
  {
    icon: ShieldCheck,
    value: "99.17%",
    label: "F1 Score",
  },
  {
    icon: Database,
    value: "425",
    label: "Evaluation Samples",
  },
  {
    icon: Brain,
    value: "DistilBERT",
    label: "Model",
  },
];

export default function Stats() {
  return (
    <section className="py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -8,
                }}
                className="glass rounded-3xl p-8"
              >
                <Icon
                  className="text-cyan-400"
                  size={34}
                />

                <h2 className="mt-6 text-4xl font-bold">

                  {item.value}

                </h2>

                <p className="text-slate-400 mt-3">

                  {item.label}

                </p>

              </motion.div>
            );
          })}
        </motion.div>

      </div>

    </section>
  );
}