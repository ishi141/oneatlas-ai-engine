"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
      }}
      className={cn(
        `
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-[0_20px_80px_rgba(0,0,0,.35)]
        `,
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />

      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}