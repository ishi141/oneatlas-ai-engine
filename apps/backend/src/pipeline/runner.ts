import { IntentStage } from "./intent/intent.stage.js";
import { SchemaStage } from "./schema/schema.stage.js";
import { AppSpecStage } from "./appspec/appspec.stage.js";

import { PipelineResult } from "../types/pipeline.types.js";

import { validatePipeline } from "../validators/pipeline.validator.js";

import { eventService } from "../sse/event.service.js";

import { costService } from "../cost/cost.service.js";

export class PipelineRunner {

  private readonly intentStage =
    new IntentStage();

  private readonly schemaStage =
    new SchemaStage();

  private readonly appSpecStage =
    new AppSpecStage();

  async run(
    prompt: string,
    jobId?: string
  ): Promise<PipelineResult> {

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_start",

        stage: "intent",

        message: "Intent extraction started",

        timestamp: new Date().toISOString(),

      });

    }

    const intent =
      await this.intentStage.execute(
        prompt,
        jobId
      );

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_complete",

        stage: "intent",

        message: "Intent extraction completed",

        timestamp: new Date().toISOString(),

      });

    }

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_start",

        stage: "schema",

        message: "Schema generation started",

        timestamp: new Date().toISOString(),

      });

    }

    const schema =
      await this.schemaStage.execute(
        intent,
        jobId
      );

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_complete",

        stage: "schema",

        message: "Schema generation completed",

        timestamp: new Date().toISOString(),

      });

    }

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_start",

        stage: "appspec",

        message: "AppSpec generation started",

        timestamp: new Date().toISOString(),

      });

    }

    const appSpec =
      await this.appSpecStage.execute(
        schema,
        jobId
      );

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_complete",

        stage: "appspec",

        message: "AppSpec generation completed",

        timestamp: new Date().toISOString(),

      });

    }

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_start",

        stage: "validation",

        message: "Running validations",

        timestamp: new Date().toISOString(),

      });

    }

    const validation =
      validatePipeline(
        intent,
        schema,
        appSpec
      );

    console.log(
      "========== VALIDATION =========="
    );

    console.log(
      JSON.stringify(
        validation,
        null,
        2
      )
    );

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_complete",

        stage: "validation",

        message: "Validation completed",

        timestamp: new Date().toISOString(),

      });

    }

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_start",

        stage: "repair",

        message: "Running repair checks",

        timestamp: new Date().toISOString(),

      });

    }

    if (!validation.cross.valid) {

      console.warn(
        "Cross layer validation failed."
      );

    }

    if (jobId) {

      eventService.send(jobId, {

        type: "stage_complete",

        stage: "repair",

        message: "Repair checks completed",

        timestamp: new Date().toISOString(),

      });

    }

    if (jobId) {

      eventService.send(jobId, {

        type: "generation_complete",

        stage: "pipeline",

        message: "Pipeline completed",

        timestamp: new Date().toISOString(),

      });

    }


    // ...

    const cost = jobId
      ? costService.summary(jobId)
      : {
        totalCost: 0,
        totalInputTokens: 0,
        totalOutputTokens: 0,
        totalLatency: 0,
        entries: [],
      };

    return {
      intent,
      schema,
      appSpec,
      validation,
      cost,
    }}};