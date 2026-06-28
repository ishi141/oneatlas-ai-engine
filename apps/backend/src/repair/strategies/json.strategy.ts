import { repairMalformedJson } from "../../utils/json.js";

export function repairJson(
  response: string
) {

  return repairMalformedJson(
    response
  );

}