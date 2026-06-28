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

    const result =
      await generatePipeline(
        prompt,
        jobId
      );

    jobStore.complete(
      jobId,
      result
    );

    return res.json({
      success: true,
      jobId,
      data: result,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error",
    });

  }
}