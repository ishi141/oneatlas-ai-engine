export type JobStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed";

export interface JobRecord {
  id: string;

  prompt: string;

  status: JobStatus;

  progress: number;

  currentStage?: string;

  createdAt: Date;

  updatedAt: Date;

  completedAt?: Date;

  result?: unknown;

  error?: string;
}

class JobStore {
  private jobs = new Map<string, JobRecord>();

  create(
    id: string,
    prompt: string
  ) {
    const job: JobRecord = {
      id,
      prompt,
      status: "queued",
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.jobs.set(id, job);

    return job;
  }

  get(id: string) {
    return this.jobs.get(id);
  }

  updateStage(
    id: string,
    stage: string,
    progress: number
  ) {
    const job = this.jobs.get(id);

    if (!job) return;

    job.status = "running";
    job.currentStage = stage;
    job.progress = progress;
    job.updatedAt = new Date();

    this.jobs.set(id, job);
  }

  complete(
    id: string,
    result: unknown
  ) {
    const job = this.jobs.get(id);

    if (!job) return;

    job.status = "completed";
    job.progress = 100;
    job.result = result;
    job.completedAt = new Date();
    job.updatedAt = new Date();

    this.jobs.set(id, job);
  }

  fail(
    id: string,
    error: string
  ) {
    const job = this.jobs.get(id);

    if (!job) return;

    job.status = "failed";
    job.error = error;
    job.updatedAt = new Date();

    this.jobs.set(id, job);
  }

  all() {
    return [...this.jobs.values()];
  }

  delete(id: string) {
    this.jobs.delete(id);
  }
}

export const jobStore = new JobStore();