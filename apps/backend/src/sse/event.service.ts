import { Response } from "express";
import { PipelineEvent } from "./event.types.js";

class EventService {

  private clients = new Map<string, Response>();

  connect(jobId: string, res: Response) {

    this.clients.set(jobId, res);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders?.();

    // Keep connection alive
    const keepAlive = setInterval(() => {
      res.write(": ping\n\n");
    }, 15000);

    res.on("close", () => {
      clearInterval(keepAlive);
      this.disconnect(jobId);
    });

    // Initial event
    res.write(
      `data: ${JSON.stringify({
        type: "connected",
        stage: "system",
        message: "Connected",
        timestamp: new Date().toISOString(),
      })}\n\n`
    );

    console.log("SSE Connected:", jobId);

  }

  disconnect(jobId: string) {

    this.clients.delete(jobId);

    console.log("SSE Disconnected:", jobId);

  }

  send(jobId: string, event: PipelineEvent) {

    const client = this.clients.get(jobId);

    if (!client) {

      console.log("No client for", jobId);

      return;

    }

    console.log(
      `[SSE] ${event.type} -> ${event.stage}`
    );

    client.write(
      `data: ${JSON.stringify(event)}\n\n`
    );

  }

}

export const eventService = new EventService();