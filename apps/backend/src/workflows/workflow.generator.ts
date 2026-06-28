import { AppIntent } from "../types/pipeline.types.js";

import { workflowTemplates } from "./templates.js";

export function generateWorkflows(
  intent: AppIntent
) {

  const workflows = [];

  for (const integration of intent.integrations_requested) {

    const key =
      integration.toLowerCase();

    const template =
      workflowTemplates[key];

    if (template) {

      workflows.push({

        ...template,

        trigger:
          `${intent.appType}.created`

      });

    }

  }

  return workflows;

}