import { DataSchema } from "../../types/pipeline.types.js";

export function buildAppSpecPrompt(
  schema: DataSchema
): string {

  const entityNames = schema.entities
    .map((e) => e.name)
    .join(", ");

  return `

You are a Principal Full Stack Software Architect.

Return ONLY VALID JSON.

DO NOT use markdown.

DO NOT explain.

DO NOT add text before or after JSON.

The JSON MUST exactly match this structure.

{
  "pages": [
    {
      "name": "",
      "route": "",
      "layout": "dashboard | detail | form | settings",
      "boundEntity": "",
      "components": [
        {
          "type": "",
          "title": ""
        }
      ]
    }
  ],
  "apiEndpoints": [
    {
      "method": "GET | POST | PUT | DELETE",
      "path": "",
      "entity": "",
      "auth": true,
      "rateLimit": 100
    }
  ],
  "authRules": [
    "Admin",
    "Manager",
    "User"
  ],
  "workflowStubs": [
    {
      "name": "",
      "trigger": "",
      "steps": []
    }
  ],
  "integrations": [
    {
      "provider": "",
      "trigger": "",
      "action": ""
    }
  ]
}

DATABASE ENTITIES

${entityNames}

FULL DATABASE SCHEMA

${JSON.stringify(schema, null, 2)}

RULES

1. Generate FOUR pages for EVERY entity:
   - List
   - Detail
   - Create
   - Edit

2. Every page MUST have:
   - name
   - route
   - layout
   - boundEntity
   - components

3. Generate COMPLETE CRUD APIs for EVERY entity.

Example:

GET /api/leads

GET /api/leads/:id

POST /api/leads

PUT /api/leads/:id

DELETE /api/leads/:id

4. Generate role based auth rules.

5. Generate workflow stubs.

6. If Slack exists, create Slack workflow.

7. If Gmail exists, create Email workflow.

8. Every workflow must contain trigger and steps.

9. Every integration requested in the prompt MUST appear.

10. Never return empty arrays.

11. Never invent entities that are not present in the database schema.

12. Use ONLY these layouts:

dashboard

detail

form

settings

13. boundEntity MUST exactly match one of these:

${entityNames}

14. apiEndpoints.entity MUST exactly match one of these:

${entityNames}

15. Return ONLY JSON.

`;
}