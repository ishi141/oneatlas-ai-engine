import { AppIntent } from "../../types/pipeline.types.js";

export function repairIntent(
  partial: Partial<AppIntent>
): AppIntent {

  return {

    appName: partial.appName ?? "Untitled App",

    appType: partial.appType ?? "custom",

    features: partial.features ?? [],

    entities: partial.entities ?? [],

    integrations_requested:
      partial.integrations_requested ?? [],

    assumptions: partial.assumptions ?? []

  };

}