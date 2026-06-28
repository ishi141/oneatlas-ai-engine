import {
  AppIntent,
  AppSpec,
  DataSchema,
} from "../types/pipeline.types.js";

export interface StageMetric {

  stage: string;

  provider: string;

  model: string;

  latency: number;

  retries: number;

  repaired: boolean;

}

export interface RepairLog {

  stage: string;

  strategy: string;

  success: boolean;

  timestamp: string;

}

export interface CostRecord {

  stage: string;

  provider: string;

  model: string;

  inputTokens: number;

  outputTokens: number;

  estimatedUSD: number;

}

export interface PipelineContext {

  jobId: string;

  prompt: string;

  startedAt: Date;

  finishedAt?: Date;

  status:
    | "queued"
    | "running"
    | "completed"
    | "failed";

  intent?: AppIntent;

  schema?: DataSchema;

  appSpec?: AppSpec;

  metrics: StageMetric[];

  repairs: RepairLog[];

  costs: CostRecord[];

  validation?: unknown;

}