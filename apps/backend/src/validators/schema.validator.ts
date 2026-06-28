import { DataSchema } from "../types/pipeline.types.js";

import { ValidationResult } from "./intent.validator.js";

export function validateSchemaStage(
  schema: DataSchema
): ValidationResult {

  const errors: string[] = [];

  if (schema.entities.length === 0)
    errors.push("No entities generated");

  for (const entity of schema.entities) {

    if (!entity.name)
      errors.push("Entity name missing");

    if (!entity.tableName)
      errors.push(`Table name missing for ${entity.name}`);

    if (entity.fields.length === 0)
      errors.push(`No fields in ${entity.name}`);

  }

  return {

    valid: errors.length === 0,

    errors,

  };

}