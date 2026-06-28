import { Router } from "express";
import { generateApp } from "../controllers/generate.controller.js";

const router = Router();

router.post("/", generateApp);

export default router;