import fs from "fs";
import path from "path";

import { evaluationPrompts } from "./prompts.js";
import { evaluatePrompt } from "./evaluator.js";

export async function runEvaluationSuite() {

  const results = [];

  for (const prompt of evaluationPrompts) {

    console.log(`Running: ${prompt}`);

    const result =
      await evaluatePrompt(prompt);

    results.push(result);

  }

  console.table(results);

  const report = {

    generatedAt:
      new Date().toISOString(),

    totalPrompts:
      evaluationPrompts.length,

    successful:
      results.filter(
        r => r.success
      ).length,

    failed:
      results.filter(
        r => !r.success
      ).length,

    averageLatency:

      Math.round(

        results.reduce(
          (a, b) => a + b.latency,
          0
        ) / results.length

      ),

    results

  };

  fs.writeFileSync(

    path.resolve(
      process.cwd(),
      "evaluation.json"
    ),

    JSON.stringify(
      report,
      null,
      2
    )

  );

  console.log(
    "evaluation.json generated."
  );

  return report;

}