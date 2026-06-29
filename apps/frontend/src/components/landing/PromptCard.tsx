"use client";

import { useRef, useState } from "react";

import { Textarea } from "@/components/ui/textarea";

import GlassCard from "@/components/common/GlassCard";
import GlowButton from "@/components/common/GlowButton";

import { generateApplication } from "@/services/api";
import { connectEvents } from "@/services/events";

import { usePipeline } from "@/context/PipelineContext";
import { useGeneration } from "@/context/GenerationContext";

import { PipelineEvent } from "@/types/events";

export default function PromptCard() {

  const [prompt, setPrompt] = useState("");

  const eventSourceRef = useRef<EventSource | null>(null);

  const { reset, setStage } = usePipeline();

  const {

    setJobId,

    loading,

    setLoading,

    setEvents,

    reset: resetGeneration,

  } = useGeneration();

  async function handleGenerate() {

    if (!prompt.trim() || loading) return;

    reset();

    resetGeneration();

    setLoading(true);

    document
      .getElementById("pipeline")
      ?.scrollIntoView({
        behavior: "smooth",
      });

    if (eventSourceRef.current) {

      eventSourceRef.current.close();

    }

    try {

      const result =
        await generateApplication(prompt);

      setJobId(result.jobId);

      eventSourceRef.current =
        connectEvents(

          result.jobId,

          (event: PipelineEvent) => {

            setEvents(prev => [
              ...prev,
              event,
            ]);

            switch (
              event.stage.toLowerCase()
            ) {

              case "intent":

                setStage("intent");

                break;

              case "schema":

                setStage("schema");

                break;

              case "appspec":

                setStage("appspec");

                break;

              case "validation":

                setStage("validation");

                break;

              case "repair":

                setStage("repair");

                break;

              case "pipeline":

                setStage("output");

                break;

            }

            if (
              event.type ===
              "generation_complete"
            ) {

              setLoading(false);

              eventSourceRef.current?.close();

            }

          }

        );

    }

    catch (err) {

      console.error(err);

      setLoading(false);

    }

  }

  return (

    <GlassCard className="w-full max-w-5xl p-8">

      <h2 className="mb-6 text-3xl font-bold">

        Describe your application

      </h2>

      <Textarea

        value={prompt}

        onChange={(e)=>
          setPrompt(e.target.value)
        }

        placeholder="Example: Build a CRM with Slack, Gmail and AI Lead Scoring..."

        className="min-h-[180px] border-white/10 bg-white/5 text-white"

      />

      <div className="mt-8 flex justify-end">

        <GlowButton

          loading={loading}

          onClick={handleGenerate}

        >

          Generate Application

        </GlowButton>

      </div>

    </GlassCard>

  );

}