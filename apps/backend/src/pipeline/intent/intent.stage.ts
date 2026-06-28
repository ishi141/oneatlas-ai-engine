import { AppIntent } from "../../types/pipeline.types.js";

import { buildIntentPrompt } from "./intent.prompt.js";
import { validateIntent } from "./intent.validator.js";
import { repairIntent } from "./intent.repair.js";

import { costService } from "../../cost/cost.service.js";

import { getProvider } from "../../gateway/router.js";
import { parseLLMJson } from "../../utils/json.js";

import { retry } from "../../repair/retry.service.js";
import { repairJson } from "../../repair/strategies/json.strategy.js";
import { repairMissingFields } from "../../repair/strategies/missing-fields.strategy.js";
import { repairService } from "../../repair/repair.service.js";

export class IntentStage {

  readonly name = "Intent Extraction";

  async execute(
    prompt: string,
    jobId?: string
  ): Promise<AppIntent> {

    console.log(
      "========== Intent Extraction =========="
    );

    const provider =
      getProvider("intent");

    const defaults: AppIntent = {

      appName: "",

      appType: "",

      description: "",

      features: [],

      entities: [],

      integrations_requested: [],

      assumptions: [],

      clarificationRequired: false,

      clarificationQuestions: []

    };

    const response = await retry(() =>
      provider.generate({
        systemPrompt:
          "You are a senior software architect. Return ONLY valid JSON. Never use markdown.",

        userPrompt:
          buildIntentPrompt(prompt),

        temperature: 0.2,

        maxTokens: 2000,
      })
    );

    costService.record(
      jobId ?? "global",
      "intent",
      response.provider,
      response.model,
      response.latency,
      buildIntentPrompt(prompt),
      response.output
    );

    console.log(
      `Provider : ${response.provider}`
    );

    console.log(
      `Model : ${response.model}`
    );

    let parsed: AppIntent;

    try {

      parsed =
        parseLLMJson<AppIntent>(
          response.output
        );

    }

    catch {

      repairService.record(
        "Malformed JSON",
        true
      );

      parsed =
        parseLLMJson<AppIntent>(
          repairJson(
            response.output
          )
        );

    }

    parsed =
      repairMissingFields(
        parsed,
        defaults
      );

    repairService.record(
      "Missing Fields",
      true
    );

    const validation =
      validateIntent(parsed);

    if (!validation.success) {

      repairService.record(
        "Intent Validation",
        true
      );

      return repairIntent(
        parsed
      );

    }

    return validation.data;

  }

}