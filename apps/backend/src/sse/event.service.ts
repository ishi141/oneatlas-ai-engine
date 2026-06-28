import { Response } from "express";

import { PipelineEvent } from "./event.types.js";

class EventService {

  private clients = new Map<string, Response>();

  connect(jobId: string, res: Response) {

    this.clients.set(jobId, res);

  }

  disconnect(jobId: string) {

    this.clients.delete(jobId);

  }

  send(jobId: string, event: PipelineEvent) {

    const client = this.clients.get(jobId);

    if (!client) return;

    client.write(
      `data: ${JSON.stringify(event)}\n\n`
    );

  }

}

export const eventService = new EventService();