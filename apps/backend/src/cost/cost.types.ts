export interface CostEntry {

  stage: string;

  provider: string;

  model: string;

  latency: number;

  inputTokens: number;

  outputTokens: number;

  estimatedCost: number;

  timestamp: string;

}

export interface CostSummary {

  totalCost: number;

  totalInputTokens: number;

  totalOutputTokens: number;

  totalLatency: number;

  entries: CostEntry[];

}