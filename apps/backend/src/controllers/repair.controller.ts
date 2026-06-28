import { Request, Response } from "express";
import { generatePipeline } from "../services/pipeline.service.js";
import { jobStore } from "../jobs/job.store.js";

export async function repairJob(
  req: Request,
  res: Response
) {
  try {

    const jobId =
  String(req.params.jobId);

    const job = jobStore.get(jobId);

    if (!job) {

      return res.status(404).json({
        success: false,
        message: "Job not found"
      });

    }

    const result =
      await generatePipeline(
        job.prompt,
        jobId
      );

    jobStore.complete(
      jobId,
      result
    );

    return res.json({

      success: true,

      repaired: true,

      data: result

    });

  }

  catch (err) {

    return res.status(500).json({

      success: false,

      message:
        err instanceof Error
          ? err.message
          : "Unknown Error"

    });

  }

}