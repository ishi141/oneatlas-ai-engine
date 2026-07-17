"use client";

import { useRef } from "react";
import { Sparkles, Wand2 } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

import { generateApplication } from "@/services/api";
import { connectEvents } from "@/services/events";

import { usePipeline } from "@/context/PipelineContext";
import { useGeneration } from "@/context/GenerationContext";

import type { PipelineEvent } from "@/types/events";

const templates = [
  "CRM Platform",
  "Hospital Management",
  "Task Management",
  "E-Commerce",
  "Learning Management",
  "Banking Dashboard",
];

export default function PromptSection() {
  const eventSourceRef = useRef<EventSource | null>(null);

  const {
    reset,
    setRunning,
    setCompleted,
  } = usePipeline();

  const {
    prompt,
    setPrompt,

    provider,

    loading,
    setLoading,

    setJobId,

    setEvents,

    reset: resetGeneration,
  } = useGeneration();

  async function handleGenerate() {
    if (!prompt.trim() || loading) return;

    reset();
    resetGeneration();

    setLoading(true);

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      interface GenerateResponse {
        jobId: string;
      }

      const result = (await generateApplication({
        prompt,
        provider,
      })) as GenerateResponse;

      setJobId(result.jobId);

      eventSourceRef.current = connectEvents(
        result.jobId,
        (event: PipelineEvent) => {
          setEvents((prev) => [...prev, event]);

          const stage =
            event.stage.toLowerCase() as
            | "intent"
            | "schema"
            | "appspec"
            | "validation"
            | "repair"
            | "output";

          if (event.type === "stage_start") {
            if (stage !== "output") {
              setRunning(stage);
            }
          }

          if (event.type === "stage_complete") {
            if (stage !== "output") {
              setCompleted(stage);
            }
          }

          if (event.stage.toLowerCase() === "pipeline") {
            setCompleted("output");
          }

          if (event.type === "generation_complete") {
            setLoading(false);
            eventSourceRef.current?.close();
          }
        }
      );
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/5 bg-[#111111] shadow-xl">

      {/* Header */}

      <div className="border-b border-white/5 p-7 sm:p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-700 to-red-900">

            <Sparkles
              size={18}
              className="text-white"
            />

          </div>

          <div>

            <h2 className="text-2xl font-semibold tracking-tight text-white">

              Describe your application

            </h2>

            <p className="mt-1 text-sm text-zinc-500">

              Tell OneAtlas what you want to build.

            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-7 p-7 sm:p-8">

        <div>

          <p className="mb-3 text-sm font-medium text-zinc-400">

            Quick Templates

          </p>

          <div className="flex flex-wrap gap-2">

            {templates.map((template) => (
              <button
                key={template}
                onClick={() => setPrompt(template)}
                className="
                  rounded-full
                  border
                  border-white/6
                  bg-[#171717]
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-zinc-300
                  transition-all
                  duration-200
                  hover:border-red-900/40
                  hover:bg-[#1d1d1d]
                  hover:text-white
                "
              >
                {template}
              </button>
            ))}

          </div>

        </div>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the application you want to generate..."
          className="
            min-h-[220px]
            resize-none
            rounded-xl
            border-white/5
            bg-[#141414]
            text-base
            text-zinc-100
            placeholder:text-zinc-600
            focus:border-red-800
            focus:ring-red-900
          "
        />

      </div>

      {/* Footer */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-t
          border-white/5
          p-7
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-8
        "
      >

        <div>

          <p className="text-sm font-semibold text-white">

            Output Includes

          </p>

          <p className="mt-1 text-sm text-zinc-500">

            Intent · Schema · App Spec · Validation · Cost · Integrations

          </p>

        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-red-700
            to-red-800
            px-6
            py-3
            font-medium
            text-white
            shadow-lg
            transition-all
            duration-200
            hover:from-red-600
            hover:to-red-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          <Wand2 size={18} />

          {loading
            ? "Generating..."
            : "Generate Architecture"}

        </button>

      </div>

    </section>
  );
}