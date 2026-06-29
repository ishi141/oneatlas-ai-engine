import {
  Request,
  Response,
} from "express";

import {
  jobStore,
} from "../jobs/job.store.js";

import {
  repairService,
} from "../repair/repair.service.js";

import {
  costService,
} from "../cost/cost.service.js";

export function getJob(
  req: Request,
  res: Response
) {

  const jobId = Array.isArray(req.params.jobId)
    ? req.params.jobId[0]
    : req.params.jobId;

  const job = jobStore.get(jobId);

  if (!job) {

    return res.status(404).json({

      success: false,

      message: "Job not found"

    });

  }

  const cost =
    costService.summary(jobId);

  const repairLog =
    repairService.getLog();

  const latency = {

    total: cost.totalLatency,

    stages: cost.entries.map(entry => ({

      stage: entry.stage,

      latency: entry.latency,

      provider: entry.provider,

      model: entry.model

    }))

  };

  return res.json({

    success: true,

    data: {

      ...job,

      repairLog,

      cost,

      latency

    }

  });

}