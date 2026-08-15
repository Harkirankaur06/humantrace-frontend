"use client";

import SplashScreen from "./SplashScreen";
import useSplash from "@/hooks/useSplash";

export default function SplashProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showSplash, finish } = useSplash();

  return (
    <>
      {showSplash && <SplashScreen onFinish={finish} />}
      {!showSplash && children}
    </>
  );
}