import {
  AppSpec
} from "../../types/pipeline.types.js";

export function repairAppSpec(
  partial:
    Partial<AppSpec>
): AppSpec{

  return{

    pages:
      partial.pages ?? [],

    apiEndpoints:
      partial.apiEndpoints ?? [],

    authRules:
      partial.authRules ?? [],

    workflowStubs:
      partial.workflowStubs ?? [],

    integrations:
      partial.integrations ?? []

  };

}