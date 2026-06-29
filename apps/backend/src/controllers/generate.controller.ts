import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

import { jobStore } from "../jobs/job.store.js";
import { generatePipeline } from "../services/pipeline.service.js";

export async function generateApp(
  req: Request,
  res: Response
) {
  try {

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const jobId = uuid();

    jobStore.create(
      jobId,
      prompt
    );

    // 🔥 Return immediately
    res.status(202).json({
      success: true,
      jobId,
    });

    // 🔥 Run pipeline in background
    generatePipeline(prompt, jobId)
      .then((result) => {

        jobStore.complete(
          jobId,
          result
        );

      })
      .catch((error) => {

        console.error(error);

        if (jobStore.fail) {
          jobStore.fail(
            jobId,
            error instanceof Error
              ? error.message
              : "Pipeline failed"
          );
        }

      });

  } catch (error) {

    console.error(error);

    if (!res.headersSent) {

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      });

    }

  }

}