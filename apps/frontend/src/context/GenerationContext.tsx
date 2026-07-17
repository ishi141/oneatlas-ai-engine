"use client";

import type { PipelineEvent } from "@/types/events";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface GenerationContextType {
  prompt: string;
  setPrompt: (value: string) => void;

  provider: string;
  setProvider: (value: string) => void;

  jobId: string;
  setJobId: (value: string) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  error: string | null;
  setError: (value: string | null) => void;

  events: PipelineEvent[];
  setEvents: Dispatch<SetStateAction<PipelineEvent[]>>;

  reset: () => void;
}

const GenerationContext =
  createContext<GenerationContextType | null>(null);

export function GenerationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [prompt, setPrompt] = useState("");

  const [provider, setProvider] =
    useState("openai");

  const [jobId, setJobId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [events, setEvents] =
    useState<PipelineEvent[]>([]);

  function reset() {
    setPrompt("");
    setJobId("");
    setLoading(false);
    setError(null);
    setEvents([]);
  }

  const value = useMemo(
    () => ({
      prompt,
      setPrompt,

      provider,
      setProvider,

      jobId,
      setJobId,

      loading,
      setLoading,

      error,
      setError,

      events,
      setEvents,

      reset,
    }),
    [
      prompt,
      provider,
      jobId,
      loading,
      error,
      events,
    ]
  );

  return (
    <GenerationContext.Provider value={value}>
      {children}
    </GenerationContext.Provider>
  );
}

export function useGeneration() {
  const context =
    useContext(GenerationContext);

  if (!context) {
    throw new Error(
      "useGeneration must be used inside GenerationProvider"
    );
  }

  return context;
}