import { PipelineRunner } from "../pipeline/runner.js";

import { EvaluationResult } from "./report.types.js";

const runner = new PipelineRunner();

export async function evaluatePrompt(
  prompt: string
): Promise<EvaluationResult> {

  const start = Date.now();

  try {

    await runner.run(prompt);

    return {

      prompt,

      success: true,

      latency: Date.now() - start,

      provider: "multi",

      repaired: false,

    };

  }

  catch (error) {

    return {

      prompt,

      success: false,

      latency: Date.now() - start,

      provider: "multi",

      repaired: false,

      error:
        error instanceof Error
          ? error.message
          : "Unknown Error",

    };

  }

}