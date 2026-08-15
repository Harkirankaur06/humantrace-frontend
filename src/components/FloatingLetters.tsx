"use client";

import { motion } from "framer-motion";

const letters = [
  ["h", 8, 18, 0],
  ["u", 18, 72, 1.2],
  ["m", 31, 28, 2.4],
  ["a", 43, 82, 0.8],
  ["n", 56, 16, 1.8],
  ["t", 67, 68, 3],
  ["r", 78, 32, 1],
  ["a", 88, 78, 2],
  ["c", 94, 18, 0.5],
  ["e", 12, 45, 2.8],
  ["x", 25, 12, 1.5],
  ["q", 38, 58, 3.2],
  ["z", 52, 42, 0.3],
  ["k", 72, 88, 2.2],
  ["p", 84, 55, 1.7],
  ["s", 4, 88, 3.5],
] as const;

export default function FloatingLetters() {
  return (
    <div
      className="fixed inset-0 z-[1] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {letters.map(([char, left, top, delay], index) => (
        <motion.span
          key={`${char}-${index}`}
          className="absolute font-mono text-2xl md:text-3xl font-bold text-cyan-300/30 select-none"
          style={{
            left: `${left}%`,
            top: `${top}%`,
          }}
          animate={{
            y: [0, -25, 0, 20, 0],
            x: [0, 12, -10, 8, 0],
            opacity: [0.25, 0.55, 0.3, 0.5, 0.25],
            rotate: [0, 8, -8, 5, 0],
          }}
          transition={{
            duration: 8 + (index % 4) * 2,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}