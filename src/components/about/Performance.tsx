"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    value: "98.82%",
    label: "Accuracy",
  },
  {
    value: "99.00%",
    label: "Precision",
  },
  {
    value: "99.33%",
    label: "Recall",
  },
  {
    value: "99.17%",
    label: "F1 Score",
  },
];

export default function Performance() {

  return (

    <section className="py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-cyan-400">
            PERFORMANCE
          </p>

          <h2 className="text-5xl font-bold mt-5">
            Model Evaluation
          </h2>

          <p className="text-slate-400 mt-6 max-w-3xl mx-auto leading-8">

            HumanTrace was evaluated on a held-out dataset containing
            human-written and AI-generated documents.

          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {metrics.map((metric,index)=>(

            <motion.div

              key={metric.label}

              initial={{opacity:0,y:40}}

              whileInView={{opacity:1,y:0}}

              viewport={{once:true}}

              transition={{delay:index*.12}}

              whileHover={{scale:1.04}}

              className="glass rounded-3xl p-8 text-center"

            >

              <h2 className="text-5xl font-bold gradientText">

                {metric.value}

              </h2>

              <p className="mt-5 text-slate-400">

                {metric.label}

              </p>

            </motion.div>

          ))}

        </div>

        <div className="glass rounded-3xl p-10 mt-16">

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>

              <h3 className="text-4xl font-bold">
                425
              </h3>

              <p className="text-slate-400 mt-2">
                Evaluation Samples
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold">
                125
              </h3>

              <p className="text-slate-400 mt-2">
                Human Samples
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold">
                300
              </h3>

              <p className="text-slate-400 mt-2">
                AI Samples
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}