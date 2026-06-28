import { Router } from "express";

import { eventService } from "../sse/event.service.js";

const router = Router();

router.get("/:jobId", (req, res) => {

  const { jobId } = req.params;

  res.setHeader(
    "Content-Type",
    "text/event-stream"
  );

  res.setHeader(
    "Cache-Control",
    "no-cache"
  );

  res.setHeader(
    "Connection",
    "keep-alive"
  );

  eventService.connect(jobId, res);

  req.on("close", () => {

    eventService.disconnect(jobId);

  });

});

export default router;