"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

export default function GlowButton({
  children,
  onClick,
  loading = false,
}: Props) {
  return (
    <motion.button
      whileHover={!loading ? { scale: 1.04 } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
      disabled={loading}
      onClick={onClick}
      className="
      relative
      flex
      items-center
      justify-center
      gap-2
      overflow-hidden
      rounded-2xl
      px-7
      py-4
      font-semibold
      text-white
      bg-gradient-to-r
      from-violet-600
      to-cyan-500
      shadow-[0_0_50px_rgba(124,58,237,.45)]
      transition-all
      duration-300
      disabled:cursor-not-allowed
      disabled:opacity-70
      "
    >
      {loading && (
        <Loader2 className="h-5 w-5 animate-spin" />
      )}

      <span>
        {loading ? "Generating..." : children}
      </span>

      <div className="absolute inset-0 bg-white/10 opacity-0 transition hover:opacity-100" />
    </motion.button>
  );
}