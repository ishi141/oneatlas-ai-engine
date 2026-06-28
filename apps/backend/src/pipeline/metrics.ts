import { PipelineContext } from "./context.js";

export interface StageMetric {
  stage: string;
  provider: string;
  model: string;
  latency: number;
  retries: number;
  repaired: boolean;
  timestamp: string;
}

export function addMetric(
  ctx: PipelineContext,
  stage: string,
  provider: string,
  model: string,
  latency: number,
  retries: number,
  repaired: boolean
) {
  ctx.metrics.push({
    stage,
    provider,
    model,
    latency,
    retries,
    repaired,
  });
}

export function getMetrics(ctx: PipelineContext) {
  return [...ctx.metrics];
}

export function getTotalLatency(
  ctx: PipelineContext
) {
  return ctx.metrics.reduce(
    (sum, metric) => sum + metric.latency,
    0
  );
}

export function getRetryCount(
  ctx: PipelineContext
) {
  return ctx.metrics.reduce(
    (sum, metric) => sum + metric.retries,
    0
  );
}

export function getRepairCount(
  ctx: PipelineContext
) {
  return ctx.metrics.filter(
    (metric) => metric.repaired
  ).length;
}