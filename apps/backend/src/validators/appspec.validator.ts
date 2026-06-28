import { AppSpec } from "../types/pipeline.types.js";

import { ValidationResult } from "./intent.validator.js";

export function validateAppSpecStage(
  spec: AppSpec
): ValidationResult {

  const errors: string[] = [];

  if (spec.pages.length === 0)
    errors.push("No pages");

  if (spec.apiEndpoints.length === 0)
    errors.push("No APIs");

  if (spec.authRules.length === 0)
    errors.push("No auth rules");

  return {

    valid: errors.length === 0,

    errors,

  };

}