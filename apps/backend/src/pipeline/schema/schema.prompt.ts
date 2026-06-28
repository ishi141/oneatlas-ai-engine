import { AppIntent } from "../../types/pipeline.types.js";

export function buildSchemaPrompt(
  intent: AppIntent
): string {

  return `

You are a Senior Database Architect.

Generate a production-ready relational schema.

Return ONLY valid JSON.

Rules:

- Every entity must have:
  - id
  - createdAt
  - updatedAt
  - tenantId

- Infer relationships.

- Infer data types.

- Mark nullable fields.

- Mark unique fields.

- Mark primary keys.

- Generate foreign keys.

Return JSON:

{
  "entities":[
    {
      "name":"",
      "tableName":"",
      "tenantScoped":true,

      "fields":[
        {
          "name":"",
          "type":"string",
          "nullable":false,
          "unique":false,
          "primary":false,
          "indexed":false,
          "defaultValue":"",
          "description":""
        }
      ],

      "relations":[
        {
          "type":"belongsTo",
          "target":"",
          "foreignKey":"",
          "onDelete":"cascade"
        }
      ]
    }
  ]
}

Intent

${JSON.stringify(intent,null,2)}

`;

}