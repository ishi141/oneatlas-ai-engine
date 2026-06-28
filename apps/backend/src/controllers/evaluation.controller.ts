import {
  Request,
  Response
} from "express";

import {
  buildEvaluation
} from "../evaluation/evaluation.service.js";

export function getEvaluation(
  req: Request,
  res: Response
) {

  try {

    const jobId = String(
      req.params.jobId
    );

    const report =
      buildEvaluation(jobId);

    return res.json({

      success: true,

      data: report

    });

  }

  catch (err) {

    return res.status(404).json({

      success: false,

      message:

        err instanceof Error

          ? err.message

          : "Unknown Error"

    });

  }

}