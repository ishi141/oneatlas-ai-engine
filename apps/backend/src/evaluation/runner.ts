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

    return results;

}