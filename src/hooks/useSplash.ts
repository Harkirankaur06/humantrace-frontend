"use client";

import { useEffect, useState } from "react";

export default function useSplash() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return {
    showSplash,
    finish: () => setShowSplash(false),
  };
}