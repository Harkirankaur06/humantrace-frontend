"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {

    return (

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

            <div className="heroBlob blob1 top-16 left-0" />
            <div className="heroBlob blob2 bottom-0 right-0" />

            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

                <motion.div

                    initial={{ opacity:0,y:40 }}
                    animate={{ opacity:1,y:0 }}
                    transition={{ duration:.8 }}

                >

                    <p className="uppercase tracking-[0.35em] text-cyan-300 mb-5">

                        AI TEXT DETECTOR

                    </p>

                    <h1 className="text-6xl lg:text-7xl font-bold leading-tight">

                        Detect

                        <span className="gradientText">

                            {" "}AI Generated{" "}

                        </span>

                        Text

                    </h1>

                    <p className="mt-8 text-slate-300 text-lg leading-8 max-w-xl">

                        HumanTrace is powered by a fine-tuned DistilBERT model
                        trained on diverse human and AI-generated datasets,
                        delivering fast and reliable AI text detection.

                    </p>

                    <div className="mt-12 flex gap-5">

                        <Link
                            href="/detect"
                            className="rounded-xl bg-indigo-600 px-7 py-4 flex items-center gap-2 hover:scale-105 transition"
                        >

                            Try HumanTrace

                            <ArrowRight size={18}/>

                        </Link>

                        <Link
                            href="/about"
                            className="glass rounded-xl px-7 py-4"
                        >

                            Learn More

                        </Link>

                    </div>

                </motion.div>

                <motion.div

                    initial={{ opacity:0,x:80 }}
                    animate={{ opacity:1,x:0 }}

                    transition={{ duration:.8 }}

                    className="glass rounded-3xl p-8"

                >

                    <div className="text-slate-400 text-sm">

                        Latest Prediction

                    </div>

                    <div className="mt-5 text-5xl font-bold gradientText">

                        Human

                    </div>

                    <div className="mt-10">

                        <div className="flex justify-between text-sm mb-2">

                            <span>Confidence</span>

                            <span>98.7%</span>

                        </div>

                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">

                            <motion.div

                                initial={{ width:0 }}

                                animate={{ width:"98%" }}

                                transition={{ duration:1.4 }}

                                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"

                            />

                        </div>

                    </div>

                </motion.div>

            </div>

        </section>

    );

}