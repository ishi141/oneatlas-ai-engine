"use client";

import { useMemo } from "react";
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  Clock3,
} from "lucide-react";

import { PipelineEvent } from "@/types/events";

interface Props {
  events: PipelineEvent[];
}

interface StageState {
  stage: string;
  message: string;
  timestamp: string;
  type: string;
}

const STAGE_ORDER = [
  "intent",
  "schema",
  "appspec",
  "validation",
  "repair",
  "pipeline",
];

function getIcon(type: string) {
  switch (type) {
    case "stage_complete":
    case "generation_complete":
      return (
        <CheckCircle2
          size={18}
          className="text-emerald-500"
        />
      );

    case "stage_start":
      return (
        <Loader2
          size={18}
          className="animate-spin text-red-500"
        />
      );

    case "error":
      return (
        <AlertCircle
          size={18}
          className="text-red-500"
        />
      );

    default:
      return (
        <Clock3
          size={18}
          className="text-zinc-500"
        />
      );
  }
}

function getBadge(type: string) {
  switch (type) {
    case "stage_complete":
      return "Completed";

    case "stage_start":
      return "Running";

    case "generation_complete":
      return "Finished";

    case "error":
      return "Error";

    default:
      return "Info";
  }
}

function getBadgeStyle(type: string) {
  switch (type) {
    case "stage_complete":
      return "bg-emerald-900/20 text-emerald-400";

    case "stage_start":
      return "bg-red-900/20 text-red-400";

    case "generation_complete":
      return "bg-red-950/40 text-red-300";

    case "error":
      return "bg-red-950/50 text-red-400";

    default:
      return "bg-[#242424] text-zinc-400";
  }
}

function formatStage(stage: string) {
  switch (stage.toLowerCase()) {
    case "intent":
      return "Intent";

    case "schema":
      return "Schema";

    case "appspec":
      return "Application Spec";

    case "validation":
      return "Validation";

    case "repair":
      return "Repair";

    case "pipeline":
      return "Pipeline";

    default:
      return (
        stage.charAt(0).toUpperCase() +
        stage.slice(1)
      );
  }
}

export default function LiveTerminal({
  events,
}: Props) {
  const latestEvents = useMemo(() => {
    const map = new Map<string, StageState>();

    for (const event of events) {
      map.set(event.stage.toLowerCase(), {
        stage: event.stage,
        message: event.message,
        timestamp: event.timestamp,
        type: event.type,
      });
    }

    return STAGE_ORDER
      .filter((stage) => map.has(stage))
      .map((stage) => map.get(stage)!);
  }, [events]);

  return (
    <div
      className="
        h-[520px]
        overflow-y-auto
        rounded-xl
        border
        border-white/5
        bg-[#0f0f0f]
      "
    >
      {latestEvents.length === 0 ? (
        <div className="flex h-full items-center justify-center">

          <div className="text-center">

            <Clock3
              size={42}
              className="mx-auto text-zinc-600"
            />

            <h3 className="mt-5 text-lg font-semibold text-white">

              Waiting for activity

            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">

              Pipeline events will appear here once generation starts.

            </p>

          </div>

        </div>
      ) : (
        <div className="divide-y divide-white/5">

          {latestEvents.map((event) => (

            <div
              key={event.stage}
              className="
                px-5
                py-5
                transition-colors
                hover:bg-white/[0.02]
              "
            >

              <div className="flex gap-4">

                <div
                  className="
                    mt-1
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#191919]
                  "
                >

                  {getIcon(event.type)}

                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <h4 className="font-semibold text-white">

                        {formatStage(event.stage)}

                      </h4>

                      <p className="mt-2 break-words text-sm leading-6 text-zinc-500">

                        {event.message}

                      </p>

                    </div>

                    <span
                      className={`
                        inline-flex
                        w-fit
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${getBadgeStyle(event.type)}
                      `}
                    >
                      {getBadge(event.type)}
                    </span>

                  </div>

                  <p className="mt-4 text-xs text-zinc-600">

                    {new Date(
                      event.timestamp
                    ).toLocaleTimeString()}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}