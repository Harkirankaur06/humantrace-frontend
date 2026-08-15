import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SplashProvider from "@/components/SplashProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HumanTrace",
  description: "AI Text Detection Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>

          <SplashProvider>

              {children}

          </SplashProvider>

      </body>
    </html>
  );
}