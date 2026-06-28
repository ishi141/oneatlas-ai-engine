import { AppIntent } from "../types/pipeline.types.js";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateIntentStage(
  intent: AppIntent
): ValidationResult {

  const errors: string[] = [];

  if (!intent.appName.trim())
    errors.push("App name missing");

  if (intent.features.length === 0)
    errors.push("No features extracted");

  if (intent.entities.length === 0)
    errors.push("No entities extracted");

  return {
    valid: errors.length === 0,
    errors,
  };
}