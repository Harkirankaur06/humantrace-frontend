"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const full = "HumanTrace";
const finalWord = "Human";

const burstLetters = [
  { char: "H", x: -450, y: -280, rotate: -40 },
  { char: "u", x: -330, y: 240, rotate: 35 },
  { char: "m", x: -210, y: -360, rotate: -25 },
  { char: "a", x: 0, y: -420, rotate: 45 },
  { char: "n", x: 250, y: -320, rotate: -35 },
  { char: "T", x: 440, y: -100, rotate: 50 },
  { char: "r", x: 380, y: 250, rotate: -45 },
  { char: "a", x: 190, y: 380, rotate: 30 },
  { char: "c", x: -40, y: 420, rotate: -40 },
  { char: "e", x: -380, y: 320, rotate: 55 },
];

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [text, setText] = useState("");
  const [showTagline, setShowTagline] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      setText(full.slice(0, index + 1));
      index++;

      if (index >= full.length) {
        clearInterval(typing);

        setTimeout(deleteLetters, 800);
      }
    }, 120);

    function deleteLetters() {
      let current = full;

      const deleting = setInterval(() => {
        current = current.slice(0, -1);
        setText(current);

        if (current === finalWord) {
          clearInterval(deleting);

          // Human stays visible.
          setTimeout(() => {
            setShowTagline(true);

            // Let the tagline be visible.
            setTimeout(() => {
              setBurst(true);

              // Give the burst time to finish.
              setTimeout(() => {
                onFinish();
              }, 1000);
            }, 1800);
          }, 400);
        }
      }, 120);
    }

    return () => {
      clearInterval(typing);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050816] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{
        opacity: burst ? 0 : 1,
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
    >
      {/* Background blobs */}

      <div className="absolute heroBlob blob1 top-0 left-0" />
      <div className="absolute heroBlob blob2 bottom-0 right-0" />

      {/* Main content */}

      <motion.div
        className="relative z-20 text-center"
        animate={{
          scale: burst ? 1.25 : text === finalWord ? 1.08 : 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <h1 className="text-7xl md:text-8xl font-bold gradientText">
          {text}

          {!burst && (
            <span className="animate-pulse">|</span>
          )}
        </h1>

        {showTagline && !burst && (
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
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

      {/* BURST */}

      {burst && (
        <>
          {burstLetters.map((letter, index) => (
            <motion.span
              key={`${letter.char}-${index}`}
              className="absolute z-30 text-5xl md:text-7xl font-bold gradientText pointer-events-none"
              initial={{
                x: 0,
                y: 0,
                scale: 0.5,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: letter.x,
                y: letter.y,
                scale: 1.2,
                opacity: 0,
                rotate: letter.rotate,
              }}
              transition={{
                duration: 0.9,
                delay: index * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {letter.char}
            </motion.span>
          ))}

          {/* Central flash */}

          <motion.div
            className="absolute z-10 w-32 h-32 rounded-full bg-cyan-400/40 blur-3xl pointer-events-none"
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1, 3],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />

          {/* Expanding ring */}

          <motion.div
            className="absolute z-10 w-20 h-20 rounded-full border-2 border-cyan-300/60 pointer-events-none"
            initial={{
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: 8,
              opacity: 0,
            }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
          />
        </>
      )}
    </motion.div>
  );
}
