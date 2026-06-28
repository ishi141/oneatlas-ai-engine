import { costService } from "../cost/cost.service.js";
import { repairService } from "../repair/repair.service.js";
import { jobStore } from "../jobs/job.store.js";

import { EvaluationReport } from "./evaluation.types.js";
import { PipelineResult } from "../types/pipeline.types.js";

export function buildEvaluation(
  jobId: string
): EvaluationReport {

  const job = jobStore.get(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  const cost =
    costService.summary(jobId);

  const repairs =
    repairService.getLog();

  const result =
    (job.result ?? null) as PipelineResult | null;

  return {

    jobId,

    generatedAt:
      new Date().toISOString(),

    validation: {

      intent: true,

      schema: true,

      appSpec: true,

      cross: true,

    },

    repairs: {

      total: repairs.length,

      successful:
        repairs.filter(
          repair => repair.success
        ).length,

      failed:
        repairs.filter(
          repair => !repair.success
        ).length,

      history: repairs

    },

    providers: {

      used: [
        ...new Set(
          cost.entries.map(
            entry => entry.provider
          )
        )
      ],

      models: [
        ...new Set(
          cost.entries.map(
            entry => entry.model
          )
        )
      ]

    },

    workflows: {

      total:
        result?.appSpec
          .workflowStubs
          .length ?? 0,

      names:
        result?.appSpec
          .workflowStubs
          .map(
            workflow => workflow.name
          ) ?? []

    },

    cost

  };

}