"use client";

import { Terminal } from "lucide-react";

import { PipelineEvent } from "@/types/events";

interface Props {
  events: PipelineEvent[];
}

export default function LiveTerminal({
  events,
}: Props) {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#0B1220]">

      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">

        <Terminal className="h-5 w-5 text-green-400" />

        <span className="font-semibold">

          Live Pipeline Logs

        </span>

      </div>

      <div className="max-h-80 overflow-y-auto p-5 font-mono text-sm">

        {events.map((event, index) => (

          <div
            key={index}
            className="mb-2 flex gap-3"
          >

            <span className="text-cyan-400">

              ▶

            </span>

            <span className="capitalize text-green-400">

              {event.stage}

            </span>

            <span className="text-slate-300">

              {event.message}

            </span>

          </div>

        ))}

        {events.length === 0 && (

          <p className="text-slate-500">

            Waiting for generation...

          </p>

        )}

      </div>

    </div>
  );
}