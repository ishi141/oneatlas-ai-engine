import { jobStore } from "./job.store.js";

export class JobService {
  create(id: string, prompt: string) {
    return jobStore.create(id, prompt);
  }

  get(id: string) {
    return jobStore.get(id);
  }

  list() {
    return jobStore.all();
  }

  updateStage(
    id: string,
    stage: string,
    progress: number
  ) {
    jobStore.updateStage(
      id,
      stage,
      progress
    );
  }

  complete(
    id: string,
    result: unknown
  ) {
    jobStore.complete(
      id,
      result
    );
  }

  fail(
    id: string,
    error: string
  ) {
    jobStore.fail(
      id,
      error
    );
  }

  delete(id: string) {
    jobStore.delete(id);
  }
}

export const jobService =
  new JobService();