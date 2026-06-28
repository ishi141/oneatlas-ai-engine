import { Router }
from "express";

import {

getJob

}

from "../controllers/job.controller.js";

const router=
Router();

router.get(

"/:jobId",

getJob

);

export default
router;