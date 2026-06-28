export type PrimitiveType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "datetime"
  | "uuid"
  | "json";

export interface AppIntent {
  appName: string;
  appType: string;
  description?: string;

  features: string[];
  entities: string[];

  integrations_requested: string[];

  assumptions: string[];

  clarificationRequired?: boolean;

  clarificationQuestions?: string[];
}

export interface EntityField {

  name: string;

  type: PrimitiveType;

  nullable: boolean;

  unique: boolean;

  primary: boolean;

  indexed: boolean;

  defaultValue?: string;

  description?: string;

}

export interface EntityRelation {

  type:
    | "belongsTo"
    | "hasOne"
    | "hasMany"
    | "manyToMany";

  target: string;

  foreignKey?: string;

  onDelete?:
    | "cascade"
    | "restrict"
    | "setNull";

}

export interface EntitySchema {

  name: string;

  tableName: string;

  tenantScoped: boolean;

  fields: EntityField[];

  relations: EntityRelation[];

}

export interface DataSchema {

  entities: EntitySchema[];

}

export interface UIComponent {

  type:
    | "table"
    | "form"
    | "chart"
    | "kanban"
    | "calendar"
    | "stats"
    | "list";

  title: string;

}

export interface PageSpec {

  name: string;

  route: string;

  layout:
    | "dashboard"
    | "detail"
    | "form"
    | "settings";

  boundEntity?: string;

  components: UIComponent[];

}

export interface ApiEndpoint {

  method:
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE";

  path: string;

  entity?: string;

  auth: boolean;

  rateLimit: number;

}

export interface IntegrationHook {

  provider: string;

  trigger: string;

  action: string;

}

export interface WorkflowStub {

  name: string;

  trigger: string;

  steps: string[];

}

export interface AppSpec {

  pages: PageSpec[];

  apiEndpoints: ApiEndpoint[];

  authRules: string[];

  workflowStubs: WorkflowStub[];

  integrations: IntegrationHook[];

}

export interface PipelineResult {

  intent: AppIntent;

  schema: DataSchema;

  appSpec: AppSpec;

}