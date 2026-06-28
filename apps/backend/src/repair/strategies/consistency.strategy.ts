import {

  AppSpec,

  DataSchema

} from "../../types/pipeline.types.js";

export function repairConsistency(

  schema: DataSchema,

  spec: AppSpec

) {

  const entityNames =
    schema.entities.map(
      e => e.name
    );

  spec.pages =
    spec.pages.filter(

      p =>

        !p.boundEntity ||

        entityNames.includes(

          p.boundEntity

        )

    );

  spec.apiEndpoints =
    spec.apiEndpoints.filter(

      api =>

        !api.entity ||

        entityNames.includes(

          api.entity

        )

    );

  return spec;

}