export interface Integration {

  id: string;

  name: string;

  category:
    | "communication"
    | "database"
    | "storage"
    | "payment"
    | "crm";

  description: string;

  triggers: string[];

  actions: string[];

  workflowTemplate: string[];

}