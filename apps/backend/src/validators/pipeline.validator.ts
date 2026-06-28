import {
  AppIntent,
  DataSchema,
  AppSpec,
} from "../types/pipeline.types.js";

import {
  validateIntentStage,
} from "./intent.validator.js";

import {
  validateSchemaStage,
} from "./schema.validator.js";

import {
  validateAppSpecStage,
} from "./appspec.validator.js";

import {
  validateCrossLayer,
} from "./cross.validator.js";

export function validatePipeline(

  intent: AppIntent,

  schema: DataSchema,

  appSpec: AppSpec

){

  return{

    intent:
      validateIntentStage(intent),

    schema:
      validateSchemaStage(schema),

    appSpec:
      validateAppSpecStage(appSpec),

    cross:
      validateCrossLayer(
        intent,
        schema,
        appSpec
      )

  };

}