export function repairMissingFields(
  object: any,
  defaults: any
) {

  if (
    typeof defaults !== "object" ||
    defaults === null
  ) {

    return object;

  }

  for (const key of Object.keys(defaults)) {

    if (
      object[key] === undefined
    ) {

      object[key] = defaults[key];

    }

    else if (

      typeof defaults[key] === "object"

    ) {

      repairMissingFields(

        object[key],

        defaults[key]

      );

    }

  }

  return object;

}