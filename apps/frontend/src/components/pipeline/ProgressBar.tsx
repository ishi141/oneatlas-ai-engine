"use client";

import {
  CheckCircle2,
  Circle,
  Loader2,
} from "lucide-react";

import { usePipeline } from "@/context/PipelineContext";

const pipeline = [
  {
    key: "intent",
    title: "Intent Extraction",
    description: "Understanding the application requirements",
  },
  {
    key: "schema",
    title: "Schema Generation",
    description: "Designing database models",
  },
  {
    key: "appspec",
    title: "Application Specification",
    description: "Building architecture specification",
  },
  {
    key: "validation",
    title: "Validation",
    description: "Checking consistency and correctness",
  },
  {
    key: "repair",
    title: "Repair",
    description: "Fixing validation issues if required",
  },
  {
    key: "output",
    title: "Final Output",
    description: "Preparing final response",
  },
] as const;

export default function ProgressBar() {
  const { stages } = usePipeline();

  const completed = Object.values(stages).filter(
    (s) => s === "completed"
  ).length;

  const running = Object.values(stages).filter(
    (s) => s === "running"
  ).length;

  const progress =
    ((completed + running * 0.5) / pipeline.length) *
    100;

  return (
    <div className="space-y-8">

      {/* Progress */}

      <div>

        <div className="mb-4 flex items-center justify-between">

          <p className="text-sm font-medium text-zinc-400">

            Overall Progress

          </p>

          <span className="rounded-full border border-red-800/40 bg-red-950/30 px-3 py-1 text-sm font-semibold text-red-300">

            {Math.round(progress)}%

          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#1b1b1b]">

          <div
            className="h-full rounded-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-5">

        {pipeline.map((stage) => {

          const status = stages[stage.key];

          const isCompleted = status === "completed";
          const isRunning = status === "running";

          return (

            <div
              key={stage.key}
              className={`
                rounded-2xl
                border
                p-5
                transition-all
                duration-300

                ${
                  isCompleted
                    ? "border-emerald-900/60 bg-emerald-950/10"
                    : isRunning
                    ? "border-red-900/60 bg-red-950/10"
                    : "border-white/5 bg-[#171717] hover:bg-[#1b1b1b]"
                }
              `}
            >

              <div className="flex items-start gap-4">

                {/* Icon */}

                <div
                  className={`
                    mt-1
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl

                    ${
                      isCompleted
                        ? "bg-emerald-900/20"
                        : isRunning
                        ? "bg-red-900/20"
                        : "bg-[#202020]"
                    }
                  `}
                >

                  {isCompleted && (

                    <CheckCircle2
                      size={22}
                      className="text-emerald-500"
                    />

                  )}

                  {isRunning && (

                    <Loader2
                      size={22}
                      className="animate-spin text-red-500"
                    />

                  )}

                  {status === "pending" && (

                    <Circle
                      size={20}
                      className="text-zinc-600"
                    />

                  )}

                </div>

                {/* Content */}

                <div className="flex-1">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <h3 className="text-base font-semibold text-white">

                      {stage.title}

                    </h3>

                    <span
                      className={`
                        inline-flex
                        w-fit
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        capitalize

                        ${
                          isCompleted
                            ? "bg-emerald-900/20 text-emerald-400"
                            : isRunning
                            ? "bg-red-900/20 text-red-400"
                            : "bg-[#232323] text-zinc-500"
                        }
                      `}
                    >

                      {status}

                    </span>

                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">

                    {stage.description}

                  </p>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}