import { Router } from "express";

import {

getEvaluation

}

from "../controllers/evaluation.controller.js";

const router=Router();

router.get(

"/:jobId",

getEvaluation

);

export default router;