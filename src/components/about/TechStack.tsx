"use client";

import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  Server,
  BrainCircuit,
  Cloud,
} from "lucide-react";

const stack = [
  {
    icon: MonitorSmartphone,
    title: "Frontend",
    items: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS v4",
      "Framer Motion",
      "TypeScript",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    items: [
      "Python",
      "Flask",
      "REST API",
      "JSON",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Machine Learning",
    items: [
      "DistilBERT",
      "Transformers",
      "PyTorch",
      "HuggingFace",
    ],
  },
  {
    icon: Cloud,
    title: "Deployment",
    items: [
      "Vercel",
      "Flask API",
      "GitHub",
      "Docker Ready",
    ],
  },
];

export default function TechStack() {
  return (
    <section className="py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-cyan-400">
            TECHNOLOGY
          </p>

          <h2 className="text-5xl font-bold mt-5">
            Built Using Modern Technologies
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-20">

          {stack.map((section, index) => {

            const Icon = section.icon;

            return (

              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass rounded-3xl p-8"
              >

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">

                    <Icon color="white"/>

                  </div>

                  <h3 className="text-3xl font-bold">
                    {section.title}
                  </h3>

                </div>

                <ul className="mt-8 space-y-4">

                  {section.items.map(item => (

                    <li
                      key={item}
                      className="text-slate-300 flex items-center gap-3"
                    >

                      <span className="w-2 h-2 rounded-full bg-cyan-400"/>

                      {item}

                    </li>

                  ))}

                </ul>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}