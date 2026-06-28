import { Request, Response } from "express";
import { costService } from "../cost/cost.service.js";

export function getCost(
  req: Request,
  res: Response
) {

  const { jobId } = req.params;

  if (!jobId || Array.isArray(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid jobId"
    });
  }

  return res.json({
    success: true,
    data: costService.summary(jobId)
  });

}