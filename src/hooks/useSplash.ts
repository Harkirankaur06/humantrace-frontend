"use client";

import { useCallback, useState } from "react";

export default function useSplash() {
  const [showSplash, setShowSplash] = useState(true);

  const finish = useCallback(() => {
    console.log("Splash finished");
    setShowSplash(false);
  }, []);

  return {
    showSplash,
    finish,
  };
}