"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const full = "HumanTrace";
const finalWord = "Human";

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [text, setText] = useState("");
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      setText(full.slice(0, index + 1));
      index++;

      if (index === full.length) {
        clearInterval(typing);

        setTimeout(() => {
          deleteLetters();
        }, 800);
      }
    }, 120);

    function deleteLetters() {
      let current = full;

      const deleting = setInterval(() => {
        current = current.slice(0, -1);
        setText(current);

        if (current === finalWord) {
          clearInterval(deleting);

          // Wait until "Human" is fully visible
          // before showing the tagline.
          setTimeout(() => {
            setShowTagline(true);

            setTimeout(() => {
              onFinish();
            }, 1000);
          }, 500);
        }
      }, 120);
    }

    return () => clearInterval(typing);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816]"
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute heroBlob blob1 top-0 left-0" />

      <div className="absolute heroBlob blob2 bottom-0 right-0" />

      <motion.div
        animate={{
          scale: text === finalWord ? 1.08 : 1,
        }}
        className="text-center"
      >
        <h1 className="text-7xl md:text-8xl font-bold gradientText">
          {text}
          <span className="animate-pulse">|</span>
        </h1>

        {showTagline && (
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="text-center mt-8 text-slate-400 text-lg"
          >
            Finding the human behind every word.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}