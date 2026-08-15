"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Clock3,
  ShieldCheck,
  User,
  Bot,
} from "lucide-react";

interface PredictionResult {
  prediction: "human" | "ai";
  confidence: number;
  ai_probability: number;
  human_probability: number;
}

interface ResultCardProps {
  result: PredictionResult;
  processingTime?: number;
}

export default function ResultCard({
  result,
  processingTime = 0,
}: ResultCardProps) {

  const prediction =
    result.prediction === "human"
      ? "Human"
      : "AI";

  const confidence =
    result.confidence * 100;

  const human =
    result.human_probability * 100;

  const ai =
    result.ai_probability * 100;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="glass rounded-[32px] p-10 mt-10"
    >

      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Analysis Result
        </h2>

        <ShieldCheck className="text-green-400" />

      </div>


      {/* Prediction */}

      <div className="mt-10">

        <div
          className={`
            inline-flex items-center gap-3
            px-6 py-3
            rounded-full
            text-lg font-semibold
            ${
              prediction === "Human"
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }
          `}
        >

          {prediction === "Human" ? (
            <User size={22} />
          ) : (
            <Bot size={22} />
          )}

          {prediction} Written

        </div>

      </div>


      {/* Confidence */}

      <div className="mt-10">

        <div className="flex justify-between mb-3">

          <span>
            Confidence
          </span>

          <span>
            {confidence.toFixed(1)}%
          </span>

        </div>

        <div className="h-4 rounded-full bg-slate-800 overflow-hidden">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${confidence}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          />

        </div>

      </div>


      {/* Human vs AI */}

      <div className="grid md:grid-cols-2 gap-6 mt-10">


        {/* Human */}

        <div className="glass rounded-2xl p-6">

          <div className="flex justify-between">

            <span>
              Human Probability
            </span>

            <span>
              {human.toFixed(1)}%
            </span>

          </div>

          <div className="mt-3 h-3 bg-slate-700 rounded-full overflow-hidden">

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${human}%`,
              }}
              transition={{
                duration: 1,
              }}
              className="h-full bg-green-500"
            />

          </div>

        </div>


        {/* AI */}

        <div className="glass rounded-2xl p-6">

          <div className="flex justify-between">

            <span>
              AI Probability
            </span>

            <span>
              {ai.toFixed(1)}%
            </span>

          </div>

          <div className="mt-3 h-3 bg-slate-700 rounded-full overflow-hidden">

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${ai}%`,
              }}
              transition={{
                duration: 1,
              }}
              className="h-full bg-red-500"
            />

          </div>

        </div>

      </div>


      {/* Summary */}

      <div className="glass rounded-2xl p-8 mt-10">

        <h3 className="text-xl font-semibold">
          Analysis Summary
        </h3>

        <p className="text-slate-400 leading-8 mt-5">

          {prediction === "Human"
            ? "The writing exhibits natural sentence variation, contextual flow, and linguistic patterns commonly associated with human-authored content."
            : "The writing demonstrates characteristics frequently observed in AI-generated text, including repetitive phrasing and consistent structural patterns."
          }

        </p>

      </div>


      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6 mt-10">


        {/* Processing */}

        <div className="glass rounded-2xl p-6 flex gap-4 items-center">

          <Clock3 className="text-cyan-400" />

          <div>

            <div className="font-semibold">
              Processing Time
            </div>

            <div className="text-slate-400">

              {processingTime.toFixed(2)} sec

            </div>

          </div>

        </div>


        {/* Model */}

        <div className="glass rounded-2xl p-6 flex gap-4 items-center">

          <Brain className="text-indigo-400" />

          <div>

            <div className="font-semibold">
              Model
            </div>

            <div className="text-slate-400">
              DistilBERT
            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}