import { z } from "zod";

const ComponentSchema = z.object({

  type: z.enum([
    "table",
    "form",
    "chart",
    "kanban",
    "calendar",
    "stats",
    "list",
  ]),

  title: z.string(),

});

const PageSchema = z.object({

    name: z.string(),

    route: z.string(),

    layout: z.enum([
        "dashboard",
        "detail",
        "form",
        "settings",
    ]),

    boundEntity: z.string().optional(),

    components:
        z.array(ComponentSchema)

});

const ApiSchema = z.object({

    method: z.string(),

    path: z.string(),

    entity: z.string().optional(),

    auth: z.boolean(),

    rateLimit: z.number()

});

const WorkflowSchema = z.object({

    name: z.string(),

    trigger: z.string(),

    steps:
        z.array(z.string())

});

const IntegrationSchema = z.object({

    provider: z.string(),

    trigger: z.string(),

    action: z.string()

});

export const AppSpecValidator =
    z.object({

        pages:
            z.array(PageSchema),

        apiEndpoints:
            z.array(ApiSchema),

        authRules:
            z.array(z.string()),

        workflowStubs:
            z.array(WorkflowSchema),

        integrations:
            z.array(IntegrationSchema)

    });

export function validateAppSpec(
    data: unknown
) {

    return AppSpecValidator.safeParse(data);

}