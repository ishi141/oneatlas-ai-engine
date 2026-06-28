import { PipelineContext } from "./context.js";

class ContextStore {
  private jobs = new Map<string, PipelineContext>();

  create(
    jobId: string,
    prompt: string
  ) {
    const ctx: PipelineContext = {
      jobId,
      prompt,
      startedAt: new Date(),
      status: "running",
      metrics: [],
      repairs: [],
      costs: [],
    };

    this.jobs.set(jobId, ctx);

    return ctx;
  }

  get(jobId: string) {
    return this.jobs.get(jobId);
  }

  update(ctx: PipelineContext) {
    this.jobs.set(ctx.jobId, ctx);

    return ctx;
  }

  markCompleted(jobId: string) {
    const ctx = this.jobs.get(jobId);

    if (!ctx) return;

    ctx.status = "completed";
    ctx.finishedAt = new Date();

    this.jobs.set(jobId, ctx);
  }

  markFailed(jobId: string) {
    const ctx = this.jobs.get(jobId);

    if (!ctx) return;

    ctx.status = "failed";
    ctx.finishedAt = new Date();

    this.jobs.set(jobId, ctx);
  }

  delete(jobId: string) {
    this.jobs.delete(jobId);
  }

  list() {
    return [...this.jobs.values()];
  }

  clear() {
    this.jobs.clear();
  }
}

export const contextStore = new ContextStore();