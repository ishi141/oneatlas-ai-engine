export interface IntegrationAction {
  id: string;
  name: string;

  payloadSchema: Record<string, string>;

  outputSchema: Record<string, string>;
}

export interface Integration {

  id: string;

  displayName: string;

  authType:
    | "oauth2"
    | "api_key"
    | "webhook_secret"
    | "none";

  category:
    | "communication"
    | "database"
    | "storage"
    | "developer"
    | "automation"
    | "payment"
    | "crm";

  description: string;

  triggers: string[];

  actions: IntegrationAction[];

  workflowTemplate: string[];
}