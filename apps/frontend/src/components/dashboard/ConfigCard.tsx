"use client";

import {
  CheckCircle2,
  Circle,
  Loader2,
  Server,
  Cpu,
  Clock3,
} from "lucide-react";

import { usePipeline } from "@/context/PipelineContext";

const stageList = [
  { key: "intent", label: "Intent Extraction" },
  { key: "schema", label: "Schema Generation" },
  { key: "appspec", label: "Application Spec" },
  { key: "validation", label: "Validation" },
  { key: "repair", label: "Repair" },
  { key: "output", label: "Output" },
] as const;

export default function ConfigCard() {
  const { stages } = usePipeline();

  const completed = Object.values(stages).filter(
    (s) => s === "completed"
  ).length;

  const running = Object.values(stages).filter(
    (s) => s === "running"
  ).length;

  const progress =
    ((completed + running * 0.5) / stageList.length) * 100;

  return (
    <aside
      className="
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-white/5
        bg-[#111111]
        shadow-xl
      "
    >
      {/* Header */}

      <div className="border-b border-white/5 p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-700 to-red-900">

            <Cpu
              size={18}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-xl font-semibold text-white">

              Pipeline Status

            </h2>

            <p className="mt-1 text-sm text-zinc-500">

              Live execution progress

            </p>

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="border-b border-white/5 p-6">

        <div className="mb-3 flex items-center justify-between">

          <span className="text-sm font-medium text-zinc-400">

            Progress

          </span>

          <span className="text-sm font-semibold text-white">

            {Math.round(progress)}%

          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#1a1a1a]">

          <div
            className="h-full rounded-full bg-gradient-to-r from-red-700 to-red-800 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Stages */}

      <div className="flex-1 p-6">

        <div className="space-y-4">

          {stageList.map((stage) => {
            const status = stages[stage.key];

            return (
              <div
                key={stage.key}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">

                  {status === "completed" && (
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500"
                    />
                  )}

                  {status === "running" && (
                    <Loader2
                      size={18}
                      className="animate-spin text-red-500"
                    />
                  )}

                  {status === "pending" && (
                    <Circle
                      size={18}
                      className="text-zinc-600"
                    />
                  )}

                  <span className="text-sm font-medium text-zinc-300">

                    {stage.label}

                  </span>

                </div>

                <span
                  className={`text-xs font-medium capitalize ${
                    status === "completed"
                      ? "text-emerald-400"
                      : status === "running"
                      ? "text-red-400"
                      : "text-zinc-500"
                  }`}
                >
                  {status}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-white/5 p-6">

        <div className="space-y-5">

          <div className="flex items-center gap-3">

            <Server
              size={18}
              className="text-zinc-500"
            />

            <div>

              <p className="text-xs uppercase tracking-wider text-zinc-600">

                Provider

              </p>

              <p className="font-medium text-white">

                Multi Provider

              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Clock3
              size={18}
              className="text-zinc-500"
            />

            <div>

              <p className="text-xs uppercase tracking-wider text-zinc-600">

                Expected Time

              </p>

              <p className="font-medium text-white">

                5–10 Seconds

              </p>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}