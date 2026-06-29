"use client";

import { motion } from "framer-motion";

import {
  Brain,
  Database,
  LayoutDashboard,
  ShieldCheck,
  Wrench,
  Rocket,
  CheckCircle2,
} from "lucide-react";

import { usePipeline } from "@/context/PipelineContext";

const stages = [
  {
    key: "intent",
    title: "Intent",
    icon: Brain,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    key: "schema",
    title: "Schema",
    icon: Database,
    color: "from-cyan-500 to-sky-500",
  },
  {
    key: "appspec",
    title: "AppSpec",
    icon: LayoutDashboard,
    color: "from-emerald-500 to-green-500",
  },
  {
    key: "validation",
    title: "Validation",
    icon: ShieldCheck,
    color: "from-yellow-500 to-orange-500",
  },
  {
    key: "repair",
    title: "Repair",
    icon: Wrench,
    color: "from-pink-500 to-rose-500",
  },
  {
    key: "output",
    title: "Output",
    icon: Rocket,
    color: "from-indigo-500 to-violet-500",
  },
];

export default function PipelinePreview() {
  const { stages: active } = usePipeline();

  return (
    <section id="pipeline" className="relative z-20 mt-28 w-full">

      <h2 className="mb-14 text-center text-4xl font-bold text-white">
        Live AI Pipeline
      </h2>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6">

        {stages.map((stage, index) => {

          const Icon = stage.icon;

          const completed =
            active[
              stage.key as keyof typeof active
            ];

          return (
            <motion.div
              key={stage.key}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                scale: 1.05,
              }}
              className={`
              relative
              flex
              h-56
              w-56
              flex-col
              items-center
              justify-center
              rounded-3xl
              border
              backdrop-blur-2xl
              transition-all
              duration-500

              ${
                completed
                  ? "border-emerald-400 bg-emerald-500/15 shadow-[0_0_60px_rgba(34,197,94,.35)]"
                  : "border-white/10 bg-white/5"
              }
            `}
            >

              {completed && (
                <CheckCircle2 className="absolute right-5 top-5 h-6 w-6 text-emerald-400" />
              )}

              <div
                className={`
                mb-5
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                ${stage.color}
              `}
              >
                <Icon className="h-10 w-10 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-white">
                {stage.title}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {completed ? "Completed ✓" : "Pending"}
              </p>

            </motion.div>
          );
        })}

      </div>

    </section>
  );
}