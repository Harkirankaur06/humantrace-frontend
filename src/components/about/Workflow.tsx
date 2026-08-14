"use client";

import { motion } from "framer-motion";

import {
    FileText,
    Sparkles,
    Database,
    BrainCircuit,
    BarChart3,
    CheckCircle2
} from "lucide-react";

const steps = [

    {
        icon:FileText,
        title:"Input",
        desc:"User submits text or uploads a document."
    },

    {
        icon:Sparkles,
        title:"Preprocessing",
        desc:"Cleaning, normalization and tokenization."
    },

    {
        icon:Database,
        title:"Encoding",
        desc:"Text converted into transformer embeddings."
    },

    {
        icon:BrainCircuit,
        title:"DistilBERT",
        desc:"Fine-tuned model predicts authorship."
    },

    {
        icon:BarChart3,
        title:"Confidence",
        desc:"Probability scores are calculated."
    },

    {
        icon:CheckCircle2,
        title:"Result",
        desc:"Prediction displayed to the user."
    }

];

export default function Workflow(){

    return(

        <section className="py-28 px-6">

            <div className="max-w-7xl mx-auto">

                <div className="text-center">

                    <p className="uppercase tracking-[0.3em] text-cyan-400">

                        HOW IT WORKS

                    </p>

                    <h2 className="text-5xl font-bold mt-5">

                        Detection Pipeline

                    </h2>

                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

                    {

                        steps.map((step,index)=>{

                            const Icon=step.icon;

                            return(

                                <motion.div

                                    key={step.title}

                                    initial={{opacity:0,y:40}}

                                    whileInView={{opacity:1,y:0}}

                                    viewport={{once:true}}

                                    transition={{
                                        delay:index*.12
                                    }}

                                    whileHover={{
                                        y:-8
                                    }}

                                    className="glass rounded-3xl p-8"

                                >

                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">

                                        <Icon color="white"/>

                                    </div>

                                    <h3 className="text-2xl font-semibold mt-8">

                                        {step.title}

                                    </h3>

                                    <p className="text-slate-400 mt-4 leading-8">

                                        {step.desc}

                                    </p>

                                </motion.div>

                            )

                        })

                    }

                </div>

            </div>

        </section>

    )

}