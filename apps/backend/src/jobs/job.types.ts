export type JobStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed";

export interface Job {

  id: string;

  status: JobStatus;

  startedAt: Date;

  finishedAt?: Date;

  prompt: string;

  result?: unknown;

  error?: string;

}