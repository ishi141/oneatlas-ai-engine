import { API_URL } from "./api";

import type { PipelineEvent } from "@/types/events";

export function connectEvents(
  jobId: string,
  onMessage: (data: PipelineEvent) => void
) {
  const eventSource = new EventSource(
    `${API_URL}/events/${jobId}`
  );

  eventSource.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };

  eventSource.onerror = () => {
    eventSource.close();
  };

  return eventSource;
}