"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BrainCircuit } from "lucide-react";

import GlowButton from "@/components/common/GlowButton";
import Typewriter from "./Typewriter";
import { APP } from "@/lib/constants";
import { fadeUp, stagger } from "@/lib/animations";

export default function HeroSection() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="
      relative
      z-20
      flex
      min-h-[92vh]
      flex-col
      items-center
      justify-center
      overflow-hidden
      px-6
      pt-32
      text-center
      "
    >
      {/* Glow */}

      <div className="absolute left-1/2 top-32 h-[300px]
w-[300px]
md:h-[450px]
md:w-[450px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      {/* Badge */}

      <motion.div
        variants={fadeUp}
        className="
        mb-8
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-white/5
        px-4 py-2 text-xs sm:px-5 sm:text-sm
        backdrop-blur-2xl
        "
      >
        <Sparkles className="h-4 w-4 text-cyan-400" />

        <span className="text-sm text-slate-300">

          AI Native Architecture Generator

        </span>

      </motion.div>

      {/* Heading */}

      <motion.h1
        variants={fadeUp}
        className="
        max-w-6xl
        text-5xl
        md:text-7xl
        xl:text-8xl
        "
      >
        Design

        <br />

        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

          Production Ready

        </span>

        <br />

        Applications

      </motion.h1>

      {/* Description */}

      <motion.p
        variants={fadeUp}
        className="
        mt-8
        max-w-3xl
        text-lg
        leading-8
        text-slate-400
        md:text-xl
        "
      >
        {APP.description}
      </motion.p>

      {/* Typewriter */}

      <motion.div
        variants={fadeUp}
        className="mt-6 h-8"
      >
        <Typewriter />
      </motion.div>

      {/* CTA */}

      <motion.div
        variants={fadeUp}
        className="
          mt-12
          flex
          w-full
          max-w-xl
          flex-col
          items-center
          gap-4
          sm:flex-row
          sm:justify-center
  "
      >
        <div className="w-full sm:w-auto">
          <GlowButton>
            <div className="flex items-center gap-2">
              Generate Architecture
              <ArrowRight className="h-4 w-4" />
            </div>
          </GlowButton>
        </div>

        <button
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-7
            py-4
            font-medium
            text-slate-300
            backdrop-blur-xl    
            transition
            hover:bg-white/10
            sm:w-auto
            "
        >
          View Demo
        </button>

      </motion.div>

      {/* Provider Pills */}

      <motion.div
        variants={fadeUp}
        className="
        mt-16
        flex
        flex-wrap
        items-center
        justify-center
        gap-4
        "
      >
        {APP.providers.map((provider) => (
          <motion.div
            key={provider}
            whileHover={{
              y: -4,
              scale: 1.05,
            }}
            className="
            rounded-full
            border
            border-white/10
            bg-white/5
            px-5
            py-2
            text-sm
            font-medium
            text-slate-300
            backdrop-blur-xl
            "
          >
            {provider}
          </motion.div>
        ))}
      </motion.div>
      {/* Live Metrics */}

      <motion.div
        variants={fadeUp}
        className="
        mt-20
        grid
        w-full
        max-w-6xl
        grid-cols-1
        gap-6
        md:grid-cols-3
        "
      >
        <motion.div
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-2xl
          "
        >
          <BrainCircuit className="mb-4 h-10 w-10 text-violet-400" />

          <h3 className="text-3xl font-bold">

            3

          </h3>

          <p className="mt-2 text-slate-400">

            AI Providers

          </p>
        </motion.div>

        <motion.div
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-2xl
          "
        >
          <Sparkles className="mb-4 h-10 w-10 text-cyan-400" />

          <h3 className="text-3xl font-bold">

            6

          </h3>

          <p className="mt-2 text-slate-400">

            Pipeline Stages

          </p>
        </motion.div>

        <motion.div
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-2xl
          "
        >
          <ArrowRight className="mb-4 h-10 w-10 text-green-400" />

          <h3 className="text-3xl font-bold">

            100%

          </h3>

          <p className="mt-2 text-slate-400">

            Cross Validation

          </p>
        </motion.div>
      </motion.div>

      {/* Floating AI Cards */}

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
        absolute
        left-20
        top-56
        hidden
        rounded-2xl
        border
        border-violet-500/20
        bg-violet-500/10
        px-6
        py-4
        backdrop-blur-xl
        xl:block
        "
      >
        <p className="text-sm text-violet-300">

          Intent Extraction

        </p>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
        absolute
        right-20
        top-72
        hidden
        rounded-2xl
        border
        border-cyan-500/20
        bg-cyan-500/10
        px-6
        py-4
        backdrop-blur-xl
        xl:block
        "
      >
        <p className="text-sm text-cyan-300">

          Schema Generation

        </p>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="
        absolute
        bottom-44
        left-32
        hidden
        rounded-2xl
        border
        border-emerald-500/20
        bg-emerald-500/10
        px-6
        py-4
        backdrop-blur-xl
        xl:block
        "
      >
        <p className="text-sm text-emerald-300">

          Validation Engine

        </p>
      </motion.div>

      {/* <ScrollIndicator /> */}

    </motion.section>
  );
}