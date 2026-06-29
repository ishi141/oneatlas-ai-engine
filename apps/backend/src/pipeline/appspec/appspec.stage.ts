import {
  AppSpec,
  DataSchema,
} from "../../types/pipeline.types.js";

import { generateWorkflows }
  from "../../workflows/workflow.generator.js";

import { costService } from "../../cost/cost.service.js";

import { getProviders } from "../../gateway/router.js";
import { executeWithFallback } from "../../gateway/fallback.js";

import { parseLLMJson } from "../../utils/json.js";

import { retry } from "../../repair/retry.service.js";

import { repairJson } from "../../repair/strategies/json.strategy.js";
import { repairMissingFields } from "../../repair/strategies/missing-fields.strategy.js";
import { repairConsistency } from "../../repair/strategies/consistency.strategy.js";

import { repairService } from "../../repair/repair.service.js";

import { validateAppSpec } from "./appspec.validator.js";

import { repairAppSpec } from "./appspec.repair.js";

import { buildAppSpecPrompt } from "./appspec.prompt.js";

export class AppSpecStage {

  readonly name = "AppSpec Generation";

  async execute(
    schema: DataSchema,
    jobId?: string
  ) {

    console.log(
      "========== AppSpec Generation =========="
    );

    const providers =
      getProviders("appspec");

    const defaults: AppSpec = {

      pages: [

        {
          name: "Dashboard",

          route: "/dashboard",

          layout: "dashboard",

          boundEntity: undefined,

          components: []
        }

      ],

      apiEndpoints: [

        {
          method: "GET",

          path: "/api/health",

          auth: false,

          rateLimit: 100
        }

      ],

      authRules: [

        "User"

      ],

      workflowStubs: [],

      integrations: []

    };

    const response =
      await executeWithFallback(
        providers,
        {

          systemPrompt: `

You generate production-grade application specifications.

Return ONLY JSON.

Every required key MUST exist.

Never rename fields.

Never explain.

`,

          userPrompt:
            buildAppSpecPrompt(schema),

          temperature: 0,

          maxTokens: 8000,

        }
      );

    if (jobId) {

  costService.record(
    jobId,
    "appspec",
    response.provider,
    response.model,
    response.latency,
    buildAppSpecPrompt(schema),
    response.output
  );

}

    console.log(
      `Provider : ${response.provider}`
    );

    console.log(
      `Model : ${response.model}`
    );

    let parsed: AppSpec;

    try {

      parsed =
        parseLLMJson<AppSpec>(
          response.output
        );

      console.log(
        "========== RAW APPSPEC =========="
      );

      console.log(
        JSON.stringify(
          parsed,
          null,
          2
        )
      );

    }



    catch {

      repairService.record(
        "Malformed JSON",
        true
      );

      parsed =
        parseLLMJson<AppSpec>(
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

    parsed =
      repairConsistency(
        schema,
        parsed
      );

    parsed.workflowStubs = [

      ...parsed.workflowStubs,

      ...generateWorkflows({

        appName: "",

        appType: "entity",

        description: "",

        features: [],

        entities: [],

        integrations_requested:

          parsed.integrations.map(

            i => i.provider

          ),

        assumptions: [],

        clarificationRequired: false,

        clarificationQuestions: []

      })

    ];

    console.log(
      "========== APPSPEC AFTER REPAIR =========="
    );

    console.log(
      JSON.stringify(
        parsed,
        null,
        2
      )
    );

    repairService.record(
      "Consistency Repair",
      true
    );

    const validation =
      validateAppSpec(parsed);

    if (!validation.success) {

      repairService.record(
        "AppSpec Validation",
        true
      );

      return repairAppSpec(
        parsed
      );

    }

    console.log(
      "AppSpec Generated"
    );

    return validation.data as AppSpec;

  }

}