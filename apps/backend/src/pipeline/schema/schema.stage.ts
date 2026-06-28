import {
  AppIntent,
  DataSchema,
} from "../../types/pipeline.types.js";

import { getProvider } from "../../gateway/router.js";

import { costService } from "../../cost/cost.service.js";

import { parseLLMJson } from "../../utils/json.js";

import { retry } from "../../repair/retry.service.js";

import { repairJson } from "../../repair/strategies/json.strategy.js";
import { repairMissingFields } from "../../repair/strategies/missing-fields.strategy.js";

import { repairService } from "../../repair/repair.service.js";

import { buildSchemaPrompt } from "./schema.prompt.js";

import { validateSchema } from "./schema.validator.js";

import { repairSchema } from "./schema.repair.js";

export class SchemaStage {

  readonly name = "Schema Generation";

  async execute(
  intent: AppIntent,
  jobId?: string
  ): Promise<DataSchema> {

    console.log(
      "========== Schema Generation =========="
    );

    const provider =
      getProvider("schema");

    const defaults: DataSchema = {

      entities: []

    };

    const response = await retry(() =>
  provider.generate({
    systemPrompt:
      "You are a senior database architect. Return ONLY valid JSON. Never use markdown.",

    userPrompt:
      buildSchemaPrompt(intent),

    temperature: 0.2,

    maxTokens: 3500,
  })
);

costService.record(
  jobId ?? "global",
  "schema",
  response.provider,
  response.model,
  response.latency,
  buildSchemaPrompt(intent),
  response.output
);

    console.log(
      `Provider : ${response.provider}`
    );

    console.log(
      `Model : ${response.model}`
    );

    let parsed: DataSchema;

    try {

      parsed =
        parseLLMJson<DataSchema>(
          response.output
        );

    }

    catch {

      repairService.record(
        "Malformed JSON",
        true
      );

      parsed =
        parseLLMJson<DataSchema>(
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
      validateSchema(parsed);

    if (!validation.success) {

      repairService.record(
        "Schema Validation",
        true
      );

      return repairSchema(
        parsed
      );

    }

    return validation.data;

  }

}