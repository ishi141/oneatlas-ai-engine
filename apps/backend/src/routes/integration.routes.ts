import { Router } from "express";
import { listIntegrations } from "../controllers/integration.controller.js";

const router = Router();

router.get("/", listIntegrations);

export default router;