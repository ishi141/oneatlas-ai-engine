import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PipelineProvider } from "@/context/PipelineContext";
import { GenerationProvider } from "@/context/GenerationContext";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "OneAtlas AI Engine",
  description:
    "Generate production-ready application architecture using multiple AI models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          bg-[#030712]
          text-white
          antialiased
          selection:bg-violet-600
          selection:text-white
        `}
      >
        <PipelineProvider>
    <GenerationProvider>
        {children}
    </GenerationProvider>
</PipelineProvider>
      </body>
    </html>
  );
}
