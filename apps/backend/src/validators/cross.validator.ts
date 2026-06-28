import {
  AppIntent,
  DataSchema,
  AppSpec,
} from "../types/pipeline.types.js";

export interface CrossValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Normalize entity names.
 *
 * Lead
 * leads
 * LEADS
 * lead
 *
 * ->
 *
 * lead
 */
function normalize(name: string): string {

  return name
    .trim()
    .toLowerCase()
    .replace(/ies$/, "y")
    .replace(/s$/, "");

}

export function validateCrossLayer(

  intent: AppIntent,

  schema: DataSchema,

  spec: AppSpec

): CrossValidationResult {

  const errors: string[] = [];

  const schemaEntities =
    schema.entities.map(e => normalize(e.name));

  //-------------------------
  // Page -> Entity
  //-------------------------

  for (const page of spec.pages) {

    if (

      page.boundEntity &&

      !schemaEntities.includes(
        normalize(page.boundEntity)
      )

    ) {

      errors.push(

        `Page '${page.name}' references missing entity '${page.boundEntity}'.`

      );

    }

  }

  //-------------------------
  // API -> Entity
  //-------------------------

  for (const api of spec.apiEndpoints) {

    if (

      api.entity &&

      !schemaEntities.includes(
        normalize(api.entity)
      )

    ) {

      errors.push(

        `API '${api.path}' references unknown entity '${api.entity}'.`

      );

    }

  }

  //-------------------------
  // Intent -> Schema
  //-------------------------

  for (const entity of intent.entities) {

    if (

      !schemaEntities.includes(
        normalize(entity)
      )

    ) {

      errors.push(

        `Intent entity '${entity}' missing from schema.`

      );

    }

  }

  //-------------------------
  // Workflow -> Integration
  //-------------------------
  const providers =
    spec.integrations.map(i =>
      i.provider.toLowerCase()
    );

  for (const workflow of spec.workflowStubs) {

    const workflowText = [
      workflow.name,
      workflow.trigger,
      ...workflow.steps
    ]
      .join(" ")
      .toLowerCase();

    const mentionsNotification =
      workflowText.includes("notify") ||
      workflowText.includes("notification") ||
      workflowText.includes("email") ||
      workflowText.includes("slack");

    if (!mentionsNotification) {
      continue;
    }

    const hasIntegration =
      providers.length > 0;

    if (!hasIntegration) {

      errors.push(
        `Workflow '${workflow.name}' requires at least one integration.`
      );

    }

  }

  //-------------------------
  // Orphan Entity
  //-------------------------

  for (const entity of schema.entities) {

    const normalized =
      normalize(entity.name);

    const used =

      spec.pages.some(

        page =>

          page.boundEntity &&

          normalize(page.boundEntity) === normalized

      )

      ||

      spec.apiEndpoints.some(

        api =>

          api.entity &&

          normalize(api.entity) === normalized

      );

    if (!used) {

      errors.push(

        `Entity '${entity.name}' is never used.`

      );

    }

  }

  return {

    valid:
      errors.length === 0,

    errors,

  };

}