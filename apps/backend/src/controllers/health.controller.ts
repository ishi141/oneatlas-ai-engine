import { Request, Response } from "express";

export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    service: "OneAtlas AI Engine",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};