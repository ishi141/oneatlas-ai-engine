import express from "express";
import cors from "cors";

import integrationRoutes
  from "./routes/integration.routes.js";

import jobRoutes
    from "./routes/job.routes.js";

import evaluationRoutes
from "./routes/evaluation.routes.js";

import eventRoutes from "./routes/events.routes.js";

import healthRoutes from "./routes/health.routes.js";
import generateRoutes from "./routes/generate.routes.js";

import costRoutes
  from "./routes/cost.routes.js";

import repairRoutes
from "./routes/repair.routes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/events", eventRoutes);
app.use(
    "/api/v1/jobs",
    jobRoutes
);
app.use(
  "/api/v1/integrations",
  integrationRoutes
);
// API Routes
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/generate", generateRoutes);
app.use(
  "/api/v1/costs",
  costRoutes
);

app.use(
"/api/v1/evaluation",
evaluationRoutes
);

app.use(
"/api/v1/repair",
repairRoutes
);

export default app;