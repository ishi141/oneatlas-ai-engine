import {
  DataSchema,
  EntitySchema,
  EntityField,
} from "../../types/pipeline.types.js";

function ensureSystemFields(
  entity: EntitySchema
) {

  const existing = new Set(
    entity.fields.map(f => f.name)
  );

  const required: EntityField[] = [

    {
      name: "id",
      type: "uuid",
      nullable: false,
      unique: true,
      primary: true,
      indexed: true,
    },

    {
      name: "createdAt",
      type: "datetime",
      nullable: false,
      unique: false,
      primary: false,
      indexed: false,
    },

    {
      name: "updatedAt",
      type: "datetime",
      nullable: false,
      unique: false,
      primary: false,
      indexed: false,
    },

    {
      name: "tenantId",
      type: "uuid",
      nullable: false,
      unique: false,
      primary: false,
      indexed: true,
    },

  ];

  for (const field of required) {

    if (!existing.has(field.name)) {

      entity.fields.push(field);

    }

  }

}

export function repairSchema(
  partial: Partial<DataSchema>
): DataSchema {

  const entities =
    partial.entities ?? [];

  for (const entity of entities) {

    entity.tableName =
      entity.tableName ??
      entity.name.toLowerCase();

    entity.tenantScoped ??= true;

    entity.fields ??= [];

    entity.relations ??= [];

    ensureSystemFields(entity);

  }

  return {

    entities,

  };

}