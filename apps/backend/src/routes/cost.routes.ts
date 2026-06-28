import { Router } from "express";

import { getCost } from "../controllers/cost.controller.js";

const router = Router();

router.get(
  "/:jobId",
  getCost
);

export default router;