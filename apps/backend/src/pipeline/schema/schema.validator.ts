import { z } from "zod";

const FieldSchema = z.object({

  name: z.string().min(1),

  type: z.enum([
    "string",
    "number",
    "boolean",
    "date",
    "datetime",
    "uuid",
    "json",
  ]),

  nullable: z.boolean(),

  unique: z.boolean(),

  primary: z.boolean(),

  indexed: z.boolean(),

  defaultValue: z.string().optional(),

  description: z.string().optional(),

});

const RelationSchema = z.object({

  type: z.enum([
    "belongsTo",
    "hasOne",
    "hasMany",
    "manyToMany",
  ]),

  target: z.string(),

  foreignKey: z.string().optional(),

  onDelete: z
    .enum([
      "cascade",
      "restrict",
      "setNull",
    ])
    .optional(),

});

const EntitySchemaValidator = z.object({

  name: z.string(),

  tableName: z.string(),

  tenantScoped: z.boolean(),

  fields: z.array(FieldSchema),

  relations: z.array(RelationSchema),

});

export const DataSchemaValidator = z.object({

  entities: z.array(EntitySchemaValidator),

});

export function validateSchema(data: unknown) {

  return DataSchemaValidator.safeParse(data);

}