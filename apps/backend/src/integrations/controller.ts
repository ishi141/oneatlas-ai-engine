import {
  Request,
  Response
} from "express";

import {
  getIntegrations
} from "../integrations/service.js";

export function listIntegrations(
  _req: Request,
  res: Response
) {

  return res.json({

    success: true,

    count: getIntegrations().length,

    data: getIntegrations()

  });

}