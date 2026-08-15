import type { Metadata } from "next";
import "./globals.css";

import FloatingLetters from "@/components/FloatingLetters";
import SplashProvider from "@/components/SplashProvider";

export const metadata: Metadata = {
  title: "HumanTrace",
  description: "AI Text Detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050816]">

        <FloatingLetters />

        <SplashProvider>
          <div className="relative z-10">
            {children}
          </div>
        </SplashProvider>

      </body>
    </html>
  );
}