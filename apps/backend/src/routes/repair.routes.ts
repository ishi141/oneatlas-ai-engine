import { Router } from "express";

import {
  repairJob
} from "../controllers/repair.controller.js";

const router = Router();

router.post(
  "/:jobId",
  repairJob
);

export default router;