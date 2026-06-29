"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { PipelineEvent } from "@/types/events";

interface GenerationContextType {
  jobId: string;
  setJobId: (id: string) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  events: PipelineEvent[];
  setEvents: React.Dispatch<
    React.SetStateAction<PipelineEvent[]>
  >;

  reset: () => void;
}

const GenerationContext =
  createContext<GenerationContextType | null>(null);

export function GenerationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [jobId, setJobId] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [events, setEvents] =
    useState<PipelineEvent[]>([]);

  function reset() {
    setJobId("");

    setLoading(false);

    setEvents([]);
  }

  return (
    <GenerationContext.Provider
      value={{
        jobId,
        setJobId,
        loading,
        setLoading,
        events,
        setEvents,
        reset,
      }}
    >
      {children}
    </GenerationContext.Provider>
  );
}

export function useGeneration() {
  const context =
    useContext(GenerationContext);

  if (!context) {
    throw new Error(
      "GenerationProvider missing"
    );
  }

  return context;
}