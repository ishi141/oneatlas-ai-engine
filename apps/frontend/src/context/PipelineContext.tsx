"use client";

import { createContext, useContext, useState } from "react";

interface StageState {
  intent: boolean;
  schema: boolean;
  appspec: boolean;
  validation: boolean;
  repair: boolean;
  output: boolean;
}

interface PipelineContextType {
  stages: StageState;
  setStage: (stage: keyof StageState) => void;
  reset: () => void;
}

const initialState: StageState = {
  intent: false,
  schema: false,
  appspec: false,
  validation: false,
  repair: false,
  output: false,
};

const PipelineContext = createContext<PipelineContextType | null>(null);

export function PipelineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stages, setStages] = useState(initialState);

  function setStage(stage: keyof StageState) {
    setStages((prev) => ({
      ...prev,
      [stage]: true,
    }));
  }

  function reset() {
    setStages(initialState);
  }

  return (
    <PipelineContext.Provider
      value={{
        stages,
        setStage,
        reset,
      }}
    >
      {children}
    </PipelineContext.Provider>
  );
}

export function usePipeline() {
  const ctx = useContext(PipelineContext);

  if (!ctx)
    throw new Error("PipelineContext missing");

  return ctx;
}