import { PipelineRunner } from "../pipeline/runner.js";

const runner = new PipelineRunner();

export async function generatePipeline(
  prompt: string,
  jobId?: string
) {
  return runner.run(prompt, jobId);
}