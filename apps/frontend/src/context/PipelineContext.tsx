"use client";

import { createContext, useContext, useState } from "react";

export type StageStatus =
  | "pending"
  | "running"
  | "completed";

export interface PipelineStages {
  intent: StageStatus;
  schema: StageStatus;
  appspec: StageStatus;
  validation: StageStatus;
  repair: StageStatus;
  output: StageStatus;
}

interface PipelineContextType {
  stages: PipelineStages;

  setRunning: (
    stage: keyof PipelineStages
  ) => void;

  setCompleted: (
    stage: keyof PipelineStages
  ) => void;

  reset: () => void;
}

const initialState: PipelineStages = {
  intent: "pending",
  schema: "pending",
  appspec: "pending",
  validation: "pending",
  repair: "pending",
  output: "pending",
};

const PipelineContext =
  createContext<PipelineContextType | null>(
    null
  );

export function PipelineProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [stages, setStages] =
    useState(initialState);

  function setRunning(
    stage: keyof PipelineStages
  ) {

    setStages(prev => ({

      ...prev,

      [stage]: "running",

    }));

  }

  function setCompleted(
    stage: keyof PipelineStages
  ) {

    setStages(prev => ({

      ...prev,

      [stage]: "completed",

    }));

  }

  function reset() {

    setStages(initialState);

  }

  return (

    <PipelineContext.Provider
      value={{

        stages,

        setRunning,

        setCompleted,

        reset,

      }}
    >

      {children}

    </PipelineContext.Provider>

  );

}

export function usePipeline() {

  const ctx =
    useContext(PipelineContext);

  if (!ctx) {

    throw new Error(
      "PipelineContext missing"
    );

  }

  return ctx;

}