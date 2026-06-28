import {
    Request,
    Response
}
    from "express";

import {
    jobStore
}
    from "../jobs/job.store.js";

export function getJob(

    req: Request,

    res: Response

) {

    const jobId = Array.isArray(req.params.jobId)
        ? req.params.jobId[0]
        : req.params.jobId;

    const job = jobStore.get(jobId);

    if (!job) {

        return res
            .status(404)
            .json({

                success: false,

                message:
                    "Job not found"

            });

    }

    return res.json({

        success: true,

        data: job

    });

}